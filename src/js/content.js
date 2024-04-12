import { isNext } from "./actions/next.js";
import { isVue } from "./actions/vue.js";

export function main() {
  // let framework = "";

  const url = window.location.host;

  let port = url.split(":")[1];
  port = Number(port);

  switch (true) {
    // react || next
    case port >= 3000 && port <= 3100:
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === "childList") {
            const addedNodes = mutation.addedNodes;
            addedNodes.forEach(function (node) {
              if (node.nodeName === "NEXTJS-PORTAL") {
                isNext();
              }
            });
          }
        });
      });

      observer.observe(document.body, { childList: true });

      break;

    case port >= 8080 && port <= 8090:
      isVue();

      break;

    case !isNaN(port):
      break;

    default:
      break;
  }

  // function getAppJsFilePath() {
  //   // const scripts = document.querySelectorAll('iframe');
  //   const iframeList = document.querySelectorAll("iframe");
  //   if (iframeList) {
  //     const iframe = iframeList[0].contentDocument;

  //     const divElement = iframe.querySelector(
  //       'div[style="line-height: 1.5; font-size: 1rem; font-family: Menlo, Consolas, monospace;"]'
  //     );
  //     console.log("divElement", divElement.textContent);
  //     const jsFile = getPath(divElement.textContent);
  //     const appJsFileUrl = new URL(jsFile, window.location);
  //     console.log("appJsFileUrl", window);
  //     // chrome.runtime.sendMessage({ type: 'appJsFilePath', data: appJsFileUrl.href });
  //   }
  //   // for (const script of scripts) {
  //   //   const src = script.src;
  //   //   console.log("src", src);
  //   //   // if (src.includes('App.js')) {
  //   //     const appJsFileUrl = new URL(src, window.location.href);
  //   //     console.log("appJsFileUrl", appJsFileUrl);
  //   //     chrome.runtime.sendMessage({ type: 'appJsFilePath', data: appJsFileUrl.href });
  //   //     break;
  //   //   // }
  //   // }
  // }

  // getAppJsFilePath();
}
