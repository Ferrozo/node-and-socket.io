import {io} from "./http";

interface UserRoom {
    socket_id: string,
    room: string,
    username: string
}

interface Messages {
    room: string,
    text: string,
    createdAt: Date,
    username: string,
}

const users: UserRoom[] = [];
const messages: Messages[] = []


io.on("connection", (socket) => {

    socket.on("selected_room", (data, callback) =>{

        socket.join(data.room);

        const userAlreadyInRoom = users.find(user => user.username === data.username && user.room === data.room);

        if(userAlreadyInRoom){
            userAlreadyInRoom.socket_id = socket.id;
        }else{

            users.push({
                room: data.room,
                username: data.username,
                socket_id: socket.id,
            });
        }
        
        const messagesRoom = getMessagesRoom(data.room);
        callback(messagesRoom);
    });

    socket.on("message", data =>{
        const message: Messages = {
            room: data.room,
            username: data.username,
            text: data.message,
            createdAt: new Date,
        } 

        messages.push(message);

        io.to(data.room).emit("message", message);
    });

});

function getMessagesRoom(room:string){
    const messagesRoom = messages.filter(message=> message.room === room);
    return messagesRoom;
}