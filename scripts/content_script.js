(async () => {
  const src = chrome.runtime.getURL("actions/next.js");
  const contentMain = await import(src);
  contentMain.main();
})();
