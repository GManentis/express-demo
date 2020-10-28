const express = require('express');
const router = express.Router();


router.get('/',(req,res) => {
    res.render('index',{title:"My message",message:"How there fella"});
});


module.exports = router;