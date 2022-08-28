const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
require('./config/db')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')


const app = express();

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/user',userRoute)
app.use('/api/v1/product',productRoute)


let port = process.env.PORT || 8000
app.listen(port,() => {
    console.log(`server running on port ${port}`);
})

