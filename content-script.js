chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action === 'makeSearch') {
        console.log(request);
        document.querySelector('textarea').value = request.input;
    }
})

// const target = document.querySelector('div');
// const target = document.querySelector('main > div.flex-1.overflow-hidden > div > div ');
// // const target = markdown[markdown.length - 1];
// // console.log(target);

// const observer = new MutationObserver((mutations) => {
//     console.log(mutations);
//     mutations.forEach((mutation) => {
//         // console.log('Textarea content has changed')
//         console.log(mutation.target.textContent)
//     })
// })

// // Configure the observer to observe the target element
// const config = {
//     // attributes: true, // observe changes to attributes
//     childList: true, // observe changes to the child nodes
//     characterData: true, // observe changes to the text content of the target element or its descendants
//     subtree: true // observe changes to all descendants
//   };

// observer.observe(target, config);


// select the parent div you want to observe
const target = document.querySelector('main > div.flex-1.overflow-hidden > div > div > div');

// create a new MutationObserver instance
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
        for (const addedNode of mutation.addedNodes) {
            // Do something with the added node
            // console.log('Added node:', addedNode);
            console.log(addedNode.textContent);
          }
      // do something when a child element is added to the parent div
    //   console.log("Child element added:", mutation.addedNodes[0]);
    // console.log(mutation.target.textContent);
    }else if (mutation.type === 'characterData') {
        // Do something with the text content that was changed
        console.log('Changed text content:', mutation.target.textContent);
    }
  });
});

// configure the observer to only look for child element additions
const config = { childList: true, characterData: true, subtree: true };

// start observing the parent div
observer.observe(target, config);
