//add the postgresdependancy
const { Pool } = require('pg');

//connect to the db
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'StMohCOMP3005A4',
  password: 'user',
  port: 5432, 
});

//function to get all students
const getAllStudents = async () => {
    try {
        //query the database with a Select * statement
        const result = await pool.query('SELECT * FROM Students');
        //print out the response
        console.log(result.rows);
    } catch (err) {
        console.error('Error executing AllStudents', err.stack);
    }
};

const addStudent = async (first_name, last_name, email, enrollment_date) => {
    try {
        //add the student with the columns in the table in the insert statement
        const queryText = 'INSERT INTO Students(f_name, l_name, gmail, enrollment_date) VALUES($1, $2, $3, $4)';
        //pass the parameters into the query and log the success
        await pool.query(queryText, [first_name, last_name, email, enrollment_date]);
        console.log('Student added');
    } catch (err) {
        console.error('Error executing add', err.stack);
    }
};

const updateStudentEmail = async (student_id, new_email) => {

    try {
        //create an update query in the students table where gmail is reset to the passed in value
        const queryText = 'UPDATE Students SET gmail = $2 WHERE student_id = $1';
        await pool.query(queryText, [student_id, new_email]);
        console.log('Student email update');
    } catch (err) {
        console.error('Error executing query', err.stack);
    }
};

const deleteStudent = async (student_id) => {
    try {
        //delete th students in a delete statement where the parameter is the passed in id
        const queryText = 'DELETE FROM Students WHERE student_id = $1';
        await pool.query(queryText, [student_id]);
        console.log('Student deleted');
    } catch (err) {
        console.error('Error executing delete', err.stack);
    }
};

// Example usage
const run = async () => {
    await getAllStudents();
    await addStudent('St', 'Moh', 'BigMoh5@gmail.com', '2021-09-06');
    await updateStudentEmail(3, 'BiggerMoh@gmail.com');
    await deleteStudent(2);

    // Close the pool after all operations are done
    pool.end();
};

run();