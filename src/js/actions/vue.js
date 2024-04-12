export function isVue() {
  let errors = [];

  const iframeList = document.querySelectorAll("iframe");
  if (iframeList) {
    const iframe = iframeList[0].contentDocument;

    const divElement = iframe.getElementsByTagName("u");

    for (var i = 0; i < divElement.length; i++) {
      var underlineElement = divElement[i];

      var parentElement = underlineElement.parentElement;

      var siblingOfParent = parentElement.nextElementSibling;

      var children = siblingOfParent.children;
      for (var j = 0; j < children.length; j++) {
        var child = children[j];

        var computedStyle = window.getComputedStyle(child);
        if (computedStyle.opacity === "0.5") {
          let data = {
            file: underlineElement.innerHTML,
            line: child.innerHTML,
          };

          errors.push(data);
          break;
        }
      }
    }
  }

  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    response(errors);
  });
}
