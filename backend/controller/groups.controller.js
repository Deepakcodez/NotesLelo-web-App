const demo= async(req,res)=>{
  try{
    res.send({
        status:200,
        message:"ready to use"
      });
  }catch(err){
    res.send({
        err

      });
  }
};


module.exports = {demo}
