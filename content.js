console.log("<==>");
console.log("chrome.devtools", chrome);

// const EXT_ID = "tylerasa.talaria-server";

// let text = getErrorFile();
// console.log("text", text);


// const parts = text.split(" ");

// const file = parts[0];

// const finalPath = getFullPath(file);

// openUri(text, finalPath);


// function getLineChar(text) {
//   const matches = text.match(/\((.*?)\)/);
//   if (matches) {
//     const textInsideBrackets = matches[1];
//     console.log(textInsideBrackets);
//     return textInsideBrackets;
//   }
//   return "";
// }

// function getFilenameFromString(str) {
//   const parts = str.split(" ");

//   const filePath = parts[0];

//   return filePath ?? "";
// }

// function getErrorFile() {
//   const elementWithTitle = document.querySelector("nextjs-portal");

//   if (elementWithTitle) {
//     const shadowRoot = elementWithTitle.shadowRoot;
//     const el = shadowRoot.querySelectorAll(
//       '[title="Click to open in your editor"]'
//     );
//     let txt = "";
//     el.forEach((element) => {
//       const spanElement = element.querySelector("span");
//       if (spanElement) {
//         // const textInsideSpan = spanElement.textContent;
//         txt = spanElement.textContent;
//         return;
//       }
//     });
//     return txt;
//   }
//   return "Element not found";
// }

// function openUri(text, finalPath) {
//   let line = getLineChar(text);

//   // vscode://tylerasa.talaria-server?file=app.tsx&line=30
//   let uri = `vscode://${EXT_ID}?file=${finalPath}&line=${line}`;
//   window.open(uri);
// }

// function getFullPath(file) {
//   console.log("file", file);
//   const scripts = Array.from(document.getElementsByTagName("script"));

//   let found = scripts.filter((spt) => spt.text.includes(file));

//   if (found) {
//     let str = found[0].text;
//     let regex = /([^ ]*node_modules[^ ]*)/;
//     const match = str.match(regex);

//     if (match) {
//       let rawText = match[0];
//       let regexNM = /\(([^ ]*node_modules)[^ ]*\)/;

//       let rawMatch = rawText.match(regexNM);
//       if (rawMatch) {
//         let rawWithNM = rawMatch[1];
//         let finalPath = rawWithNM.replace("node_modules", file);
//         return finalPath;
//       } else {
//         return null;
//       }
//     } else {
//       return null;
//     }
//   }
// }



// function getAppJsFilePath() {
//   // const scripts = document.querySelectorAll('iframe');
//   const iframeList = document.querySelectorAll('iframe');
//   if(iframeList){
//     const iframe = iframeList[0].contentDocument



//     const divElement = iframe.querySelector('div[style="line-height: 1.5; font-size: 1rem; font-family: Menlo, Consolas, monospace;"]');
//     console.log("divElement", divElement.textContent);
//     const jsFile  = getPath(divElement.textContent)
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





// function getPath(input) {
//   const regex = /\b([\w\-_\\\/]+\.(js|jsx|ts|tsx))\b/;
//   const match = input.match(regex);

//   if (match) {
//     return match[1]; 
//   }

//   return null; 
// }