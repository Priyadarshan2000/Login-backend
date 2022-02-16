const express = require('express');
const router = express.Router();

// mongo db
const User = require('./../models/User');

// password handel
const bcrypt = require('bcrypt');

router.post('/signup', (req, res) => {
 let{ name, email, password, dateOfBirth } = req.body;
    name=name.trim();
    email=email.trim();
    password=password.trim();
    dateOfBirth=dateOfBirth.trim();


    if (name==""|| email=="" || password=="" || dateOfBirth=="") {
        res.json({
            status:"Failed",
            message:"Please fill all the fields!"
        });
    }
    else if(!/^[a-zA-Z ]*$/.test(name)){
        res.json({
            status:"Failed",
            message:"Name should contain only alphabets!"
    })
} else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
    res.json({
        status:"Failed",
        message:"invalid email entered!"

    })
 }  else if(!new Date(dateOfBirth).getTime()){
    res.json({
        status:"Failed",
        message:"invalid Date of Brith entered!"

    })
} else if(password.length<8){
    res.json({
        status:"Failed",
        message:"password is too Short!"

    })
} else {
    User.find({email}).then(result => {
        if(result.length){
            res.json({
                status:"Failed",
                message:"User with the provided email already exists!"
            });

        } else {
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds).then(hashedPassword => {
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                dateOfBirth
            });
            newUser.save().then(result => {
                res.json({
                    status:"SUCCESS",
                    message:"Signup success",
                    data:result,

                })
            })
            .catch(err => {
                res.json({
                    status:"Failed",
                    message:"An error occured while Saving Account!"
                    
                })
            })

            }).catch(err => {
            res.json({
                status:"Failed",
                message:"An error occured while hashing password!"

            })
         
            })
        }
    
    }).catch(err => {
        console.log(err);
        res.json({
            status:"Failed",
            message:"An error occured while checking  for existing user!"
        })
    })
}

})

router.post('/signin', (req, res) => {

})

module.exports = router;