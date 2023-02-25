chrome.commands.onCommand.addListener((command) => {
    if(command === 'run-foo') {
        chrome.tabs.query({active:true, currentWindow: true}, (tabs) => {
            const tabId = tabs[0].id;

            chrome.tabs.sendMessage(tabId, {msg: "start-gpt"}, (response) => {
                if (chrome.runtime.lastError) {
                    console.log("Error sending message: ", chrome.runtime.lastError);
                  } else {
                    console.log("Message sent: ", response);
                  }
            });
            
            console.log('Speech to text is being activated');
        })
    }
})

chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
    if(request.action === 'makeSearch') {
        chrome.tabs.query({url: "https://chat.openai.com/chat/*"}, (tabs) => {
            const tabId = tabs[0].id;

            chrome.tabs.sendMessage(tabId, {action: "makeSearch", input: request.input});
        })
    }
})