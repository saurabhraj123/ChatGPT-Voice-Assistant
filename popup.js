let submitBtn = document.querySelector('#btn');
let input = document.querySelector('#searchInput');

submitBtn.addEventListener('click', () => {
    chrome.tabs.query({url: "https://chat.openai.com/chat/*"}, (tabs) => {
        let tabId = tabs[0].id;
    
        chrome.tabs.sendMessage(tabId, {action: "makeSearch", input:input.value})
    })
})