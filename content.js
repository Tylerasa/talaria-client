// Select the element with the specified title
const elementWithTitle = document.querySelector('nextjs-portal');

// Check if the element was found
if (elementWithTitle) {
  // Do something with the element, for example, log its contents
  const shadowRoot = elementWithTitle.shadowRoot;
  const el = shadowRoot.querySelectorAll('[title="Click to open in your editor"]');
  el.forEach(element => {
      const spanElement = element.querySelector('span');
      if (spanElement) {
          const textInsideSpan = spanElement.textContent;
          console.log(textInsideSpan); // or do whatever you want with the text content
      }
  });
  

// const l = elementWithTitle.querySelector('style');
// console.log("l", l);
  
} else {
  console.log("=>", elementWithTitle);

  console.log("Element not found");
}

alert("hello");
