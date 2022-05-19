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
}

module.exports = {connection, SQL_QUERIES};