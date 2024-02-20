// Select the element with the specified title
const elementWithTitle = document.querySelector("nextjs-portal");

// Check if the element was found
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
      console.log("line", line);
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
