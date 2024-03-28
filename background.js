// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     files: ["content.js"],
//   });
//   chrome.windows.create({
//     url: "popup.html",
//     type: "popup",
//     height: 600, // Adjust the height as needed
//     width: 400, // Adjust the width as needed
//   });
// });

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (message.type === "CONSOLE_LOG") {
//     console.log(`Captured log from content script: ${message.message} (${message.level})`);
//     // You can process or store the log messages here
//   } else if (message.type === "CONTENT_SCRIPT_READY") {
//     console.log("Content script ready, sending override command");
//     chrome.tabs.sendMessage(sender.tab.id, { type: "OVERRIDE_CONSOLE" });
//   }
// });



// chrome.runtime.onMessage.addListener((msg, sender) => {
//     // First, validate the message's structure.
//     if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
//       // Enable the page-action for the requesting tab.
//       chrome.pageAction.show(sender.tab.id);
//     }
//   });