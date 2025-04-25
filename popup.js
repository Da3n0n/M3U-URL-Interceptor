document.addEventListener('DOMContentLoaded', function() {
  const urlElement = document.getElementById('m3uUrl');
  const copyButton = document.getElementById('copyButton');

  // Request the stored URL when popup opens
  chrome.runtime.sendMessage({ action: 'getM3uUrl' }, function(response) {
    if (response && response.url) {
      urlElement.textContent = response.url;
    } else {
      urlElement.textContent = 'No M3U URL captured yet. Browse a page that loads an M3U file.';
    }
  });

  // Handle copy button click
  copyButton.addEventListener('click', function() {
    const urlText = urlElement.textContent;
    if (urlText && urlText !== 'No M3U URL captured yet. Browse a page that loads an M3U file.') {
      navigator.clipboard.writeText(urlText).then(function() {
        // Change button text temporarily
        copyButton.textContent = 'Copied!';
        setTimeout(function() {
          copyButton.textContent = 'Copy URL';
        }, 2000);
      }, function(err) {
        console.error('Failed to copy: ', err);
        copyButton.textContent = 'Error copying';
        setTimeout(function() {
          copyButton.textContent = 'Copy URL';
        }, 2000);
      });
    }
  });
}); 