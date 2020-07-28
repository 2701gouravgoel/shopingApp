import express from 'express';
import User from '../models/usermodels';
import { getToken } from '../utils';

const router =express.Router();


router.post('/signin', async(req,res)=>{
    const signinUser =await User.findOne({
        email:req.body.email,
        password:req.body.password
    })

    console.log("request for "+req.body.email+req.body.password);

    if(signinUser){
        res.send({
            _id: signinUser.id,
            name:signinUser.name,
            email:signinUser.email,
            isAdim: signinUser.isAdim,
            token: getToken(signinUser)
        })
        console.log("hurray")
    }else{
        res.status(401).send({msg: "Invalid email or password"});
    }
})
router.post('/register', async(req,res)=>{
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password,
    });

    const newUser = await user.save();

    if(newUser){
        res.send({
            _id: newUser.id,
            name:newUser.name,
            email:newUser.email,
            isAdim: newUser.isAdim,
            token: getToken(newUser)
        })
        console.log("hurray")
    }else{
        res.status(401).send({msg: "Invalid User Data"});
    }
})

router.get("/createadmin", async (req,res)=>{
    try{
        const user = new User({
            name: "Gourav",
            email:"2701gouravgoel@gmail.com",
            password:'12345',
            isAdim:true
        });
    
        const newUser = await user.save();
        res.send(user);
    }catch(error){
        res.send({msg: error.message});
    }
})

export default router;