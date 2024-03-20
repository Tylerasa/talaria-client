chrome.action.onClicked.addListener((tab) => {
  console.log("chrome.devtools", chrome);
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['content.js']
  });
});



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("message", message);
    // Perform an asynchronous operation that might fail
    chrome.storage.local.set({ someData: message.data }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error saving data:", chrome.runtime.lastError.message);
        // Handle the error (e.g., display a user notification)
      } else {
        console.log("Data saved successfully!");
      }
    });
});

