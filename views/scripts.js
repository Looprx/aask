document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Logged in') {
            document.getElementById('auth').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            loadTimetable();
        } else {
            alert(data);
        }
    });
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, fullName, email, role })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    });
});

function loadTimetable() {
    fetch('/timetable')
    .then(response => response.json())
    .then(data => {
        const timetable = document.getElementById('timetable');
        timetable.innerHTML = '<h3>Your Timetable</h3>';
        data.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p>Course: ${item.CourseName}</p>
                <p>Classroom: ${item.RoomNumber}</p>
                <p>Day: ${item.Day}</p>
                <p>Time: ${item.StartTime} - ${item.EndTime}</p>
            `;
            timetable.appendChild(div);
        });
    });
}