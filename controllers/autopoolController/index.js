const AutopoolOne = require("../../models/autopool-trial/allAutopool/autopoolOneModel");
const AutopoolInfo = require("../../models/autopool-trial/autopoolInfoModel");
const AutopoolQueue = require("../../models/autopool-trial/autopoolQueueModel");
const AutopoolSetting = require("../../models/autopool-trial/autopoolSettingMode");
const User = require("../../models/userModel");
const Wallet = require("../../models/walletModel");

const enterToFirstAutopool = async(req, res)=>{
    try {
        const user_id = req.auth.id;
        // Useful variable initialization 
        // user info
        const user = await User.findOne({user_id});
        // Autopool Information
        const autopoolInfo = await AutopoolInfo.findOne({autopool_name: "autopool-one"});
        // system anutoppol setting
        const autopoolSetting = await AutopoolSetting.findOne({autopool_name: "autopool-one"});
        // console.log(autopoolInfo)
        // conditions --->>
        if(!user.topup_status){
            res.status(503).json({message: "Service unavailable for this user."})
        }else{
            // check system autopool setting
            if(!autopoolSetting?.status){
                // find out autopool one queue
                const autopoolQueue = await AutopoolQueue.findOne({autopool_name: "autopool-one"});
                if(!autopoolQueue?.name){
                    await AutopoolQueue.create({
                        autopool_name: "autopool-one",
                        stack: [user_id]
                    })
                }else{
                    await AutopoolQueue.findOneAndUpdate({autopool_name: "autopool-one"},{
                        $push: {
                            stack: user_id
                        }
                    })
                }
                res.status(400).json({message: "System autopool is off now by admin. Your id is now in queue to enter on autopool."})
            }else{
                // check autopool one exist or not
                // if not exist then create first document for outopool one
                if(!autopoolInfo?.autopool_name){
                    // create first document
                    await AutopoolInfo.create({
                        autopool_name: "autopool-one",
                        current_up_level: 1,
                        current_up_level_index: 1,
                        current_down_level: 1,
                        current_down_level_index: 0,
                        current_up_level_limit: 1,
                        this_index: 0,
                        tree_history: [
                            {
                                user_id,
                                up_level: 1,
                                down_level: 1,
                                parent: "root",
                                this_child_index: 1,
                                this_index: 0,
                            }
                        ]
                    })

                    // create autopool one document
                    await AutopoolOne.create({
                        user_id,
                        top1: "root",
                        top2: "root",
                        child: []
                    })
                    // update current autopool for that user
                    await User.findOneAndUpdate({user_id},{
                        $set: {
                            current_autopool: 1
                        }
                    })
                    res.status(200).json({message: "successfull"})
                }else{
                    // let current_current_parent;
                    // let current_down_level_child;
                    const recent_user = autopoolInfo?.tree_history?.filter(p=> p.down_level === autopoolInfo?.current_up_level && autopoolInfo?.current_up_level_index === p.this_child_index )
                    console.log("54 recent_user ", recent_user)
                    let current_down_level_child;
                    // if(recent_user[0]?.parent === "root"){
                        current_down_level_child = autopoolInfo?.tree_history?.filter(p=> p.parent === recent_user[0]?.user_id)
                    // }else{
                    //     current_down_level_child = autopoolInfo?.tree_history?.filter(p=> p.parent === recent_user[0]?.parent)
                    // }
                    
                    // this is only condition when current parent will be stay as next current parent
                    if(current_down_level_child?.length < 3){
                        let top2_parent = recent_user[0]?.parent;
                        let current_parent = recent_user[0]?.user_id;
                        // if(recent_user[0]?.parent === "root"){
                        //     current_parent = recent_user[0]?.user_id;
                        //     const top_parent = autopoolInfo?.tree_history?.filter(f=> f.user_id === recent_user[0]?.parent);
                        //     top2_parent = top_parent[0]?.parent
                        // }else{
                        //     current_parent = recent_user[0]?.parent;
                        //     const top_parent = autopoolInfo?.tree_history?.filter(f=> f?.user_id === recent_user[0]?.parent);
                        //     top2_parent = top_parent[0]?.parent
                        // }
                        console.log("74 current parent ", current_parent)
                        console.log("75 top2 parent ", top2_parent)
                        // aupdate autopool info
                        if(recent_user[0]?.parent === "root" && autopoolInfo?.current_down_level_index === 0){
                            await AutopoolInfo.findOneAndUpdate({autopool_name: "autopool-one"},{
                                $set: {
                                    current_up_level: autopoolInfo?.current_up_level,
                                    current_up_level_index: autopoolInfo?.current_up_level_index,
                                    current_down_level: autopoolInfo?.current_down_level + 1,
                                    current_down_level_index: autopoolInfo.current_down_level_index + 1,
                                    current_up_level_limit: autopoolInfo?.current_up_level_limit,
                                    this_index: autopoolInfo?.this_index + 1,
                                    tree_history: [...autopoolInfo?.tree_history, {
                                            user_id,
                                            up_level: autopoolInfo?.current_up_level,
                                            down_level: autopoolInfo?.current_down_level + 1,
                                            parent: current_parent,
                                            this_child_index: autopoolInfo?.current_down_level_index + 1,
                                            this_index: autopoolInfo?.this_index + 1,
                                    }]
                                }
                            })
                        }else{
                            await AutopoolInfo.findOneAndUpdate({autopool_name: "autopool-one"},{
                                $set: {
                                    current_up_level: autopoolInfo?.current_up_level,
                                    current_up_level_index: autopoolInfo?.current_up_level_index,
                                    current_down_level: autopoolInfo?.current_down_level,
                                    current_down_level_index: autopoolInfo.current_down_level_index + 1,
                                    current_up_level_limit: autopoolInfo?.current_up_level_limit,
                                    this_index: autopoolInfo?.this_index + 1,
                                    tree_history: [...autopoolInfo?.tree_history, {
                                            user_id,
                                            up_level: autopoolInfo?.current_up_level,
                                            down_level: autopoolInfo?.current_down_level,
                                            parent: current_parent,
                                            this_child_index: autopoolInfo?.current_down_level_index + 1,
                                            this_index: autopoolInfo?.this_index + 1,
                                    }]
                                }
                            })
                        }
                        // create autopool one document
                        await AutopoolOne.create({
                            user_id,
                            top1: current_parent,
                            top2: top2_parent,
                            child: []
                        })
                        // update current autopool for that user
                        await User.findOneAndUpdate({user_id},{
                            $set: {
                                current_autopool: 1
                            }
                        })
                        // push this user to the top1 child array
                        await AutopoolOne.findOneAndUpdate({user_id: current_parent},{
                            $push: {
                                child: user_id
                            }
                        })
                        // push this user to the top2 child array
                        await AutopoolOne.findOneAndUpdate({user_id: top2_parent},{
                            $push: {
                                child: user_id
                            }
                        })
                        // distribute autopool income to top1 and top2 parent
                        // ------------ //
                        // top1
                        const top1Account = await User.findOne({user_id: current_parent})
                        const top1Wallet = await Wallet.findOne({user_id: current_parent});
                        if(top1Account?.current_autopool <= 1 && top1Wallet?.autopool_freez_income < 50){
                            await Wallet.findOneAndUpdate({user_id: current_parent}, {
                                $inc: {
                                    autopool_freez_income: +10
                                }
                            })
                        }else{
                            await Wallet.findOneAndUpdate({user_id: current_parent}, {
                                $inc: {
                                    autopool_income: +10
                                }
                            })
                        }

                        // top2
                        const top2Account = await User.findOne({user_id: top2_parent})
                        const top2Wallet = await Wallet.findOne({user_id: top2_parent});
                        if(top2Account?.current_autopool <= 1 && top2Wallet?.autopool_freez_income < 50){
                            await Wallet.findOneAndUpdate({user_id: top2_parent}, {
                                $inc: {
                                    autopool_freez_income: +10
                                }
                            })
                        }else{
                            await Wallet.findOneAndUpdate({user_id: top2_parent}, {
                                $inc: {
                                    autopool_income: +10
                                }
                            })
                        }
                        // check sponsor's autopool automatic upgrade
                        res.status(200).json({message: "successfull"})
                    }else{
                        // check up level corss it's inedx limit or not
                        // if it's not corss it's index limit then swtich up level index to +1 and make that index as current head node
                        // if it's cross it's limit then then switch to it's down line find that down line's 1st index and make it current head node
                        if(autopoolInfo?.current_up_level_index !== autopoolInfo?.current_up_level_limit){
                            // here if up level is not corss the index limit
                            const current_parent = autopoolInfo?.tree_history?.filter(p=>autopoolInfo?.current_up_level === p?.down_level && p?.this_index === autopoolInfo?.current_up_level_index + 1);
                            console.log("146 curret_parent ", current_parent)
                            const top2_parent = current_parent[0]?.parent;
                            await AutopoolInfo.findOneAndUpdate({autopool_name: "autopool-one"},{
                                $set: {
                                    current_up_level: autopoolInfo?.current_up_level,
                                    current_up_level_index: autopoolInfo?.current_up_level_index + 1,
                                    current_down_level: autopoolInfo?.current_down_level,
                                    current_down_level_index: autopoolInfo?.current_down_level_index < 3 ? autopoolInfo?.current_down_level_index + 1 : 1,
                                    current_up_level_limit: autopoolInfo?.current_up_level_limit,
                                    this_index: autopoolInfo?.this_index + 1,
                                    tree_history: [...autopoolInfo?.tree_history, {
                                            user_id,
                                            up_level: autopoolInfo?.current_up_level,
                                            down_level: autopoolInfo?.current_down_level,
                                            parent: current_parent[0]?.user_id,
                                            this_child_index: autopoolInfo?.current_down_level_index < 3 ? autopoolInfo?.current_down_level_index + 1 : 1,
                                            this_index: autopoolInfo?.this_index + 1,
                                    }]
                                }
                            })
                            // create autopool one document
                            await AutopoolOne.create({
                                user_id,
                                top1: current_parent[0]?.user_id,
                                top2: top2_parent,
                                child: []
                            })
                            // update current autopool for that user
                            await User.findOneAndUpdate({user_id},{
                                $set: {
                                    current_autopool: 1
                                }
                            })
                            // push this user to the top1 child array
                            await AutopoolOne.findOneAndUpdate({user_id: current_parent[0]?.user_id},{
                                $push: {
                                    child: user_id
                                }
                            })
                            // push this user to the top2 child array
                            await AutopoolOne.findOneAndUpdate({user_id: top2_parent},{
                                $push: {
                                    child: user_id
                                }
                            })
                            // distribute autopool income to top1 and top2 parent
                            // ------------ //
                            // top1
                            const top1Account = await User.findOne({user_id: current_parent[0]?.user_id})
                            const top1Wallet = await Wallet.findOne({user_id: current_parent[0]?.user_id});
                            if(top1Account?.current_autopool <= 1 && top1Wallet?.autopool_freez_income < 50){
                                await Wallet.findOneAndUpdate({user_id: current_parent[0]?.user_id}, {
                                    $inc: {
                                        autopool_freez_income: +10
                                    }
                                })
                            }else{
                                await Wallet.findOneAndUpdate({user_id: current_parent[0]?.user_id}, {
                                    $inc: {
                                        autopool_income: +10
                                    }
                                })
                            }

                            // top2
                            const top2Account = await User.findOne({user_id: top2_parent})
                            const top2Wallet = await Wallet.findOne({user_id: top2_parent});
                            if(top2Account?.current_autopool <= 1 && top2Wallet?.autopool_freez_income < 50){
                                await Wallet.findOneAndUpdate({user_id: top2_parent}, {
                                    $inc: {
                                        autopool_freez_income: +10
                                    }
                                })
                            }else{
                                await Wallet.findOneAndUpdate({user_id: top2_parent}, {
                                    $inc: {
                                        autopool_income: +10
                                    }
                                })
                            }
                            // check sponsor's autopool automatic upgrade
                            res.status(200).json({message: "successfull"})
                        }else{
                            // else up level corss it's index limit
                            const previous_parent = autopoolInfo?.tree_history?.filter(p=>autopoolInfo?.current_up_level ===p?.down_level && p.this_child_index === 1)
                            const current_parent = autopoolInfo?.tree_history?.filter(c=> c?.parent === previous_parent[0]?.user_id && c?.this_child_index === 1)
                            const top2_parent = current_parent[0]?.parent;
                            console.log("192 previous parent ", previous_parent[0]?.user_id)
                            console.log("192 current parent ", current_parent[0]?.user_id)
                            console.log("192 top2 parent ", current_parent[0]?.parent)
                            await AutopoolInfo.findOneAndUpdate({autopool_name: "autopool-one"},{
                                $set: {
                                    current_up_level: current_parent[0]?.down_level,
                                    current_up_level_index: current_parent[0]?.this_index,
                                    current_down_level: current_parent[0]?.down_level + 1,
                                    current_down_level_index: 1,
                                    current_up_level_limit: Math.pow(3, current_parent[0]?.down_level - 1),
                                    this_index: 1,
                                    tree_history: [...autopoolInfo?.tree_history, {
                                            user_id,
                                            up_level: current_parent[0]?.down_level,
                                            down_level: current_parent[0]?.down_level + 1,
                                            parent: current_parent[0]?.user_id,
                                            this_child_index: 1,
                                            this_index: 1,
                                    }]
                                }
                            })
                            // create autopool one document
                            await AutopoolOne.create({
                                user_id,
                                top1: current_parent[0]?.user_id,
                                top2: top2_parent,
                                child: []
                            })
                            // update current autopool for that user
                            await User.findOneAndUpdate({user_id},{
                                $set: {
                                    current_autopool: 1
                                }
                            })
                            // push this user to the top1 child array
                            await AutopoolOne.findOneAndUpdate({user_id: current_parent[0]?.user_id},{
                                $push: {
                                    child: user_id
                                }
                            })
                            // push this user to the top2 child array
                            await AutopoolOne.findOneAndUpdate({user_id: top2_parent},{
                                $push: {
                                    child: user_id
                                }
                            })
                            // distribute autopool income to top1 and top2 parent
                            // ------------ //
                            // top1
                            const top1Account = await User.findOne({user_id: current_parent[0]?.user_id})
                            const top1Wallet = await Wallet.findOne({user_id: current_parent[0]?.user_id});
                            if(top1Account?.current_autopool <= 1 && top1Wallet?.autopool_freez_income < 50){
                                await Wallet.findOneAndUpdate({user_id: current_parent[0]?.user_id}, {
                                    $inc: {
                                        autopool_freez_income: +10
                                    }
                                })
                            }else{
                                await Wallet.findOneAndUpdate({user_id: current_parent[0]?.user_id}, {
                                    $inc: {
                                        autopool_income: +10
                                    }
                                })
                            }

                            // top2
                            const top2Account = await User.findOne({user_id: top2_parent})
                            const top2Wallet = await Wallet.findOne({user_id: top2_parent});
                            if(top2Account?.current_autopool <= 1 && top2Wallet?.autopool_freez_income < 50){
                                await Wallet.findOneAndUpdate({user_id: top2_parent}, {
                                    $inc: {
                                        autopool_freez_income: +10
                                    }
                                })
                            }else{
                                await Wallet.findOneAndUpdate({user_id: top2_parent}, {
                                    $inc: {
                                        autopool_income: +10
                                    }
                                })
                            }
                            // check sponsor's autopool automatic upgrade
                            res.status(200).json({message: "successfull"})
                        }
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

module.exports = {
    enterToFirstAutopool,
}