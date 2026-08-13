/* ============================================================================
   ENQUIRY FORM — the page every "Enquire" on the rate card lands on.
   Four fields plus the tier carried in on ?tier=. Copy comes from
   content.js like everywhere else; nothing here is hardcoded.

   Delivery has two paths, chosen by enquiry.endpoint in content.js:
     endpoint set  → JSON POST, inline success, mailto only if the POST fails
     endpoint null → mailto handoff (a static site cannot send mail itself)
   ============================================================================ */

import './styles/base.css';
import './enquire.css';
import { enquiry, meta } from './data/content.js';
import { away } from './lib/section.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(f) {
  const control =
    f.type === 'textarea'
      ? `<textarea id="f-${f.name}" name="${f.name}" class="field__input"
           rows="${f.rows || 5}"${f.placeholder ? ` placeholder="${f.placeholder}"` : ''}
           ${f.required ? 'required' : ''}></textarea>`
      : `<input id="f-${f.name}" type="${f.type}" name="${f.name}" class="field__input"
           ${f.autocomplete ? `autocomplete="${f.autocomplete}"` : ''}
           ${f.placeholder ? `placeholder="${f.placeholder}"` : ''}
           ${f.required ? 'required' : ''} />`;

  return `
    <div class="field" data-field="${f.name}">
      <label class="field__label data" for="f-${f.name}">${f.label}</label>
      ${control}
      <p class="field__error caption" data-error-for="${f.name}"></p>
    </div>
  `;
}

function render(tier) {
  return `
    <section class="enquiry">
      <div class="enquiry__wrap">
        <a class="enquiry__back link" href="${enquiry.back.href}">${enquiry.back.label}</a>

        <div class="enquiry__meta">
          <span class="data mute">${enquiry.label}</span>
        </div>

        <h1 class="enquiry__heading display t-d1">${enquiry.heading}</h1>
        <p class="enquiry__body lead mute">${enquiry.body}</p>

        <div class="enquiry__tier">
          <span class="data mute">${enquiry.tierLabel}</span>
          <span class="enquiry__tier-value data">${tier || enquiry.tierFallback}</span>
        </div>

        <form class="enquiry__form" id="enquiry-form" novalidate>
          ${enquiry.fields.map(field).join('')}
          <button type="submit" class="btn btn--primary enquiry__submit">
            ${enquiry.submit}
          </button>
          <p class="enquiry__note caption" data-note></p>
        </form>
      </div>
    </section>
  `;
}

function done({ heading, body, cta }) {
  return `
    <div class="enquiry__done">
      <h2 class="enquiry__done-heading display t-d3">${heading}</h2>
      <p class="enquiry__done-body body mute">${body}</p>
      ${cta ? `<a class="btn btn--primary" href="${cta.href}"${away(cta.href)}>${cta.label}</a>` : ''}
      <a class="enquiry__back link" href="${enquiry.back.href}">${enquiry.back.label}</a>
    </div>
  `;
}

/** @returns {{values: object, ok: boolean}} */
function collect(form) {
  const values = {};
  let ok = true;

  enquiry.fields.forEach((f) => {
    const input = form.elements[f.name];
    const wrap = form.querySelector(`[data-field="${f.name}"]`);
    const slot = form.querySelector(`[data-error-for="${f.name}"]`);
    const value = input.value.trim();
    values[f.name] = value;

    let message = '';
    if (f.required && !value) message = enquiry.required;
    else if (f.type === 'email' && value && !EMAIL_RE.test(value)) message = enquiry.invalidEmail;

    slot.textContent = message;
    wrap.classList.toggle('field--invalid', Boolean(message));
    if (message) ok = false;
  });

  return { values, ok };
}

function mailtoHref(values, tier) {
  const lines = [
    `${enquiry.tierLabel}: ${tier || enquiry.tierFallback}`,
    '',
    ...enquiry.fields.map((f) => `${f.label}: ${values[f.name]}`),
  ];
  const subject = `${enquiry.subject} — ${tier || enquiry.tierFallback}`;
  return `mailto:${enquiry.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    lines.join('\n'),
  )}`;
}

async function post(values, tier) {
  const res = await fetch(enquiry.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...values, tier: tier || enquiry.tierFallback, to: enquiry.to }),
  });
  if (!res.ok) throw new Error(`Enquiry POST failed: ${res.status}`);
}

function boot() {
  document.title = `${enquiry.heading} — ${meta.title}`;

  const tier = new URLSearchParams(window.location.search).get('tier');
  const mount = document.getElementById('enquiry');
  mount.innerHTML = render(tier);

  const form = document.getElementById('enquiry-form');
  const button = form.querySelector('.enquiry__submit');
  const note = form.querySelector('[data-note]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { values, ok } = collect(form);
    if (!ok) return;

    // No endpoint configured: hand off to the mail client and say so plainly,
    // rather than showing a success state for a message nobody has sent yet.
    if (!enquiry.endpoint) {
      window.location.href = mailtoHref(values, tier);
      mount.querySelector('.enquiry__wrap').innerHTML = done(enquiry.handoff);
      return;
    }

    button.disabled = true;
    button.textContent = enquiry.sending;
    note.textContent = '';

    try {
      await post(values, tier);
      mount.querySelector('.enquiry__wrap').innerHTML = done(enquiry.success);
    } catch (error) {
      console.error(error);
      button.disabled = false;
      button.textContent = enquiry.submit;
      note.innerHTML = `${enquiry.error} <a href="${mailtoHref(values, tier)}">${enquiry.to}</a>`;
    }
  });

  // Clear a field's error as soon as the reader starts fixing it.
  form.addEventListener('input', (event) => {
    const wrap = event.target.closest('[data-field]');
    if (!wrap || !wrap.classList.contains('field--invalid')) return;
    wrap.classList.remove('field--invalid');
    wrap.querySelector('.field__error').textContent = '';
  });
}

boot();
