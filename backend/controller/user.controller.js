 const userModel = require('../model/user.model')
 const User = userModel.User

 const demo = async(req,resp)=>{
    
    resp.send({message:"hello ji"})

 }
 const register = async(req,resp)=>{
 
     const {name,email,password} = req.body;

     try {
        const existingUser = await User.findOne({ email: email });
    
        if (existingUser) {
          resp.status(400).json({ message: "User already exists" });
        } else {
          const user = new User({
            name: name,
            email: email,
            password: password,
          });
    
          await user.save();
    
          console.log('>>>>>>>>>>> Register successful');
          resp.status(201).json({ message: 'Registration successful' });
        }
      } catch (error) {
        console.error('>>>>>>>>>>> Error in saving data to db', error);
        resp.status(500).json({ error: 'Internal Server Error' });
      }
    };

 const login= async(req,resp)=>{
     const{email,password} = req.body;

     try {
        const user = await User.findOne({ email: email });

        if(user){
            if(password === user.password){
                resp.send({
                  message:"user found",
                  user:user
            })
            }
            else{
                resp.send({message:"user didn't found"})
            }
        }

     } catch (error) {

        console.log('>>>>>>>>>>>error in finding',err )
        resp.status(401).send({message:"internal server error"})
        
     }

 }   

 module.exports = {demo,register,login}