chrome.devtools.inspectedWindow.getResources((resources) => {
    console.log("Loaded Resources:");
    for (const resource of resources) {
      console.log(resource.url, resource.type); // Access resource URLs and types
    }
  });
  