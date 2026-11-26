// A curated collection of printable characters. Combining marks, controls, and
// multi-code-point emoji sequences are excluded so each choice is a visible glyph.
const alphabet = Array.from(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
  '¡¿«»‹›‐‑‒–—―…·•§¶†‡°‰′″※' +
  'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞß' +
  'àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ' +
  'ĀĂĄĆĈČĎĐĒĖĘĞĢĪĮĶŁŃŅŇŌŐŔŘŚŞŠŢŤŪŮŰŹŻŽ' +
  'āăąćĉčďđēėęğģīįķłńņňōőŕřśşšţťūůűźżž' +
  'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω' +
  'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя' +
  'ƒ“”‘’€£¥¢₹₽₩₺₫₴₦₱₡₲₵₸' +
  '∞≠≈≤≥±÷×√∑∏∫∆∂µπΩ∅∈∉⊂⊃∩∪∧∨¬∀∃→←↔↑↓↗↘↙↖' +
  '♥♦♣♠♪♫✓✔✕✦✧★☆☀☁☂☃☯⚙⚡' +
  '!#$%&()*+,-./:;=?@[\\]^_{|}~<>`"\' '
);

const result = document.querySelector('#result');
const status = document.querySelector('#status');
const lengthButtons = [...document.querySelectorAll('[data-length]')];
let selectedLength = 32;
let statusTimer;

function generate(length) {
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  result.textContent = Array.from(randomValues, value => alphabet[value % alphabet.length]).join('');
}

function setStatus(message) {
  clearTimeout(statusTimer);
  status.textContent = message;
  if (message) statusTimer = setTimeout(() => { status.textContent = ''; }, 1800);
}

lengthButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedLength = Number(button.dataset.length);
    document.querySelector('.length-control').dataset.activeIndex = String(lengthButtons.indexOf(button));
    lengthButtons.forEach(item => {
      if (item === button) item.setAttribute('data-selected', 'true');
      else item.removeAttribute('data-selected');
    });
    generate(selectedLength);
    setStatus('');
  });
});

document.querySelector('#copy').addEventListener('click', async () => {
  const value = result.textContent;
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(value);
    setStatus('Copied');
  } catch {
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.append(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    setStatus(copied ? 'Copied' : 'Copy unavailable — select the string to copy it.');
  }
});

generate(selectedLength);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
}
