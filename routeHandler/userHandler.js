const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {connection, SQL_QUERIES } = require('../sqlQueries');
const checkLogin = require("../middlewares/checkLogin");

// router.get("/hello", checkLogin, (req, res)=>{
//     res.status(200).json({phone: req.phone, userId: req.userId});
// })

// SIGNUP
router.post("/register", async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const roleId = 2; // user role id
        const newUser = {
            name: req.body.name,
            phone: req.body.phone,
            role_id: roleId,
            password: hashedPassword,
        };
        connection.query(SQL_QUERIES.registerQuery(newUser), (err, _ , fields)=>{
            console.log(err)
            if(!!err){
                res.status(500).json({
                    message: "Signup failed!",
                });
            }
            else{
                res.status(200).json({
                    message: "Signup was successful!",
                });
            }
        })   
        
    } catch {
        res.status(500).json({
            error: "Signup failed!",
        });
    }
});

// LOGIN
router.post("/login", async(req, res) => {
    try {
        const phoneNumber = req.body.phone;
        if(!!phoneNumber) {
            connection.query(SQL_QUERIES.isExistingUserQuery(phoneNumber), async (err, row, fields)=>{
                console.log(row[0].name)
                let user = row[0];
                if(!!err)res.status(400).json({error: err});
                if(!!user){
                    const isValidPassword = await bcrypt.compare(req.body.password, user.password);

                    if(isValidPassword) {
                        const token = jwt.sign({
                            phone: user.phone,
                            userId: user.id,
                        }, process.env.JWT_SECRET, {
                            expiresIn: '1h'
                        });
    
                        res.status(200).json({
                            "token": token,
                            "message": "Login successful!"
                        });
                    } else {
                        res.status(401).json({
                            "error": "Authetication failed!"
                        });
                    }
                }
                else{
                    res.status(401).json({
                        "error": "Authetication failed!"
                    });
                }
                
            })
        } else {
            res.status(401).json({
                "error": "Authetication failed!"
            });
        }
    } catch {
        res.status(401).json({
            "error": "Authetication failed!"
        });
    }
});

module.exports = router;
