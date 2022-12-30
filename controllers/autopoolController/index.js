const AutopoolOne = require("../../models/autopool-trial/allAutopool/autopoolOneModel");
const AutopoolInfo = require("../../models/autopool-trial/autopoolInfoModel");
const User = require("../../models/userModel");

const enterToFirstAutopool = async(req, res)=>{
    try {
        const user_id = req.auth.id;
        // Useful variable initialization 
        // user info
        const user = await User.findOne({user_id});
        // Autopool Information
        const autopoolInfo = await AutopoolInfo.findOne({autopoo_name: "autopool-one"});
        // conditions --->>
        if(!user.topup_status){
            res.status(503).json({message: "Service Unavailable for this user."})
        }else{
            // check autopool one exist or not
                // if not exist then create first document for outopool one
            if(!autopoolInfo?.autopoo_name){
                // create first document
                await AutopoolInfo.create({
                    autopoo_name: "autopool-one",
                    current_up_level: 1,
                    current_up_index: 1,
                    current_down_level: 2,
                    current_down_level_index: 0,
                    current_up_level_limit: 1,
                    tree_history: [
                        {
                            user_id,
                            up_level: 0,
                            down_level: 2,
                            this_child_level: 1,
                            parent: "root",
                            this_child_index: 1
                        }
                    ]
                })

                // create autopool one document
                await AutopoolOne.create({
                    user_id,
                    top1: "root",
                    top2: "root",
                    position: "",
                    child: []
                })
            }else{
                // let current_current_parent;
                // let current_down_level_child;
                const recent_parent = autopoolInfo?.tree_history?.filter(p=> p.this_child_level === autopoolInfo?.current_up_level && autopoolInfo?.current_up_level_index === p.this_child_index )
                const current_down_level_child = autopoolInfo?.tree_history?.filter(p=> p.parent === recent_parent[0]?.user_id)
                
                // this is only condition when current parent will be stay as next current parent
                if(current_down_level_child?.length < 3){
                    const current_parent = recent_parent[0]?.user_id;
                    // aupdate autopool info
                    await AutopoolInfo.findOneAndUpdate({autopoo_name: "autopool-one"},{
                        $set: {
                            current_up_level: autopoolInfo?.current_up_level,
                            current_up_index: autopoolInfo?.current_up_level_index,
                            current_down_level: autopoolInfo?.current_down_level,
                            current_down_level_index: autopoolInfo.current_down_level_index + 1,
                            current_up_level_limit: autopoolInfo?.current_up_level_limit,
                            tree_history: [...autopoolInfo?.tree_history, {
                                    user_id,
                                    up_level: autopoolInfo?.current_up_level,
                                    down_level: autopoolInfo?.current_down_level,
                                    this_child_level: 2,
                                    parent: current_parent,
                                    this_child_index: autopoolInfo?.current_down_level_index + 1
                            }]
                        }
                    })
                }else{
                    // check up level corss it's inedx limit or not
                    // if it's not corss it's index limit then swtich up level index to +1 and make that index as current head node
                    // if it's cross it's limit then then switch to it's down line find that down line's 1st index and make it current head node
                    if(autopoolInfo?.current_up_index !== autopoolInfo?.current_up_level_limit){
                        // here if up level is not corss the index limit
                    }else{
                        // else up level corss it's index limit
                    }
                }
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.toString()
          })
    }
}