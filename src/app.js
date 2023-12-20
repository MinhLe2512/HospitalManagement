require('dotenv').config();
const bodyParser = require ('body-parser');
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const landingRoutes = require('./routes/landingRoute');
const doctorRoutes = require('./routes/doctorRoute');
const appointmentRoutes = require('./routes/appointmentRoute');
const employeeRoutes = require('./routes/employeeRoute');
const receiptRoutes = require('./routes/receiptRoute');
const complainRoutes = require('./routes/complainRoute');
const storeRoutes = require('./routes/storeRoute');

const app = express();

configViewEngine(app);
app.use('/', landingRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointment', appointmentRoutes);
app.use('/employee', employeeRoutes);
app.use('/receipt', receiptRoutes);
app.use('/inbox', complainRoutes);
app.use('/store', storeRoutes);


const PORT = process.env.PORT || 8081;
app.listen(PORT, ()=>console.log(`server running on PORT ${PORT}`));