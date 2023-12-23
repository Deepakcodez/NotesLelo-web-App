const groupdb=require("../model/groups.model");
const groupModel=groupdb.Group;



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


const createGroup = async (req,res)=>{
    const{tittle,description} = req.body;
    if(!tittle){
        return res.status(422).json({
            status:422,
            success:false,
            error:"Enter tittle of the group "
        });
    }
    else{
        return res.status(200).json({
            status:200,
            success:true,
            Message:"Group Created Successfullly",
        });
    }

    
}


module.exports = {demo,createGroup}
