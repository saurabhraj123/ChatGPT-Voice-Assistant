chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'makeSearch') {
    console.log('Content-Script', request);
    document.querySelector('textarea').value = request.input;

    const xpathResult = document.evaluate('//*[@id="__next"]/div[1]/div[1]/main/div[2]/form/div/div[2]/button', document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

    // loop through the result set and print the text content of each element
    let node = xpathResult.iterateNext();
    while (node) {
      console.log(node.click());
      node = xpathResult.iterateNext();
    }
  }
})

// select the parent div you want to observe
const target = document.querySelector('main > div.flex-1.overflow-hidden > div > div > div');

let text = "";
let old = "";

// create a new MutationObserver instance
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // console.log(mutation);
    if (mutation.type === "childList") {
      console.log('---------------------------');
      for (const addedNode of mutation.addedNodes)
        console.log(addedNode.textContent);

      text = '';

    } else if (mutation.type === 'characterData') {
      let output = mutation.target.textContent;
      output = output.trimEnd();

      const lastChar = output.slice(-1);
      console.log('LastChar', lastChar);
      if (lastChar === '.' || lastChar === '?' || lastChar === '!' || lastChar === ':') {
        // let oldPara = text.slice(' ');
        let newPara = output.slice(text.length);

        let speech = new SpeechSynthesisUtterance(newPara);
        // speech.rate = 5;
        speechSynthesis.speak(speech);
        console.log('here', text);
        // old = speech;
        text = output;
      }

      console.log('Changed text content:', mutation.target.textContent);
    }
  });
});

// configure the observer to only look for child element additions
const config = { childList: true, characterData: true, subtree: true };

// start observing the parent div
observer.observe(target, config);
