//   ******************* Theory *********
// Realtime Application 
// Socket.IO is a library that enables real-time, bidirectional and 
// event-based communication between the browser and the server. 
//Using Socket.io ---> Javascript Library

//*******************END*********************

//  Code:
//To access express and socket.io
const express=require("express");
const socket=require("socket.io"); 
const cors = require('cors'); 
require('dotenv').config();
const app=express();


app.use(cors({
    origin: ["localhost:3000",process.env.FRONTEND_URL],// Your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
}));



//To make server ready to listen:
let port=process.env.PORT || 5000;      //deployment number or giving port number
let server=app.listen(port,()=>{
    console.log("Listening to port "+port);
})

//As index.html is in public folder --> to access that :
app.use(express.static("public"));

//To check connection is established bw server and app;
let io=socket(server,{
    cors: {
        origin: ['localhost:3000',process.env.FRONTEND_URL], // Frontend URL
        methods: ['GET', 'POST'],
        credentials: true,
    }});

//like addeventlistner in javascript
io.on("connection",(socket)=>{
    console.log("Socket Connection Established",socket.id);
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






