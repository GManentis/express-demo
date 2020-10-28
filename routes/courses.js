const express = require('express');
const router = express.Router();

const courses = [{id:1,name:"Test1"},{id:2,name:"Test1"}];

router.get('/',(req,res) => {
    res.send(courses);
});

router.get('/:id',(req,res) => {
    const my_course = courses.find(course => course.id === parseInt(req.params.id))

    res.setHeader('Content-Type','application/json');
    if(!my_course){
        res.status(404).send(JSON.stringify({message:"Not found"}));
    }
    res.status(200).send(my_course);

    res.send(my_course);
});

router.post('/',(req,res) => {
    // const validatorSchema =  Joi.object({ 
    //     name: Joi.string().min(6).required() 
    // });

    // const result = validatorSchema.validate(req.body);

    // if(result.error){
    //     //res.status(422).send({message:'There is error'});
    //     res.status(422).send(result.error.details[0].message);
    // }

    const {error} = validateCourse(req.body);
    if(error){
        //res.status(422).send({message:'There is error'});
        res.status(422).send(error.details[0].message);
    }

    const name = req.body.name;
    res.status(200).send(JSON.stringify({message:`The course ${name} is stored`}));
});

const validateCourse = (course) => {
    const validatorSchema =  Joi.object({ 
        name: Joi.string().min(6).required() 
    });

    return validatorSchema.validate(course);
}

module.exports = router;