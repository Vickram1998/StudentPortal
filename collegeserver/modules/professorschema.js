const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  
    },
    email: {
        type: String,
        required: true ,
        unique:true
    },
    empID: {
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

const Professor = mongoose.model('Professor', professorSchema);

module.exports = Professor;
