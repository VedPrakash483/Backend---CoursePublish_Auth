const { User } = require('../db')

async function usersMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    try{
        const user = await User.findOne({
                username: username,
                password: password
        })
        if(user){
            next();
        }
    }catch(error){
        console.error("Error checking credentials:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
    
}

module.exports = usersMiddleware;