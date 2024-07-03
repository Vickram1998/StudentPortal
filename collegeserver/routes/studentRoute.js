const express = require("express");
const Students = require('../modules/studentschema')

const router = express.Router();

router.get("/student",async(req,res)=>{
    try{
    const students = await Students.find();
    res.status(200).json(
      
        students
    )
    }catch(e){
         res.status(401).json({
                message:e.message
    })
}
})
router.post("/add",async(req,res)=>{
    try{
        const student = await Students.create(req.body);
        res.status(200).json({
            status:'sucess',
            student
        })
    }catch(e){
        res.status(401).json({
            message:e.message
        })
    }

})

module.exports = router