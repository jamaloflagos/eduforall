-- 

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) CHECK (role IN ('student', 'tutor')) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    middlename VARCHAR(255) DEFAULT NULL,
    profile_picture_location TEXT DEFAULT NULL, 
    location VARCHAR(255) DEFAULT NULL,
    last_login TIMESTAMP,
    completed_lessons INTEGER[] DEFAULT '{}', -- Array to track completed lesson IDs
    assignment_submission_history JSONB -- JSONB for flexible storage of history
);

-- Lessons table
CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content_type VARCHAR(50),
    content_location TEXT NOT NULL, -- Store content directly or reference object storage
    js_location TEXT,
    css_location TEXT,
    week INTEGER DEFAULT nextval('lesson_week_incrementing_number_seq'),
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE SEQUENCE lesson_week_incrementing_number_seq;

CREATE TABLE objectives (
    id SERIAL PRIMARY KEY,
    lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
    description TEXT[] DEFAULT NULL
);

-- Quizzes table
CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY,
    lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
    questions JSONB NOT NULL
);

-- Assignments table
CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    due_date TIMESTAMP
);

-- Submissions table
CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    assignment_id INTEGER REFERENCES assignments(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,  -- Original file name
    file_type VARCHAR(50) NOT NULL,   -- MIME type (e.g., 'text/plain', 'application/zip')
    file_size INTEGER NOT NULL,      -- Size in bytes
    code_location TEXT NOT NULL,      -- URL or object ID in object storage
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Grades/Feedback table
CREATE TABLE grades_feedback (
    id SERIAL PRIMARY KEY,
    submission_id INTEGER REFERENCES submissions(id) ON DELETE CASCADE UNIQUE,
    tutor_id INTEGER REFERENCES users(id) ON DELETE SET NULL, 
    grade INTEGER,
    feedback TEXT
);
