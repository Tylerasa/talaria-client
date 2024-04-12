export function isVue() {
  let errors = [];

  console.log("is vue");
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
          console.log("data", data);

          errors.push(data);
          break;
        }
      }
    }
  }

  console.log("in error", errors);
  console.log(" chrome.runtime",  chrome.runtime.onMessage.addListener((msg, sender)=> console.log("he", msg, sender)));
  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    console.log("out error", errors);

    response(errors);
  });
}
