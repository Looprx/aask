const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all courses
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Courses';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a new course
router.post('/', (req, res) => {
    const { courseName, courseCode, credits } = req.body;
    const sql = 'INSERT INTO Courses (CourseName, CourseCode, Credits) VALUES (?, ?, ?)';
    db.query(sql, [courseName, courseCode, credits], (err, result) => {
        if (err) throw err;
        res.send('Course created');
    });
});

// Update a course
router.put('/:id', (req, res) => {
    const { courseName, courseCode, credits } = req.body;
    const sql = 'UPDATE Courses SET CourseName = ?, CourseCode = ?, Credits = ? WHERE CourseID = ?';
    db.query(sql, [courseName, courseCode, credits, req.params.id], (err, result) => {
        if (err) throw err;
        res.send('Course updated');
    });
});

// Delete a course
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM Courses WHERE CourseID = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send('Course deleted');
    });
});

module.exports = router;