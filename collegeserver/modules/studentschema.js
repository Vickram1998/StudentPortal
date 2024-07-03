const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  
    },
    email: {
        type: String,
        required: true ,
        unique:true
    },
    rollnumber: {
        type: String,
        required: true,  
        unique:true 
    },
    age: {
        type: Number,
        required: true  
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'non-binary', 'other'],
        required: true
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
