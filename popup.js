const setDOMInfo = info => {
  document.getElementById("hello").textContent = info.total
}

window.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    console.log("tabs", tabs);
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        {},
        setDOMInfo
        // ...also specifying a callback to be called 
        //    from the receiving end (content script).
        );
  });
});
