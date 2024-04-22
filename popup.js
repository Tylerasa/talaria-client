const EXT_ID = "tylerasa.talaria-server";

const setDOMInfo = (errors) => {
  errors.map((err) => {
    const { file, line } = err;
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
      var vscodeUrl = `vscode://${EXT_ID}?file=${file}&line=${line}`;
      window.open(vscodeUrl);
    });

    list.appendChild(newListItem);
  });
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
