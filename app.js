const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');
const classroomRoutes = require('./routes/classroom');
const authRoutes = require('./routes/auth');

app.use(bodyParser.json()); 
//uses the body parser with the json method; able to parse json data from incoming requests. 
//good for application/json as is the official name we'll find in the header

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    //sets the Access-Control-Allow-Origin header to all the domains/urls that should be able to access our server
    //* allows access from any domain
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    //sets the Access-Control-Allow-Methods header which allows the above origins to use specific http methods
    //the second argument tells which methods are allowed
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //the first argument refers to the headers clients can set on their requests
    //the second argument specifies what headers are allowed
    next();
});

app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/classrooms', classroomRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
})

mongoose
    .connect(
        'mongodb+srv://NC-52:headache88@cluster0.tasp0.mongodb.net/school?retryWrites=true&w=majority'
    )
    .then(result => {
        app.listen(8000);
    })
    .catch(err => console.log(err));
;