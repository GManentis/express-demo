function log(req , res, next){
    console.log('Ok..');
    next();
}

module.exports = log;