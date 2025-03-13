CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    FullName VARCHAR(100),
    Email VARCHAR(100),
    Role ENUM('student', 'teacher', 'admin') NOT NULL
);

CREATE TABLE Courses (
    CourseID INT AUTO_INCREMENT PRIMARY KEY,
    CourseName VARCHAR(100) NOT NULL,
    CourseCode VARCHAR(10) NOT NULL,
    Credits INT NOT NULL
);

CREATE TABLE Classrooms (
    ClassroomID INT AUTO_INCREMENT PRIMARY KEY,
    RoomNumber VARCHAR(10) NOT NULL,
    Capacity INT NOT NULL
);

CREATE TABLE TimeSlots (
    TimeSlotID INT AUTO_INCREMENT PRIMARY KEY,
    Day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL
);

CREATE TABLE Timetable (
    TimetableID INT AUTO_INCREMENT PRIMARY KEY,
    CourseID INT NOT NULL,
    ClassroomID INT NOT NULL,
    TimeSlotID INT NOT NULL,
    UserID INT NOT NULL,
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID),
    FOREIGN KEY (ClassroomID) REFERENCES Classrooms(ClassroomID),
    FOREIGN KEY (TimeSlotID) REFERENCES TimeSlots(TimeSlotID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);