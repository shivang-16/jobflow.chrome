chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  chrome.cookies.get({ url: 'http://localhost:3000', name: 'token' }, (cookie) => {
    if (chrome.runtime.lastError) {
      console.error("Error fetching cookies:", chrome.runtime.lastError);
      sendResponse({}); // Send an empty array if there's an error
    } else {
      console.log("Fetched cookies:", cookie);
      sendResponse({"token": cookie.value});
    }
  });
  
  // Return true to indicate that the response will be sent asynchronously
  return true;
});

