(async () => {
    const src = chrome.runtime.getURL('src/js/content.js');
    const contentScript = await import(src);
    contentScript.main();
  })();
  