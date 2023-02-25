// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if(request.run === "true") {
//         alert("Received a message");
//     }

//     alert('Recevied')
// })


// Listen for messages sent from other parts of the extension or from external sources
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    if(request.msg === 'start-gpt') {
        input.hidden = !input.hidden;
    }

    console.log('Message received:', request);
  
    // Send a response back to the sender
    sendResponse({ message: 'Response from background script' });
  });


// Create a new input element
var input = document.createElement('input');
input.setAttribute('type', 'text');
input.style.position = 'fixed';
input.style.zIndex = '9999';
input.style.width = '50vw';
input.style.top = '50%';
input.style.left = '50%';
input.style.color = 'black';
input.style.transform = 'translate(-25vw, -1em)';
input.hidden = true;

// Add an event listener that listens to keyboard events on the input element
input.addEventListener('keydown', function(event) {
    // If the Enter key is pressed
    if (event.keyCode === 13) {
      // Get the value of the input field
      var inputValue = input.value;
      
    chrome.runtime.sendMessage({action: "makeSearch", input: inputValue});
    
      // Clear the input field
      input.value = '';
    }
  });

document.body.appendChild(input);