const EXT_ID = "sylvestersarpong.talaria-server";

// vscode://sylvestersarpong.talaria-server?file=app/dashboard/organizations/[id]/groups/[gid]/images/page.tsx&line=10&framework=next
const setDOMInfo = (errors) => {

  if (errors) {
    // chrome.action.setBadgeText({ text: errors.length.toString() });
    // chrome.action.setBadgeBackgroundColor({ color: "#2ecc71" });
    // chrome.action.setBadgeTextColor({ color: "#fff" });

    errors.map((err) => {
      const { file, line, framework } = err;
      let list = document.getElementById("list");

      var newListItem = document.createElement("li");
      newListItem.className = "item";

      var h3Element = document.createElement("h3");
      h3Element.className = "line-number";
      h3Element.textContent = line;
      newListItem.appendChild(h3Element);

      var aElement = document.createElement("a");
      aElement.style.marginTop = "4px";
      aElement.className = "file";
      aElement.textContent = file;
      newListItem.appendChild(aElement);

      aElement.addEventListener("click", function (event) {
        event.preventDefault();
        var vscodeUrl = `vscode://${EXT_ID}?file=${file}&line=${line}&framework=${framework}`;
        window.open(vscodeUrl);
      });

      list.appendChild(newListItem);
    });
  }else{
    // chrome.action.setBadgeText({ text: "" });
    // chrome.action.setBadgeBackgroundColor({ color:[0, 0, 0, 0] });
    // chrome.action.setBadgeTextColor({ color:[0, 0, 0, 0] });
  }
};

const triggerCall = () => {
  var list = document.getElementById("list");

  while (list.firstChild) {
    element.removeChild(list.firstChild);
  }

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: "popup", subject: "DOMInfo" },
        {},
        setDOMInfo
      );
    }
  );
};

triggerCall();
