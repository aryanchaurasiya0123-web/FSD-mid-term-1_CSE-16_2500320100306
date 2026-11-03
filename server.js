const express = require('express');

const app = express();

app.use(express.json());

let students = [];

// TASK 2: POST - Add Student
app.post('/api/students', (req, res) => {

    const { id, name, email, course, age } = req.body;

    if (id === undefined || id === null || !name || !email || !course || age === undefined || age === null) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (students.some(s => s.id === id)) {
        return res.status(409).json({
            message: "Student ID already exists"
        });
    }

    const student = { id, name, email, course, age };

    students.push(student);

    res.status(201).json({
        message: "Student added successfully",
        student: student
    });
});


// TASK 3: GET - All Students
app.get('/api/students', (req, res) => {

    res.status(200).json({
        message: "All students retrieved successfully",
        students: students
    });
});


// TASK 3: GET - Student By ID
app.get('/api/students/:id', (req, res) => {

    const studentId = Number(req.params.id);

    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json({
        message: "Student found successfully",
        student: student
    });
});


// TASK 4: PUT - Update Student
app.put('/api/students/:id', (req, res) => {

    const studentId = Number(req.params.id);

    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, email, course, age } = req.body;

    if (!name || !email || !course || age === undefined || age === null) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    student.name = name;
    student.email = email;
    student.course = course;
    student.age = age;

    res.status(200).json({
        message: "Student updated successfully",
        student: student
    });
});


// TASK 5: DELETE - Delete Student
app.delete('/api/students/:id', (req, res) => {

    const studentId = Number(req.params.id);

    const index = students.findIndex(s => s.id === studentId);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});


// START SERVER
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});