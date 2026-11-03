const express = require('express');
const app = express();
const PORT = 3000;

// Middleware: parses incoming JSON bodies into req.body
app.use(express.json());

// In-memory storage
const students = [];

app.post('/api/students', (req, res) => {
  const { id, name, email, course, age } = req.body;

  // Validate mandatory fields
  if (id === undefined || !name || !email || !course || age === undefined) {
    return res.status(400).json({
      message: 'id, name, email, course and age are all required'
    });
  }

  // Duplicate ID reject karo
  if (students.some((s) => s.id === id)) {
    return res.status(409).json({ message: 'Student with this id already exists' });
  }

  const student = { id, name, email, course, age };
  students.push(student);

  res.status(201).json({
    message: 'Student created successfully',
    student
  });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});