exports.getChat = (req,res, next) => {
    res.render(`chat`, {
        title: `Chat`,
    });
};
