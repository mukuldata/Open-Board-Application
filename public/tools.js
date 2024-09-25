let optionsCont = document.querySelector(".options-cont");
let toolsCont = document.querySelector(".tools-cont");
let pencilCont = document.querySelector(".pencil-tool-cont");
let eraserCont = document.querySelector(".eraser-tool-cont");


let pencilTool = document.querySelector(".pencil");
let eraserTool = document.querySelector(".eraser");


let pencilFlag = false;
let eraserFlag = false;

//Toggle option button:
// true-->tools show , false--> hide tools
let optionsFlag = true;
optionsCont.addEventListener("click", (e) => {
  optionsFlag = !optionsFlag;
  if (optionsFlag) openTools();
  else closeTools();
})

// Open the tools
function openTools() {
  let iconsElem = optionsCont.children[0];
  // classList means list of classes in element
  iconsElem.classList.remove("fa-times");
  iconsElem.classList.add("fa-bars");
  toolsCont.style.display = "flex";

}

// Close the tools:
function closeTools() {
  let iconsElem = optionsCont.children[0];
  iconsElem.classList.remove("fa-bars");
  iconsElem.classList.add("fa-times");
  toolsCont.style.display = "none";

  // pencil and eraser display
  pencilCont.style.display = "none";
  eraserCont.style.display = "none";
}

// Toogle pencil:
pencilTool.addEventListener("click", (e) => {
  // true-->show pencil tool , false--> hide pencil tool
  console.log("pencil tool is working");
  pencilFlag = !pencilFlag;
  // by default display is block:
  if (pencilFlag) pencilCont.style.display = "block";
  else pencilCont.style.display = "none";
})

// Toogle eraser:
eraserTool.addEventListener("click", (e) => {
  // true-->show eraser tool , false--> hide eraser tool
  eraserFlag = !eraserFlag;
  if (eraserFlag) eraserCont.style.display = "flex";
  else eraserCont.style.display = "none";

})


//Sticky Notes:Making div using javascript and appending it in body 
let notes = document.querySelector(".notes");
notes.addEventListener("click", (e) => {
  // Sticky with text area and without spell check:
  let stickyTemplateHTML =
    `<div class="header-cont">
     <div class="remove"><i class="icons fa-solid fa-xmark"></i></div>
 </div>
 <div class="note-cont">
     <textarea spellcheck="false"></textarea>
 </div>`;
 
 createSticky(stickyTemplateHTML);
  
})



//Minimize and remove functionlity:
//Remove
function noteActions(minimize, remove, stickyCont) {
  remove.addEventListener("click", (e) => {
    stickyCont.remove();
  })

//Minimize:
  // minimize.addEventListener("click", (e) => {
  //   let noteCont = stickyCont.querySelector(".note-cont");
  //   let colorPicker=stickyCont.querySelector(".")
  //   // getComputedStyle() method gets the computed CSS properties 
  //   // and values of an HTML element
  //   let display = getComputedStyle(noteCont).getPropertyValue("display");
  //   if (display == "none") noteCont.style.display = "block";
  //   else noteCont.style.display = "none";
  // })
}

//Drag and drop functionality:
function dragAndDrop(element, event) {
  let shiftX, shiftY;
  let isDragging = false;

  // Function to get the coordinates for both mouse and touch events
  function getCoordinates(e) {
    if (e.touches && e.touches.length > 0) {
      return {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
        pageX: e.touches[0].pageX,
        pageY: e.touches[0].pageY
      };
    } else {
      return {
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY
      };
    }
  }

  // Get initial shift values
  let coords = getCoordinates(event);
  shiftX = coords.clientX - element.getBoundingClientRect().left;
  shiftY = coords.clientY - element.getBoundingClientRect().top;

  element.style.position = 'absolute';
  element.style.zIndex = 1000;

  moveAt(coords.pageX, coords.pageY);

  // Function to move the element at (pageX, pageY)
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + 'px';
    element.style.top = pageY - shiftY + 'px';
  }

  // Mouse move event for desktop
  function onMouseMove(event) {
    let coords = getCoordinates(event);
    moveAt(coords.pageX, coords.pageY);
  }

  // Touch move event for mobile
  function onTouchMove(event) {
    if (event.touches.length > 1) {
      // Allow multi-touch gestures (zooming)
      return;
    }
    
    // Prevent default only when dragging is happening
    if (isDragging) {
      event.preventDefault(); // Prevent scrolling while dragging
    }

    let coords = getCoordinates(event);
    moveAt(coords.pageX, coords.pageY);
  }

  // Start drag on mouse down or touch start
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('touchmove', onTouchMove, { passive: false }); // passive: false to allow preventDefault when needed

  // Initiate drag on mousedown or touchstart
  function startDrag(event) {
    isDragging = true;
    let coords = getCoordinates(event);
    shiftX = coords.clientX - element.getBoundingClientRect().left;
    shiftY = coords.clientY - element.getBoundingClientRect().top;
    moveAt(coords.pageX, coords.pageY);
  }

  // Stop dragging on mouseup or touchend
  function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchend', stopDrag);
  }

  // Mouse down or touch start event to initiate drag
  element.onmousedown = function(event) {
    startDrag(event);
  };

  element.ontouchstart = function(event) {
    if (event.touches.length === 1) { // Only start dragging if it's a single touch
      startDrag(event);
    }
  };

  // Mouse up or touch end event to stop dragging
  element.onmouseup = function() {
    stopDrag();
  };

  element.ontouchend = function() {
    stopDrag();
  };

  // Prevent the default drag behavior (text selection, etc.)
  element.ondragstart = function() {
    return false;
  };
}



//Uploading the file:
let upload = document.querySelector(".upload");

upload.addEventListener("click", (e) => {

  // Open file explorer:
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();
  input.addEventListener("change",(e)=>{
    let file = input.files[0];
    let url = URL.createObjectURL(file);
    let stickyTemplateHTML =
  // Putting image url :
`<div class="header-cont">
    <div class="remove"><i class="icons fa-solid fa-xmark"></i></div>
  </div>
  <div class="note-cont">
     <img src="${url}"/>   
  </div>`;
  createSticky(stickyTemplateHTML);
})
});

  


//Creating a sticky notes:
function createSticky(stickyTemplateHTML) {
  let stickyCont = document.createElement("div");
  stickyCont.setAttribute("class", "sticky-cont");
  stickyCont.innerHTML = stickyTemplateHTML;
  

  // Create a color picker input element
  let colorPicker = document.createElement("input");
  colorPicker.setAttribute("class", "color-picker");
  colorPicker.setAttribute("class", "icons");
  colorPicker.setAttribute("type", "color");
  colorPicker.style.position = "absolute";
  colorPicker.style.bottom = "5px";
  colorPicker.style.left = "5px";

  // Set a default color (optional)
  // stickyCont.style.border  = `6px ridge`

  // Append the color picker to the sticky note container
  stickyCont.appendChild(colorPicker);

  // Change background color based on color picker value
  colorPicker.addEventListener("input", (e) => {
    console.log(e);
    console.log(e.target.value);
    stickyCont.style.boxShadow=`${e.target.value} 0px 5px 15px`;

    // stickyCont.style.border = `6px ridge ${e.target.value}`;
  });

  document.body.appendChild(stickyCont);

  let minimize = stickyCont.querySelector(".minimize");
  let remove = stickyCont.querySelector(".remove");
  noteActions(minimize, remove, stickyCont);

 // Handle mouse down and touch start for drag-and-drop functionality
stickyCont.onmousedown = function(event) {
  dragAndDrop(stickyCont, event);  // Handle drag for desktop
};

// Handle touch start event for drag-and-drop functionality on mobile
stickyCont.ontouchstart = function(event) {
  dragAndDrop(stickyCont, event);  // Handle drag for mobile
},{ passive: false };

// Prevent the default drag behavior (e.g., text selection, image dragging)
stickyCont.ondragstart = function() {
  return false;  // Disable default drag behavior
};
}







