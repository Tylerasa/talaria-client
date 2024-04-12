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
}
