
let username =  document.getElementById(`name`);
let chatRoom = document.getElementById(`chatRoom`);

const images = document.querySelectorAll(`.images`)
let input = document.getElementById(`img-input`);




images.forEach((image) => { 
image.addEventListener(`click`, function () {
   let isActive = this.classList.toggle(`clicked`);
   let imageUrl = image.src.split(`/`)[3];
   input.value = imageUrl;
   if(!isActive) {
      input.value = ``
   }
   for (const sibiling of this.parentNode.children) {
      if(sibiling !==this) {
         sibiling.classList.remove(`clicked`)
      }
   }
});
})



document.getElementById(`btn`).addEventListener(`click`, async  () => {
  

if(username.value!== "" && chatRoom.value!=="") {
 localStorage.setItem(`username`, username.value);
 localStorage.setItem(`chatRoom`, chatRoom.value);
 localStorage.setItem(`image`,input.value )


};


});

