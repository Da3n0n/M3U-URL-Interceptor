// Variable to store the latest M3U URL
let latestM3uUrl = null;

// Listen for network requests
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.method === 'GET' && details.url.includes('m3u')) {
      latestM3uUrl = details.url;
      console.log('M3U URL captured:', latestM3uUrl);
    }
  },
  { urls: ['*://*/*'] },
  []
);

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getM3uUrl') {
    sendResponse({ url: latestM3uUrl });
  }
});

// Log when extension is installed or updated
chrome.runtime.onInstalled.addListener(function() {
  console.log('Extension installed or updated');
  latestM3uUrl = null;
}); 