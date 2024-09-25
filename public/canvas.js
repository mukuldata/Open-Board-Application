//  ******************* FOR UNDERSTANDING  ***********
// // API (Static task)

// let tool=canvas.getContext("2d");

// tool.strokeStyle="blue";       //change colors
// tool.lineWidth="8";            //change thickness
// // Making a new path
// tool.beginPath();             //new graphic(path)  (line)
// tool.moveTo(0,0);           //start point     moveTo(x-axis in px ,y-axis in px)
// tool.lineTo(100,100);         //end point
// // The above path is made we need to add the color:
// tool.stroke();                //fill color (fill space)

// //Making more path in same path:
// tool.lineTo(250,0);
// tool.stroke();

// // Making a new path again:
// tool.beginPath();
// tool.moveTo(90,10);
// tool.lineTo(200,200);
// tool.stroke();

//  ********************END***************

// path of graphics -->> mouselistner
// mousedown -> start new path 
// mousemove -> path fill(graphics)

let canvas=document.querySelector("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let pencilColor=document.querySelectorAll(".pencil-color");
let pencilWidthElem=document.querySelector(".pencil-width");
let eraserWidthElem=document.querySelector(".eraser-width");

let penColor="red";
let eraserColor="white";
let penWidth=pencilWidthElem.value;
let eraserWidth=eraserWidthElem.value;

let redo=document.querySelector(".redo");
let undo=document.querySelector(".undo");

//Undo and Redo operations:
let undoRedoTracker=[];     //Data
let track=0; //Represent which action to perform from  tracker array
//While mouseup

//First:
let tool=canvas.getContext("2d");
tool.strokeStyle=penColor;       
tool.lineWidth=penWidth;

let mouseDown=false;



// Function to get the coordinates from either mouse or touch event
function getCoordinates(e) {

    if (e.touches && e.touches.length > 0) {
        return {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    } else {
        return {
            x: e.clientX,
            y: e.clientY
        };
    }
}

// Mouse down event for desktop
canvas.addEventListener("mousedown", (e) => {
    mouseDown = true;
    let coords = getCoordinates(e);

    let data = {
        x: coords.x,
        y: coords.y
    };
    socket.emit("startPath", data);
});

// Touch start event for mobile
canvas.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
    e.preventDefault(); // Prevent scrolling when touching the canvas
    mouseDown = true;

    let coords = getCoordinates(e);

    let data = {
        x: coords.x,
        y: coords.y
    };
    socket.emit("startPath", data);
}
});

function getCoordinates(e) {
    if (e.touches && e.touches.length > 0) {
        return {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    } else {
        return {
            x: e.clientX,
            y: e.clientY
        };
    }
}



canvas.addEventListener("mousemove", (e) => {
    handleDraw(e);
});

canvas.addEventListener("touchmove", (e) => {
    if (e.touches.length === 1) {
        e.preventDefault(); // Prevent scrolling while drawing
        handleDraw(e);  // Custom function to handle the drawing logic
    }
});


function handleDraw(e) {
    console.log("canvas mouseDown or touchMove");
    if (mouseDown) {
        let coords = getCoordinates(e);

        let data = {
            x: coords.x,
            y: coords.y,
            color: eraserFlag ? eraserColor : penColor,
            width: eraserFlag ? eraserWidth : penWidth
        };

        socket.emit("drawStroke", data);
    }
}

// Mouse up event for desktop
canvas.addEventListener("mouseup", (e) => {
    mouseDown = false;
    handlePathEnd();
});

// Touch end event for mobile
canvas.addEventListener("touchend", (e) => {
    if (e.touches.length === 1) {
        e.preventDefault(); // Prevent default touch behavior (like scrolling)
        mouseDown = false;
        handlePathEnd();
    }
  
});

// Shared function to handle the end of a path (for both mouse and touch)
function handlePathEnd() {
    // Undo and redo functionality:
    let url = canvas.toDataURL();  // Get the current state of the canvas as a data URL
    undoRedoTracker.push(url);     // Push the current state onto the undo/redo stack
    track = undoRedoTracker.length - 1;  // Update the current track position
}


function startPath(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x,strokeObj.y);
}

function drawStroke(strokeObj){
    tool.lineWidth=strokeObj.width;
    tool.strokeStyle=strokeObj.color;
    tool.lineTo(strokeObj.x,strokeObj.y);
    tool.stroke()
}


//Pencil color change:
pencilColor.forEach((colorElem)=>{

    colorElem.addEventListener("click",(e)=>{
        let color=colorElem.classList[0];
        penColor=color;
        tool.strokeStyle=penColor;
    })
})

//Pencil width change:

pencilWidthElem.addEventListener("change",(e)=>{
    let pencilWidth=pencilWidthElem.value;
    penWidth=pencilWidth;
    tool.lineWidth=penWidth;
})

//Eraser width change:
eraserWidthElem.addEventListener("change",(e)=>{
    let eraserWidth=eraserWidthElem.value;
    tool.lineWidth=eraserWidth;
})

// Eraser is clicked again the it will revert back 
// to original penColor and penWidth;
eraserTool.addEventListener("click",(e)=>{
    if(eraserFlag){
    tool.strokeStyle=eraserColor;
    }
    else{
        tool.lineWidth=penWidth;
        tool.strokeStyle=penColor;
    }
})


//Download the image:
//Create an anchor tag  -->putting url in tag  -->
// -->downloading the image

let download = document.querySelector(".download");

download.addEventListener("click",(e)=>{
    // function in canvas to make url of canvas data:
    let url=canvas.toDataURL();

    let a=document.createElement("a");
    a.href=url;
    a.download="board.jpg";
    a.click();
})


//Undo and redo functionality:

undo.addEventListener("click",(e)=>{
    if(track>0) track--;
    // Sending data to server:
    let data={
        trackValue:track,
        undoRedoTracker
    }
    socket.emit("undoRedo",data);

})


redo.addEventListener("click",(e)=>{
        if(track<undoRedoTracker.length-1) track++;
        let data={
            trackValue:track,
            undoRedoTracker
        }
        socket.emit("undoRedo",data);
})

function undoRedoCanvas(trackObj){
    track=trackObj.trackValue;
    undoRedoTracker=trackObj.undoRedoTracker;

    let url=undoRedoTracker[track];
    let img=new Image();
    img.src=url;
    img.onload=(e)=>{
        tool.drawImage(img,0,0,canvas.width,canvas.height);
    }
}

//Data that is transfered from server to me is:
// startPath
socket.on("startPath",(data)=>{
    //data-->data from server
    startPath(data);
})

// drawStroke
socket.on("drawStroke",(data)=>{
    //data-->data from server
    drawStroke(data);
})

// undoRedo:
socket.on("undoRedo",(data)=>{
    //data-->data from server
    undoRedoCanvas(data);
})



