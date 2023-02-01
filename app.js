const express = require(`express`);
const app = express();

const cors = require(`cors`);
const path = require('path');
const http = require(`http`);
const{Server} = require(`socket.io`);
const chatRoutes = require(`./routes/chat`);

app.options(`*`,cors());
app.use(cors())



app.set(`view engine`, `ejs`);
app.set(`views`, `views`);

app.use(express.static(`public`));

app.use(chatRoutes);


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: `http://localhost:3000`,
        methods: [`GET`, `POST`]
    }
});

io.on(`connection`, (socket) => {
    console.log(`User is connected`);
    

    socket.on(`disconnect`, () => {
        console.log(`User is disconnected`)
    })

})

server.listen(3000);
