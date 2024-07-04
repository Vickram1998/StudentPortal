const express = require("express");
const Professor = require('../modules/professorschema')

const router = express.Router();

router.get("/",async(req,res)=>{
    try{
    const students = await Professor.find();
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
        const professor = await Professor.create(req.body);
        res.status(200).json({
            status:'sucess',
            professor
        })
    }catch(e){
        res.status(401).json({
            message:e.message
        })
    }

})
router.delete("/delete/:empID",async(req,res)=>{
    let emp= req.query.params.empID
    try{
        const dbRes = await Students.deleteOne({empID:emp});
        res.status(200).json({
            status:'sucess',
            message:`Deleted ${emp}`
        })
    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }

})
module.exports = router