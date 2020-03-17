const express=require('express')
const router=express.Router()

const data=[
    { id:1, name:'abhishek'},
    { id:2, name:'neha'},
    { id:3, name:'nitin'}
]

//..................................................

router.get('/api/delete/data',(req,res,next)=>{
    res.send('hey this is api data '+JSON.stringify(data))
})


//..................................................
router.delete('/api/delete/data/:id',(req,res)=>{
    
    const testData=data.find(d=>d.id===parseInt(req.params.id))
    if(!testData) res.status(404).send('the data with given id not found')

    const index=data.indexOf(testData)
    data.splice(index,1)

    res.send(data)
})
module.exports=router