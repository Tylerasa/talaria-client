export function isVue() {
  let errors = [];

  const iframeList = document.querySelectorAll("iframe");
  if (iframeList.length > 0) {
    const iframe = iframeList[0].contentDocument;

    const underlineElements = iframe.getElementsByTagName("u");

    for (let underlineElement of underlineElements) {
      const parentElement = underlineElement.parentElement;
      const siblingOfParent = parentElement.nextElementSibling;

      const targetChild = Array.from(siblingOfParent.children).find((child) => {
        const computedStyle = window.getComputedStyle(child);
        return computedStyle.opacity === "0.5";
      });

      if (targetChild) {
        errors.push({
          file: underlineElement.innerHTML,
          line: targetChild.innerHTML,
          framework: "vue"

        });
      }
    }
  }

  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    response(errors);
  });
}
