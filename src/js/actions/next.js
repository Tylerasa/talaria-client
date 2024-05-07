export function isNext() {
  let errors = [];
  getErrorFile()
    .then((result) => {
      if (result !== "Element not found") {
        let file, line;
        if (result.startsWith("./")) {
          let text = result.substring(2);
          if (text.indexOf(":") === text.lastIndexOf(":")) {
            file = text;
          } else {
            let firstColonIndex = text.indexOf(":");

            file = text.substring(0, firstColonIndex);

            line = text.substring(firstColonIndex + 1);
          }
        } else {
          const parts = result.split(" ");
          file = parts[0];
          line = getLineChar(result);
        }

        errors.push({
          file,
          line,
          framework: "next",
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      chrome.runtime.onMessage.addListener((msg, sender, response) => {
        response(errors);
      });
    });
}

function getLineChar(text) {
  const matches = text.match(/\((.*?)\)/);
  if (matches) {
    const textInsideBrackets = matches[1];
    return textInsideBrackets;
  }
  return "";
}

function getErrorFile() {
  const elementWithTitle = document.querySelector("nextjs-portal");

  if (!elementWithTitle) {
    return Promise.resolve("Element not found");
  }

  const shadowRoot = elementWithTitle.shadowRoot;

  if (!shadowRoot) {
    return Promise.resolve("Shadow root not found");
  }

  const buildErrorElement = shadowRoot.querySelector(
    "#nextjs__container_errors_label"
  );

  if (
    buildErrorElement &&
    buildErrorElement.innerText.includes("Build Error")
  ) {
    const errorFileElement = shadowRoot.querySelector("[role=link]");
    if (errorFileElement) {
      const filePath = errorFileElement.textContent;
      return Promise.resolve(filePath);
    }
  }

  if(shadowRoot.innerHTML.includes("Failed to compile")){
    let preEle = shadowRoot.querySelector("pre")
    if(preEle && preEle.firstChild){
      const filePath = preEle.firstChild.textContent;
      return Promise.resolve(filePath);

    }
  }

  return new Promise((resolve) => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          for (const node of mutation.addedNodes) {
            const errorFileElement = node.querySelector(
              '[title="Click to open in your editor"] span, [title="Click to open in your editor"] div'
            );
            if (errorFileElement) {
              observer.disconnect();
              resolve(errorFileElement.textContent);
              return;
            }
          }
        }
      }
    });

    observer.observe(shadowRoot, { childList: true, subtree: true });
  });
}
