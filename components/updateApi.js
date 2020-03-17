const express=require('express')
const router=express.Router()
var bodyParser=require('body-parser')
const Joi=require('joi')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const data=[
    { id:1, name:'put1'},
    { id:2, name:'put2'},
    { id:3, name:'put3'}
]

//.....................................................

router.get('/api/put/data',(req,res,next)=>{
    res.send('hey this is api data '+data)
})

//.....................................................

router.put('/api/put/data/:id',(req,res)=>{
    const testData=data.find(d=>d.id===parseInt(req.params.id))
    if(!testData) res.status(404).send('the data with given id not found')

    const schema={                  
        name: Joi.string().min(3).required()
    }
    const result=Joi.validate(req.body,schema)
    if(result.error){
        res.status(400).send(result.error.details[0].message)     //same validation as in above post api but difference is JOI module is used for validation
    }

    data.name=req.body.name
    res.send(data)
})


//.....................................................

validData=(data)=>{
    const schema={                                  
        name: Joi.string().min(3).required()
    }
    return Joi.validate(data,schema)
   
}


router.put('/api/put/data/joiModule:id',(req,res)=>{
    const testData=data.find(d=>d.id===parseInt(req.params.id))
    if(!testData) res.status(404).send('the data with given id not found')

    const {error}=validData(req.body)
    if( error){
        res.status(400).send(result.error.details[0].message)     //same validation as in above post api but difference is JOI module is used for validation
    }

    data.name=req.body.name
    res.send(data)
})



module.exports=router