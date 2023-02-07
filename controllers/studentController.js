const { result } = require('lodash');
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

    checkIn(id, req, res, true);
}

const student_checkout = (req, res) => {
    const id = req.params.id;

    checkOut(id, req, res, true);
}

const student_create_post = (req, res) => {
    const student = new Student(req.body);

    student.save()
        .then(() => {
            res.redirect("/students");
        })
        .catch(err => console.log(err));
}

const student_RFID_login = (req, res) => {
    const checkedIn = req.params.checkedIn
    if(checkedIn){
        checkIn(id, req, res, false);
    }
    else{
        checkOut(id, req, res, false);
    }
}

const student_ID_login = (req, res) => {
    var user = Student.findById("63e1c46eaedd30b7a07854ee")
    console.log(user.name)
    if(user.checkedIn){
        checkIn(user.id, req, res, false)
    }
    else{
        checkOut(user.id, req, res, false)
    }
}

const student_create_get = (req, res) => {
    res.render('signUp', { title: 'Sign Up' });
}

function checkIn(id, req, res, needJson){
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let fullDate =  day + "/" + month + "/" + year;

    let hour = date.getHours();
    let minute = date.getMinutes();

    let checkIn = hour + ":" + minute;

    Student.findByIdAndUpdate(id, {checkedIn: true})
        .catch((err) => {
            console.log(err);
        })

    Student.findByIdAndUpdate(id, {
        $push: {
            date: fullDate,
            checkIn
        }
    })
    .then(result => {
        if(needJson){
            res.json({ redirect: "/students" })
        }
        else{
            res.redirect("/students")
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(404).render('404', { title: '404' })
    })
}

function checkOut(id, req, res, needJson){
    let hour2 = date.getHours();
    let minute2 = date.getMinutes();

    let checkOutTime = hour2 + ":" + minute2 

    Student.findByIdAndUpdate(id, {checkedIn: false})
    .catch((err) => {
        console.log(err)
    })
    //translate time to decimal then subtract to get hours
    Student.findByIdAndUpdate(id, {
        $push: {
            checkOut: checkOutTime,
            hours: "help!"
        }
    })
    .then(result => {
        if(needJson){
            res.json({ redirect: "/students" })
        }
        else{
            res.redirect("/students")
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(404).render('404', { title: '404' })
    });
}

module.exports = {
    student_index,
    student_details,
    student_deleteStudent,
    student_create_post,
    student_create_get,
    student_checkout,
    student_checkin,
    student_RFID_login,
    student_ID_login
}