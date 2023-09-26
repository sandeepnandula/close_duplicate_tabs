document.addEventListener("DOMContentLoaded", async () => {
  updateTabsInfo();
  addEventListeners();
});


// Function to retrieve all open tabs
function getAllTabs() {
  return new Promise((resolve) => {
      chrome.tabs.query({}, (tabs) => {
          resolve(tabs);
      });
  });
}


const addEventListeners = () => {
  var closeDuplicateTabsButton = document.getElementById("closeDuplicateTabsButton");
  closeDuplicateTabsButton.addEventListener("click", function () {
      chrome.runtime.sendMessage({ action: "closeDuplicateTabs" });
  });
}

const updateTabsInfo = () => {
  chrome.tabs.query({}, function (tabs) {
      var tabCount = tabs.length;
      var tabUrls = {};
      var duplicateTabCount = 0;

      tabs.forEach(function (tab) {
          if (tabUrls[tab.url]) {
              duplicateTabCount++;
          } else {
              tabUrls[tab.url] = true;
          }
      });

      chrome.windows.getAll({ populate: true }, function (windows) {
          var windowCount = windows.length;
          document.getElementById("openTabsInfo").textContent = `Open Tabs: ${tabCount} | Duplicate Tabs: ${duplicateTabCount} | Open Windows: ${windowCount}`;
      });
  });
}

