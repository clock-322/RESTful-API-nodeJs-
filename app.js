const express=require('express')
const app=express()
const port=process.env.PORT || 3000
var cors = require('cors')
app.use(cors())

app.use(require(__dirname+'/components/getApi'))
app.use(require(__dirname+'/components/postApi'))
app.use(require(__dirname+'/components/updateApi'))
app.use(require(__dirname+'/components/deleteApi'))

app.listen(port,()=>{
    console.log(port)
})