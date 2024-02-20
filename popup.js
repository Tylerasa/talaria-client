// Add a bookmark for www.google.com
function getLink() {
  // Check if the element was found
  // const elementWithTitle = document.querySelector('[title="Click to open in your editor"]');



  chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['content.js']
    });
  });
  



}

// Add click event listeners to the buttons
// console.log('document.getElementById("link")', document.getElementById("link"));
document.getElementById("link").addEventListener("click", getLink);
