export function isReact() {
  let errors = [];

  const iframeList = document.querySelectorAll("iframe");
  if (iframeList.length > 0) {
    const iframe = iframeList[0].contentDocument;

    const spans = iframe.querySelectorAll("span");

    const allElements = iframe.getElementsByTagName("*");
    const matchingElements = [];

    for (let element of allElements) {
      const color = window.getComputedStyle(element).color;
      if (color === "rgb(232, 59, 70)") {
        matchingElements.push(element);
      }
    }


    matchingElements.map((ele) => {
      let d = extractFilePathDetails(ele.textContent);
      if (d) {
        errors.push({
          file: d.file,
          line: d.line,
          framework: "react",
        });
      }
    });

    const targetSpan = Array.from(spans).find(
      (span) =>
        span.textContent.includes("Line ") ||
        span.style.color === "rgb(232, 59, 70)"
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
        framework: "react",
      });
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

function extractFilePathDetails(inputString) {
  const regex = /([^ ]+):(\d+:\d+)/;
  const match = regex.exec(inputString);

  if (match) {
    const filePath = match[1];
    const lineColumn = match[2];

    return {
      file: filePath,
      line: lineColumn,
    };
  } else {
    return null;
  }
}
