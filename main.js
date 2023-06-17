console.log('Loudify is loaded')
let increaseRate = 1; 
let videoElement; 

videoElement = document.querySelector('video')

let getTitle = (increaseRate) => {
  return `Loudify ${increaseRate}x` 
}

if(videoElement) {
  
  let audioContext = new window.AudioContext()
  let source = audioContext.createMediaElementSource(videoElement);
  let gainNode = audioContext.createGain();
  
  source.connect (gainNode)
  gainNode.connect(audioContext.destination)
  
  let button = document.createElement('button')
  let initialX, initialY;
  let currentX, currentY;
  
  button.innerText = getTitle(increaseRate) 
  button.style.backgroundColor = 'blue'
  button.style.color = 'white'
  button.style.position = 'absolute'
  button.style.zIndex = '9999'
  button.style.top = '0px'
  button.style.right = '0px'
  button.style.opacity = '0.7'
  button.style.border = '2px dashed blue'
  button.draggable = true
  button.addEventListener('click', function() {
    increaseRate = increaseRate < 3 ? increaseRate + 1 : 1
    gainNode.gain.value = increaseRate 
    button.innerText = getTitle(increaseRate)
    console.log('Video Element', videoElement, 'Increase rate', increaseRate, 'document', document)
  })

  button.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.effectAllowed = 'move';

    initialX = event.clientX + window.scrollX;
    initialY = event.clientY + window.scrollY;

    let rect = button.getBoundingClientRect();
    currentX = rect.left + window.scrollX;
    currentY = rect.top + window.scrollY;
  });
  
  button.addEventListener('dragover', function(event) {
    event.preventDefault();
  });
  
  button.addEventListener('dragend', function(event) {
    event.preventDefault();
  
    let deltaX = event.clientX + window.scrollX - initialX;
    let deltaY = event.clientY + window.scrollY - initialY;
  
    button.style.left = currentX + deltaX + 'px';
    button.style.top = currentY + deltaY + 'px';
  });

  document.body.appendChild(button)
}
