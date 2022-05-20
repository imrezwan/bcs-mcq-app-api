const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'bcs_target2',
})


const SQL_QUERIES = {
    isExistingUserQuery: (phone)=> "SELECT * FROM users WHERE phone=\'"+phone+"\'",
    registerQuery: (user) => "INSERT INTO users (name, phone, password, role_id) VALUES ( \'"+user.name+"\', \'"+user.phone+"\',\'"+user.password +"\', "+user.role_id+")",
    findRoleId: (role)=> "SELECT * FROM roles WHERE role_name = \'"+role+"\'",
    getExamList: (type_id)=> "SELECT id,name, topics,duration,full_marks,is_active,is_daily_exam,exam_date,question_year,exam_id,deactivate_time,negetive_mark_per_question FROM examinfo WHERE type_id = "+type_id,
    getSingleExamInfo: (exam_id)=> "SELECT id,name, topics,duration,full_marks,is_active,is_daily_exam,exam_date,question_year,exam_id,deactivate_time,negetive_mark_per_question FROM examinfo WHERE exam_id = "+exam_id+" limit 1",
    getExamQuestions: (exam_id)=> "SELECT questions.id,question,option1,option2,option3,option4,answer,sub_name,topic_name FROM questions inner join examquestions on questions.id=examquestions.question_id inner join subjects on subjects.id=subject_id inner join topics on topics.id=topic_id where exam_id = "+exam_id,
    attendExam: (exam_id)=> "SELECT questions.id,question,option1,option2,option3,option4,answer,sub_name,topic_name FROM questions inner join examquestions on questions.id=examquestions.question_id inner join subjects on subjects.id=subject_id inner join topics on topics.id=topic_id where exam_id = "+exam_id,
    saveResult: (result)=>{
        return "INSERT INTO results (user_id, exam_id, attempt_questions,"+
            "correct_ans, time_taken, total_marks, minus_marks) "+
            `VALUES ('${result.user_id}', '${result.exam_id}', '${result.attempt_questions}',`+
                `'${result.correct_ans}', '${result.time_taken}', '${result.total_marks}', '${result.minus_marks}')`

    },
    saveAnswerSheet: (answerSheet)=>{
        let sql =  "INSERT INTO answersheet (result_id, question_id, answer ) VALUES ";
        let answers = answerSheet.sheet;
        answers.forEach(item => {
            sql+= ` ('${answerSheet.result_id}', '${item.question_id}', '${item.answer}'),`
        });
        return sql.substring(0, sql.length-1);
    }
}

module.exports = {connection, SQL_QUERIES};