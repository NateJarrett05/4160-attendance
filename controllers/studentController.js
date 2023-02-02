const { result } = require('lodash');
const { db } = require('../models/blog');
const Blog = require('../models/blog');
const Student = require('../models/student');
const date = new Date();
let time = 0.0;

const student_index = (req, res) => {
    Student.find()
        .then((result) => {
            res.render('index', {students: result, title: "All Students"})
        })
        .catch(err => console.log(err))
}

const student_details = (req, res) => {
    const id = req.params.id;
    Student.findById(id)
        .then(result => {
            res.render("details", { student: result, title: "Blog Details"})
        })
        .catch((err) => {
            console.log(err)
            res.status(404).render('404', { title: '404' })
        })
}

const student_deleteStudent = (req, res) => {
    const id = req.params.id;

    Student.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: "/students" })
        })
        .catch((err) => {
            console.log(err)
            res.status(404).render('404', { title: '404' })
        })
}

const student_checkin = (req, res) => {
    const id = req.params.id;

    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();

    let fullDate =  day + "/" + month + "/" + year;

    hour = date.getHours();
    minute = date.getMinutes();

    let fullTime = hour + ":" + minute;

    Student.findByIdAndUpdate(id, {checkedIn: true})
        .catch((err) => {
            console.log(err);
        })

    Student.findByIdAndUpdate(id, {
        $push: {
            date: fullDate,
            checkIn: fullTime,
        }
    })
    .then(result => {
        res.json({ redirect: "/students" })
    })
    .catch((err) => {
        console.log(err)
        res.status(404).render('404', { title: '404' })
    })
}

const student_checkout = (req, res) => {
    const id = req.params.id;

    hour = date.getHours();
    minute = date.getMinutes();

    let fullTime = hour + ":" + minute 

    Student.findByIdAndUpdate(id, {checkedIn: false})
    .catch((err) => {
        console.log(err)
    })
    //translate time to decimal then subtract to get hours
    Student.findByIdAndUpdate(id, {
        $push: {
            checkOut: fullTime,
            hours: "hewwo"
        }
    })
    .then(result => {
        res.json({ redirect: "/students" })
    })
    .catch((err) => {
        console.log(err)
        res.status(404).render('404', { title: '404' })
    })
}

const student_create_post = (req, res) => {
    const student = new Student(req.body);

    student.save()
        .then(() => {
            res.redirect("/students")
        })
        .catch(err => console.log(err))
}

const student_create_get = (req, res) => {
    res.render('signUp', { title: 'Sign Up' });
}

module.exports = {
    student_index,
    student_details,
    student_deleteStudent,
    student_create_post,
    student_create_get,
    student_checkout,
    student_checkin
}