const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

// Register
router.post('/register', (req, res) => {
    const { username, password, fullName, email, role } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;
        const sql = 'INSERT INTO Users (Username, Password, FullName, Email, Role) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [username, hash, fullName, email, role], (err, result) => {
            if (err) throw err;
            res.send('User registered');
        });
    });
});

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM Users WHERE Username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            bcrypt.compare(password, results[0].Password, (err, match) => {
                if (err) throw err;
                if (match) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.send('Logged in');
                } else {
                    res.send('Incorrect password');
                }
            });
        } else {
            res.send('Username not found');
        }
    });
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logged out');
});

module.exports = router;