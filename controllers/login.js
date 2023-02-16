const fs = require(`fs`);

exports.getLogin = (req,res,next) => {
    images =new Array(8);
    for (let i = 0; i < images.length; i++) {
    images[i] = `${i +1}.png`
  };
    res.render(`login`, {
        images:images,
        title:`Login`
       
    })

}

exports.postLogin = (req,res,next) => {
    const name = req.body.name;
    const chatRoom = req.body.chatRoom;
    const image = req.body.image
    if(name && chatRoom && image) {
        res.redirect(`/chat`)

    }};

    

  

  
