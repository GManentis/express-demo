const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const express = require('express');
const Joi = require('joi');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');//My entity
const home = require('./routes/home');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(logger);
//app.use(morgan('tiny'));
//For pug usage
app.set('view engine','pug');
app.set('views','./views');
//End pug
app.use('/api/courses',courses);
app.use('/',home);



// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app NODE_ENV: ${app.get('env')}`);
//console.log(config.get('name')); 
// console.log(`mail pass: ${config.get('mail.password')}`);
startupDebugger('My debug startup');
dbDebugger('My db debugger...');
console.log(process.env.DEBUG);


app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/test',(req,res) => {
    return res.send('It works!');
});

const port = process.env.PORT || 5000 ;
app.listen(port, ()=>{console.log(`Running at ${port}, Please wait...`)});

