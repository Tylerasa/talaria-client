// Select the element with the specified title
const elementWithTitle = document.querySelector("nextjs-portal");
const EXT_ID = 'tylerasa.talaria-server'


if (elementWithTitle) {
  // Do something with the element, for example, log its contents
  const shadowRoot = elementWithTitle.shadowRoot;
  const el = shadowRoot.querySelectorAll(
    '[title="Click to open in your editor"]'
  );
  el.forEach((element) => {
    const spanElement = element.querySelector("span");
    if (spanElement) {
      const textInsideSpan = spanElement.textContent;

      let line = getLineChar(textInsideSpan);
      let file = getFilenameFromString(textInsideSpan);
      console.log("line", line);
      console.log("file", file);

      // vscode://tylerasa.talaria-server?file=app.tsx&line=30
      let uri = `vscode://${EXT_ID}?file=${file}&line=${line}`
      window.open(uri);

    }
  });

  // const l = elementWithTitle.querySelector('style');
  // console.log("l", l);
} else {
  console.log("Element not found");
}

alert("hello");

function getLineChar(text) {
  const matches = text.match(/\((.*?)\)/);
  if (matches) {
    const textInsideBrackets = matches[1];
    console.log(textInsideBrackets);
    return textInsideBrackets;
  }
  return "";
}

function getFilenameFromString(str) {
  const parts = str.split(" ");

  const filePath = parts[0];

  return filePath ?? "";
}
