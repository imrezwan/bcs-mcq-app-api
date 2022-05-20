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

// SINGLE EXAM INFO 
router.get("/examinfo/:exam_id", checkLogin, async(req, res) => {
    try {
        connection.query(SQL_QUERIES.getSingleExamInfo(req.params.exam_id), async (err, exams, fields)=>{
            if(!!err){
                res.status(500).json({
                    error: "Something is wrong !",
                });
            }
            res.status(200).json(exams[0]);
        });
        
    } catch {
        res.status(500).json({
            error: "Something is wrong !",
        });
    }
});

// ATTEND EXAM
router.get("/attendexam/:exam_id", checkLogin, async(req, res) => {
    try {
        connection.query(SQL_QUERIES.getExamQuestions(req.params.exam_id), async (err, questions, fields)=>{
            console.log(err);
            if(!!err){
                res.status(500).json({
                    error: "Something is wrong !",
                });
            }
            res.status(200).json(questions);
        });
        
    } catch {
        res.status(500).json({
            error: "Something is wrong !",
        });
    }
});

router.post("/attendexam/:exam_id", checkLogin, async(req, res) => {
    try {
        let userAnswers = req.body.user_answers;
        let time_taken = req.body.time_taken;
        let examId = req.params.exam_id;

        //res.status(200).json({userAnswers,timeTaken})

        connection.query(SQL_QUERIES.getExamQuestions(examId), (err, questions, fields)=>{
            console.log(err)
            if(!!err){
                res.status(500).json({
                    error: "Something is wrong !",
                });
            }
            // exam info 
            connection.query(SQL_QUERIES.getSingleExamInfo(examId), async (err, exams, fields)=>{
                if(!!err){
                    res.status(500).json({
                        error: "Something is wrong !",
                    });
                }
                let singleExam = exams[0];
                let attempt_questions = userAnswers.length;
                //res.status(200).json({attempt_questions})
                // calculate currect answer
                let correct_ans = 0;
                userAnswers.forEach(userAns => {
                    if(!!questions.find(question=> question.id === userAns.question_id && question.answer === userAns.answer)){
                        correct_ans++;
                    }
                });
                let wrong_ans = attempt_questions - correct_ans;
                let minus_marks = wrong_ans * singleExam.negetive_mark_per_question;
                let total_marks = correct_ans - minus_marks;

                let result = {
                    name: singleExam.name,
                    topics: singleExam.topics,
                    full_marks: singleExam.full_marks,
                    duration: singleExam.duration,
                    correct_ans,
                    wrong_ans,
                    total_marks,
                    minus_marks,
                    attempt_questions,
                    time_taken,
                    user_id: req.userId,
                    exam_id: examId,
                }
                ///
                //console.log(result)

                connection.query(SQL_QUERIES.saveResult(result), (err, insertInfo , fields)=>{
                    //console.log(SQL_QUERIES.saveResult(result))
                    if(!!err){
                        res.status(500).json({
                            error: "Something is wrong !",
                        });
                    }
                    let attendSheet = {
                        result_id: insertInfo.insertId,
                        sheet: userAnswers,
                    }
                    console.log(attendSheet)
                    // res.status(200).json(attendSheet);
                    connection.query(SQL_QUERIES.saveAnswerSheet(attendSheet), (err, sheetInsertInfo, fields)=>{
                        //console.log(err)
                        if(!!err){
                            res.status(500).json({
                                error: "Something is wrong !",
                            });
                        }
                        res.status(200).json(result);
                    })
                });

            });
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something is wrong !",
        });
    }
});

module.exports = router;
