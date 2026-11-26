// All visible ASCII characters (0x21–0x7e), excluding whitespace.
const alphabet = Array.from({ length: 94 }, (_, index) => String.fromCharCode(index + 0x21));

const result = document.querySelector('#result');
const status = document.querySelector('#status');
const copyButton = document.querySelector('#copy');
const lengthButtons = [...document.querySelectorAll('[data-length]')];
let selectedLength = 32;
let statusTimer;

document.addEventListener('contextmenu', event => event.preventDefault());

function generate(length) {
  copyButton.dataset.copied = 'false';
  const characters = [];
  const acceptedRange = Math.floor(0x1_0000_0000 / alphabet.length) * alphabet.length;

  while (characters.length < length) {
    const randomValues = new Uint32Array(Math.max(16, length - characters.length));
    crypto.getRandomValues(randomValues);
    for (const value of randomValues) {
      if (value < acceptedRange) characters.push(alphabet[value % alphabet.length]);
      if (characters.length === length) break;
    }
  }

  result.textContent = characters.join('');
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

copyButton.addEventListener('click', async () => {
  const value = result.textContent;
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(value);
    copyButton.dataset.copied = 'true';
    setStatus('');
  } catch {
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    field.style.webkitUserSelect = 'text';
    field.style.userSelect = 'text';
    document.body.append(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    if (copied) {
      copyButton.dataset.copied = 'true';
      setStatus('');
    } else {
      setStatus('Copy unavailable — select the string to copy it.');
    }
  }
});

generate(selectedLength);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
      await registration.update();
    } catch {
      // The cached app remains usable when the network is unavailable.
    }
  });
}
