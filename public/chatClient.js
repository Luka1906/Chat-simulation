window.addEventListener(`load`, () => {
  let socket = io();

 const chat = document.getElementById(`chat`);
 const btn = document.getElementById(`chat-btn`);

const username = localStorage.getItem(`username`);
const chatRoom = localStorage.getItem(`chatRoom`);
const image = localStorage.getItem(`image`);


 const setUpProfilePic = (image) => {
  const profilePic = document.querySelector(`.profile-image`)
  profilePic.innerHTML =  `<img class="pic" src="${image}">`
 };

 setUpProfilePic(image);


 class Chat {
  constructor(author,chatRoom,message) {
    this.author = author;
    this.chatRoom = chatRoom;
    this.message = message;
  }
 };


 //  Join the same chatRoom

 btn.addEventListener(`click`,async (e) => {
   const messageData = new Chat(username,chatRoom,chat.value);
  if(chat.value !=="") {
    document.getElementById(`chat-btn`).style.display = `none`;
    await socket.emit(`send_message`, messageData);
  };
 
}); 

chat.addEventListener(`keypress`, async (e)=> {
const messageData = new Chat(username,chatRoom,chat.value);
if(e.key ===`Enter` && chat.value!=="") {
 document.getElementById(`chat-btn`).style.display = `none`;
 await socket.emit(`send_message`, messageData);

}
});

socket.on(`received_message`, (data) => {
  let dt = new Date();
  let hours = dt.getHours()
  let AmOrPm = hours >= 12 ? 'pm' : 'am';
  hours = (hours % 12) || 12;
  let minutes = dt.getMinutes();
  if(minutes < 10) {
    minutes = `0` + minutes;
  }
  let Time = hours + ":" + minutes + " " + AmOrPm; 
    const chatRoom = document.getElementById('chatroom');
    chatRoom.innerHTML+= (`<div id="message"><p class="time">${Time}</p>
     <span class="nickname">${data.author}</span>&nbsp<span>${data.message}</span></div>`);
  
     if (chatRoom) {
chatRoom.scrollTop = chatRoom.scrollHeight - chatRoom.clientHeight;
}
   
  document.getElementById("feedback").innerHTML = "";
   chat.value = "";
  

  });

  socket.emit("join_room", {
    chatRoom: chatRoom,
    username: username

  }
  
  );

 socket.on(`user-join`, async (user,room) => {

  document.getElementById(`status`).innerHTML = `<h2 class="user-name">${user}</h2> <p id="online">Online</p>`
  document.getElementById(`username`).innerHTML = `<h2 class="user-name">${user}</h2>`;
  let connecting_message = document.getElementById(`connecting_message`);

   connecting_message.innerHTML =`<p class="user-join">${user} just joined the room number ${room}!</p>`;
   removeFromScreen(connecting_message)
   document.getElementById(`disconnecting_message`).innerHTML ='';
   await socket.emit(`get-username`,username,chatRoom)
 });

 const removeFromScreen = (element) => {
  setTimeout(() => {
    element.style.display=`none`;
  }, 10000);
}

socket.emit(`get_imageData`, {
  chatRoom: chatRoom,
  username: username

 })
 
 socket.on(`image-upload`,async() => {
  socket.emit(`images`, image)
   })
 
 
  socket.on(`img`, (img)=> {
    const images =  document.querySelectorAll(`.image`);
    images.forEach(image=> {
    image.innerHTML =  `<img class="pic" src="${img}">`
  })
  
  })
   
  socket.on(`username`, (user) => {
    document.getElementById(`status`).innerHTML = `<h2 class="user-name">${user}</h2> <p id="online">Online</p>`
    document.getElementById(`username`).innerHTML = `<h2 class="user-name">${user}</h2>`;

   })


chat.addEventListener(`input`, async ()=> {
document.getElementById(`chat-btn`).style.display = `block`;
await socket.emit(`typing`, username,chatRoom );
});


socket.on(`typing`, (user) => {
 document.getElementById(`feedback`).innerHTML=`<p class="typing"><i> ${user} typing...</i></p>`;

 
} );

socket.on(`disconnect_response`, (user) => {
  document.getElementById(`online`).innerHTML =`<p id="ofline">Ofline</p>`;
  document.getElementById(`disconnecting_message`).innerHTML =`<p>${user} just left the chat!</p>`;
  // document.getElementById(`connecting_message`).innerHTML = ``;
  document.getElementById("feedback").innerHTML = "";


 })

})

 