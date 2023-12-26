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
    const{title,description} = req.body;
    if(!title){
        return res.status(422).json({
            status:422,
            success:false,
            error:"Enter tittle of the group "
        });
    }
    else{

        const group = new groupModel(
            {
                title:title,
                description:description
            }
        );
        const storeData = await group.save();
         res.status(200).json({
            status:200,
            success:true,
            Message:"Group Created Successfullly",
            data:storeData
        });
    }

    
}


module.exports = {demo,createGroup}
