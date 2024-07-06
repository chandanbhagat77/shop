
const express = require('express');
const mongoose = require('mongoose');
const env = require("dotenv");

const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./utils/globalErrorHandler');
const authRoute = require('./Routes/authRoutes');
const adminRouter = require('./Routes/adminRoutes');
const path = require('path');

const app = express()
env.config({ path: "./config.env" })

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000;
console.log(PORT);

app.use(express.json())

app.use(cookieParser())

mongoose.connect(process.env.DATABASE_URL, {

})
    .then((con) => {
        console.log("database connected");
    }).catch(e => {
        console.log("not connected", e);
    })





app.use('/api/v1/auth', authRoute)
app.use('/api/v1/admin', adminRouter)



app.use(globalErrorHandler)


app.listen(PORT, () => {
    console.log("server started at port ", PORT);
})


