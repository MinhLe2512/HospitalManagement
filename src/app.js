require('dotenv');
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')

const app = express();

configViewEngine(app);

app.use('/', webRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, ()=>console.log(`server running on PORT ${PORT}`));