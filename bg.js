chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    switch (request.action) {
        case "closeDuplicateTabs":
            closeDuplicateTabs();
            break;
        default:
            break;
    }
});

// Will close all the duplicate tabs
function closeDuplicateTabs() {
    chrome.tabs.query({}, function (tabs) {
        var tabUrls = {};
        tabs.forEach(function (tab) {
            if (!tabUrls[tab.url]) {
                tabUrls[tab.url] = tab.id;
            } else {
                chrome.tabs.remove(tab.id);
            }
        });
    });
}