const express = require('express')
const cors = require('cors')
const mysqlpool = require('./db')

// routes
const stdroutes = require('./routes/stdroutes')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/student',stdroutes)

app.listen(3000,async()=>{
    try{
        const connection = await mysqlpool.getConnection()
        console.log("connected to db")
    }catch(err){
        console.log(err)
    }
})