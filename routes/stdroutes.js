const express = require('express');
const { addStudent, getAllStudents, updateStudent, deleteStudent, getStudentById } = require('../controller/studentController');

const router = express.Router();

router.post('/add', addStudent);

router.get('/get/:id',getStudentById)

router.get('/get',getAllStudents)

router.put('/update',updateStudent)

router.delete('/delete/:id',deleteStudent)



module.exports = router;