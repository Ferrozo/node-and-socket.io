const sockect = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");
const roomDiv = document.getElementById("room-name");
const usernameDiv = document.getElementById("username"); 

roomDiv.innerHTML = `Room: <strong>${room}</strong>`;
usernameDiv.innerHTML = `Hello: ${username}`;


sockect.emit("selected_room", {
    room,
    username,
},(messages) =>{

    messages.forEach(message=> {
        createMessage(message);

    })
});

document.getElementById("message_input").addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        const message = e.target.value;
        const data = {
            room,
            username,
            message
        }

        sockect.emit("message", data );
        e.target.value = "";
    }
})

document.getElementById("logout-btn").addEventListener("click", (e)=>{
    window.location.href ="index.html";
})

sockect.on("message", data=>{
    createMessage(data);
});

function createMessage(data){
    const messageContainer = document.getElementById("messages");
    messageContainer.innerHTML += `
        <div class="new-message">
            <label class="form-label">
                <strong>${data.username}</strong> <span> ${data.text}  - ${dayjs(data.createdAt).format("DD/MM HH:MM")}</span>
            </label>
        </div>
    `;
}