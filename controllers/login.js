const Joi = require("joi");

let images;

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
    const usernname = Joi.string().min(1).max(9).required()
    let username_err =  "Username must be between 1-9 characters!";
    const {error} = usernname.validate(req.body.name);
    if(error) return res.status(400).render('login', {
        images:images,
        title:"Login",
        error:username_err
           
    })
    
    const name = req.body.name;
    const chatRoom = req.body.chatRoom;
    const image = req.body.image
    
    if(name && chatRoom && image) {
        res.redirect(`/chat`) 
    }

    else {
        let err_msg = "You did not choose username, chatroom or avatar. Please try again!"
        res.status(400).render('login', {
            images:images,
            title:`Login`,
            err_msg:err_msg})
    }

};

    

  

  

  

  
