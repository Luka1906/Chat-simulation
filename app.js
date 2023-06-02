const express = require(`express`);
const app = express();
const bodyParser = require('body-parser')
const cors = require(`cors`);
const path = require('path');
const fs = require(`fs`)
const http = require(`http`);
const{Server} = require(`socket.io`);
const chatRoutes = require(`./routes/chat`);

app.options(`*`,cors());
app.use(cors())



app.set(`view engine`, `ejs`);
app.set(`views`, `views`);

app.use(express.static(`public`));
app.use(express.static(`images`))
app.use(bodyParser.urlencoded({extended:true}))

app.use(chatRoutes);


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: `http://localhost:3000`,
        methods: [`GET`, `POST`]
    }
});

io.on(`connection`,(socket) => {
    console.log(`User is connected`);
    const users = [];
    let room;

    socket.on("join_room",async (data)=> {
        users[socket.id] = data.username
        room = data.chatRoom;
        await socket.join(data.chatRoom); 
        console.log(`${data.username} joined room: ${data.chatRoom}`);
        socket.to(data.chatRoom).emit(`user-join`, data.username, data.chatRoom);
        
    });

    socket.on(`get_imageData`, (data)=> {
        io.to(data.chatRoom).emit(`image-upload`)
    })
     
    
    socket.on(`images`, (image) => {
     socket.broadcast.to(room).emit(`img`, image);
       
    });

    socket.on(`get-username`, (username,chatroom )=> {
        socket.broadcast.to(chatroom).emit(`username`,username);
    })

    socket.on(`send_message`, (data)=> {
        io.to(data.chatRoom).emit(`received_message`,data);
             
    });

    socket.on(`typing`, (user, chatRoom)=> {
        console.log(user)
        socket.broadcast.to(chatRoom).emit(`typing`, user )
    })


    socket.on(`disconnect`,() => {
        socket.broadcast.to(room).emit(`disconnect_response`, users[socket.id]);
        delete users[socket.id];
    })
});
server.listen(3000);


