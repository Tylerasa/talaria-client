export function isReact() {
  let errors = [];

  const iframeList = document.querySelectorAll("iframe");
  if (iframeList.length > 0) {
    const iframe = iframeList[0].contentDocument;

    const spans = iframe.querySelectorAll("span");

    const targetSpan = Array.from(spans).find((span) =>
      span.textContent.includes("Line ")
    );

    if (targetSpan) {
      let parentElement = targetSpan.parentElement;
      let file = getFile(parentElement.firstChild.textContent);
      if (!file) return;

      let targetSpanTextContent = targetSpan.textContent;
      let lineRaw = targetSpanTextContent.split("Line ");
      let line = lineRaw[1].endsWith(":")
        ? lineRaw[1].slice(0, -1)
        : lineRaw[1];

      errors.push({
        file,
        line,
        framework: "react"

      });
    } else {
      console.log("Element with the specified text content not found.");
    }
  }

  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    response(errors);
  });
}

function getFile(str) {
  const substring = str.match(/\S+\.\S+/)[0];
  return substring;
}
