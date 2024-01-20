const express = require("express")
const cors = require("cors")
const http = require("http")
const {Server}=require("socket.io")

const app = express()

app.use(cors())
const server= http.createServer(app)


const io = new Server(server, {
    cors:{origin:"http://localhost:3000", methods:["GET", "POST"]}
})  //extensier le nouveau serveur
 
io.on("connection", (socket)=>{
    console.log(`User Connect With id:${socket.id}`);

    socket.on("join_room", (data)=>{
        console.log(`Demande a rejoindre le room ${data}`);
        socket.join(data)
    }) 
    socket.on("send message", (data)=>{
        console.log(data);
        socket.to(data.idRoom).emit("receive_message", data)
    })
    socket.on("disconnect", ()=>{
        console.log(`User connected With id:${socket.id} is disconnected`);
    })
})

server.listen(4000, ()=>{
    console.log("server running");
}) 