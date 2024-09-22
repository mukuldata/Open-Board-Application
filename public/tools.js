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

  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = 'absolute';
  element.style.zIndex = 1000;


  moveAt(event.pageX, event.pageY);

  // moves the element at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + 'px';
    element.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the element on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // drop the element, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    element.onmouseup = null;
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

  stickyCont.onmousedown = function (event) {
    dragAndDrop(stickyCont, event);
  };

  stickyCont.ondragstart = function () {
    return false;
  };
}







