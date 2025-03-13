const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'timetable_management'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const classroomRoutes = require('./routes/classrooms');
const timeslotRoutes = require('./routes/timeslots');
const timetableRoutes = require('./routes/timetable');

app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/classrooms', classroomRoutes);
app.use('/timeslots', timeslotRoutes);
app.use('/timetable', timetableRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});