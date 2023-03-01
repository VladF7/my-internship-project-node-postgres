const jwt = require('jsonwebtoken')

const generateAccessToken = (email) => {
    const payload = {
        email,
    }
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '24h'})
}

module.exports = {
    async login(req,res){
        try {
            const {email,password} = req.body
            const validEmail = email === process.env.ADMIN_EMAIL
            if(!validEmail){
                return res.status(400).json({message: {email:'Введен не верный email'}})
            }
            const validPassword = password === process.env.ADMIN_PASSWORD
            if(!validPassword){
                return res.status(400).json({message: {password:'Введен не верный пароль'}})
            }
            const token = generateAccessToken(email)
            return res.json({token, user: email})    
        } catch (error) {
            console.log(error);
        }
    },
   async auth (req,res){
    try {
        const {email} = req.user
        const token = generateAccessToken(email)
        return res.json({token, user: email})    
    } catch (error) {
        console.log(error);
    }
   }
}