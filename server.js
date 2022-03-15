const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const app = express()

const connectDB = require('./server/database/connection')

//config the config.env file
dotenv.config({path:'config.env'})

const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'))

//mongodb connection
connectDB()

//parse reqests
app.use(express.urlencoded({extended:true}))

//set view engine
app.set('view engine','ejs')

//load assests
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))

//load routes
app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})