const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    RFID: {
        type: Number,
        required: true
    },
    studentID: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    checkedIn: {
        type: Boolean,
        required: false
    },
    date : { type : Array , "default" : [] },
    checkIn : { type : Array , "default" : [] },
    checkOut : { type : Array , "default" : [] },
    hours : { type : Array , "default" : [] }

}, {timestamps: true});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;