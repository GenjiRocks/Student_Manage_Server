const db = require('../db')

//add student with marks
exports.addStudent = async (req, res) => {
    const {name,marks} = req.body // marks is array of { "subject_name": "Math", "mark": 85 }
    console.log(req.body);
    
    try{

     const [studentResult] = await db.query('INSERT INTO students (name) VALUES (?)', [name])
    const studentId = studentResult.insertId
    console.log(studentId);
    


    for(let i=0; i<marks.length; i++){
        const {subject_name, mark} = marks[i]
        
        await db.query('INSERT INTO marks (student_id,subject_name,mark) VALUES (?,?,?)',[studentId, subject_name, mark])

    }

  
    res.status(200).send({message: 'Student added successfully'})

    }catch(err){
        res.status(500).send({error: err.message})
    }
    
}

/* {
  "name": "Alice",
  "marks": [
    { "subject_name": "Math", "mark": 85 },
    { "subject_name": "Science", "mark": 90 }
  ]
}
 */


// get all students with total marks, average marks and grades
exports.getAllStudents = async (req, res) => {
    try{
        const [students] = await db.query(`
            SELECT
            s.id,
            s.name,
            SUM(m.mark) AS total_marks,
            AVG(m.mark) AS average_marks,
            CASE
                WHEN AVG(m.mark) >= 90 THEN 'A'
                WHEN AVG(m.mark) >= 80 THEN 'B'
                WHEN AVG(m.mark) >= 70 THEN 'C'
                WHEN AVG(m.mark) >= 60 THEN 'D'
                ELSE 'F'
                END AS grade
                FROM
                students s
                LEFT JOIN marks m ON s.id = m.student_id
                GROUP BY s.id;
            `)

    res.status(200).send(students)

    }catch(err){
        res.status(500).send({error: err.message})
    }
}


//get student by id
exports.getStudentById = async (req, res) => {
    const {id} = req.params
    try{
        const [student] = await db.query(`
            SELECT
            s.id,
            s.name,
            m.subject_name,
            m.mark
            FROM
            students s
            LEFT JOIN
            marks m ON s.id = m.student_id
            WHERE s.id = ?            
            `,[id])
        res.status(200).send(student)
    }catch(err){
        res.status(500).send({error: err.message})
    }
}

//delete a student
exports.deleteStudent = async (req, res) => {
    const {id} = req.params
    try{
        await db.query('DELETE FROM students WHERE id = ?', [id])
        res.status(200).send({message: 'Student deleted successfully'})
    }catch(err){
        res.status(500).send({error: err.message})
    }
}


//update a student
exports.updateStudent = async (req, res) => {
    const {student_id, marks} = req.body
    try{
        for(let i=0; i<marks.length; i++){
            const {subject_name, mark} = marks[i]
            await db.query('INSERT INTO marks (student_id,subject_name,mark) VALUES (?,?,?)',[student_id, subject_name, mark])
        }
        res.status(200).send({message: 'Student updated successfully'})
       
            
    }
    catch(err){
        res.status(500).send({error: err.message})
    

    }

}