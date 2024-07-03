const bodyParser = require("body-parser")
const express= require ("express")
const mongoose= require ("mongoose")
const student = require("./routes/studentRoute")
const professor = require("./routes/professorRoute")
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/collegeserver',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB is connected'))
.catch(err => console.log('Failed to connect to MongoDB:', err));


app.use(cors());
app.use(express.json())


app.use("/students",student)
app.use("/professor",professor)


app.listen(8080,()=>{
    console.log("server is running on port 8080")
})