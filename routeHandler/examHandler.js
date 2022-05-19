const express = require("express");
const router = express.Router();
const {connection, SQL_QUERIES } = require('../sqlQueries');
const checkLogin = require("../middlewares/checkLogin");

// EXAM LIST
router.get("/exams/daily", checkLogin, async(req, res) => {
    try {
        connection.query(SQL_QUERIES.getExamList(5), async (err, exams, fields)=>{
            if(!!err){
                res.status(500).json({
                    error: "Something is wrong !",
                });
            }
            res.status(200).json(exams);
        })
        
    } catch {
        res.status(500).json({
            error: "Something is wrong !",
        });
    }
});

router.get("/exams/bcs", checkLogin, async(req, res) => {
    try {
        connection.query(SQL_QUERIES.getExamList(2), async (err, exams, fields)=>{
            if(!!err){
                res.status(500).json({
                    error: "Something is wrong !",
                });
            }
            res.status(200).json(exams);
        })
        
    } catch {
        res.status(500).json({
            error: "Something is wrong !",
        });
    }
});

router.get("/exams/nibondhon", checkLogin, async(req, res) => {
    try {
        connection.query(SQL_QUERIES.getExamList(3), async (err, exams, fields)=>{
            if(!!err){
                res.status(500).json({
                    error: "Something is wrong !",
                });
            }
            res.status(200).json(exams);
        })
        
    } catch {
        res.status(500).json({
            error: "Something is wrong !",
        });
    }
});

router.get("/exams/model", checkLogin, async(req, res) => {
    try {
        connection.query(SQL_QUERIES.getExamList(4), async (err, exams, fields)=>{
            if(!!err){
                res.status(500).json({
                    error: "Something is wrong !",
                });
            }
            res.status(200).json(exams);
        })
        
    } catch {
        res.status(500).json({
            error: "Something is wrong !",
        });
    }
});

router.get("/exams/primary", checkLogin, async(req, res) => {
    try {
        connection.query(SQL_QUERIES.getExamList(1), async (err, exams, fields)=>{
            if(!!err){
                res.status(500).json({
                    error: "Something is wrong !",
                });
            }
            res.status(200).json(exams);
        })
        
    } catch {
        res.status(500).json({
            error: "Something is wrong !",
        });
    }
});

module.exports = router;
