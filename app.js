//   ******************* Theory *********
// Realtime Application 
// Socket.IO is a library that enables real-time, bidirectional and 
// event-based communication between the browser and the server. 
//Using Socket.io ---> Javascript Library

//Nodemon -->if app crashes due to some error it will rectify
//           it and restart
// Steps:
// 1. npm init ---->        in terminal
// 2. npm install express    --> Install express
// 3. npm install socket.io   --> Install socket.io

// It will install all required dependencies and it can be 
// visible in package.json

//Background:
// 4. Run server ---> node app.js   --->nodemon app.js--> 
//    npm start(changed in package.json)  **
// 5.Server Listen
// 6 Connect frontend (using socket cdn)
//   whose response we get in backend
// 7 open application using url in html file


//*******************END*********************

//  Code:
//To access express and socket.io
const express=require("express");
const socket=require("socket.io");  //will return a function

//will return a function by which application is initialized 
// and become server ready;
const app=express();

//To make server ready to listen:
let port=process.env.PORT || 5000;      //deployment number or giving port number
let server=app.listen(port,()=>{
    console.log("Listening to port "+port);
})

//As index.html is in public folder --> to access that :
app.use(express.static("public"));

//To check connection is established bw server and app;
let io=socket(server);

//like addeventlistner in javascript
io.on("connection",(socket)=>{
    console.log("Socket Connection Established");
     //Recieved data in server:
    //Trigger this callback function when startPath is called;
    //startPath:
    socket.on("startPath",(data)=>{
        //data-->data from front end
    //Transfer data to all connected computers including my computer
        io.sockets.emit("startPath",data);
    })

    // drawStroke:
    socket.on("drawStroke",(data)=>{
        io.sockets.emit("drawStroke",data);
    })

    // undoRedo:

    socket.on("undoRedo",(data)=>{
        io.sockets.emit("undoRedo",data);
    })

})






