const express=require('express')
const router=express.Router()

const data=[
    { id:1, name:'abhishek'},
    { id:2, name:'neha'},
    { id:3, name:'nitin'},
    { id:4, name:'aaaaaa'}
]



 //...............................TEST:- ONE.....................................

 router.get('/api/get/data',(req,res,next)=>{
    res.send('hey this is api data '+JSON.stringify(data))
})

// ..................................TEST:- TWO................................. 

 router.get('/api/get/data/:id',(req,res)=>{
    res.send(req.params.id)
})
 

//...................................TEST:- THREE.................................


router.get('/api/get/data/validation/:id',(req,res)=>{
    let paramId=req.params.id
    for(let i=0;i<=data.length;i--){
        console.log(data[i].id)                       
        if(paramId==data[i].id){
            res.send(data[i].name+'   //////////')
             //break
        }else{
            console.log('ID NOT FOUND.......')
        } 
    }
})

//.....................................TEST:- FOUR................................. 

router.get('/api/get/data/tValidation/:year/:month',(req,res)=>{
    res.send(req.params)
})

//.......................................TEST:- FIVE................................ 


router.get('/api/get/data/query/:year/:month',(req,res)=>{
    res.send(req.query) //you can configure api according to query
                        //LOOKS LIKE :- http://localhost:3000/api/get/data/2017/3?sortBy=name
})

//.......................................TEST:- SIX..................................


router.get('/api/get/data/auth/:year/:month',(req,res)=>{
    if(req.query.name){    //to access the of this api query must be there
        res.send(req.query) //LOOKS LIKE :- http://localhost:3000/api/get/data/auth/2010/06?name=abhishek
    }else{
        res.send('query not found')
    }
})

//...................................TEST :- SEVEN.....................................

router.get('/api/get/data/single/:id',(req,res)=>{
    let paramId=req.params.id
    for(let i=0;i<=data.length-1;i++){
        console.log(data[i].id)
        if(paramId==data[i].id){
            res.send(data[i].name+'   //////////')
            break
        }else{
            res.status(404).send('The data with given id not found') //setting up status 404 if param id does not matches the data id
        }                                                            //you can see status in inspect>network   
    }
})

module.exports=router