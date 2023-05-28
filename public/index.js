const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const registration = await window.navigator.serviceWorker.register('./sw.js', {
      scope: __uv$config.prefix
    });

    let url = input.value.trim();
    if (!isUrl(url)) {
      url = 'https://www.google.com/search?q=' + url;
    } else if (!(url.startsWith('https://') || url.startsWith('http://'))) {
      url = 'http://' + url;
    }

    window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
  } catch (error) {
    console.error('Error occurred during service worker registration:', error);
  }
});

function isUrl(val = '') {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  return urlRegex.test(val);
}
