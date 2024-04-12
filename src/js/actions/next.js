export function isNext() {
  let errors = [];
  getErrorFile()
    .then((result) => {
      if (result !== "Element not found") {
        const parts = result.split(" ");
        const file = parts[0];
        const finalPath = getFullPath(file);
        let line = getLineChar(result);
        errors.push({
          file: finalPath,
          line,
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

  if (elementWithTitle) {
    const shadowRoot = elementWithTitle.shadowRoot;

    return new Promise((resolve) => {
      const observer = new MutationObserver(function (mutations) {

        for (const mutation of mutations) {
          if (mutation.type === "childList") {
            for (const node of mutation.addedNodes) {
              const el = node.querySelector(
                '[title="Click to open in your editor"]'
              );
              if (el) {
                const spanElement = el.querySelector("span");

                if (spanElement) {
                  observer.disconnect();
                  resolve(spanElement.textContent);
                  return;
                }
              }
            }
          }
        }
      });

      observer.observe(shadowRoot, { childList: true });
    });
  } else {
    return Promise.resolve("Element not found");
  }
}

function getFullPath(file) {
  const scripts = Array.from(document.getElementsByTagName("script"));

  let found = scripts.filter((spt) => spt.text.includes(file));

  if (found) {
    let str = found[0].text;
    let regex = /([^ ]*node_modules[^ ]*)/;
    const match = str.match(regex);

    if (match) {
      let rawText = match[0];
      let regexNM = /\(([^ ]*node_modules)[^ ]*\)/;

      let rawMatch = rawText.match(regexNM);
      if (rawMatch) {
        let rawWithNM = rawMatch[1];
        let finalPath = rawWithNM.replace("node_modules", file);
        return finalPath;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
