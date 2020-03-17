const express=require('express')
const router=express.Router()
var bodyParser=require('body-parser')
const Joi=require('joi')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const data=[
    { id:1, name:'post 1'},
    { id:2, name:'post 2'},
    { id:3, name:'post 3'}
]

//.............................................................

router.get('/api/post/data',(req,res)=>{
    res.send(data)          //initial checking data through get api
})

//...............................................................

router.post('/api/post/data/pushData',(req,res)=>{
    const testData={                //posted a set of new object data
        id:data.length+1,           //added to existing array of data
        name:req.body.name
    }
    data.push(testData)     
    console.log(JSON.stringify(data)+'    this is the test data')
})

//...............................................................

router.post('/api/post/data/validation',(req,res)=>{
    if(!req.body.name || req.body.name.length<3){       //This is a simple validation logic
        res.status(400).send('Name required and should be minimum 3 character')
    }else{          
        res.send(data)
    }
})

//.............................................................

router.post('/api/post/data/joiValidation',(req,res)=>{
    const schema={                              // we can use joi api validation module to make this code shorter 
        name: Joi.string().min(3).required()
    }
    const result=Joi.validate(req.body,schema)
    
    if(result.error){
        res.status(400).send(result.error.details[0].message)     //same validation as in above post api but difference is JOI module is used for validation
    }else{
        res.send(result)
    }
})


//.....................joi api validation module....................

validData=(data)=>{
    const schema={                              //joi validation module
        name: Joi.string().min(3).required()
    }       
    return Joi.validate(data,schema)
   
}


module.exports=router