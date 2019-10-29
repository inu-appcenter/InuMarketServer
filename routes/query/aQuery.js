const chat = require('../model/userChat')

const saveFCM = async (id,FCM)=>{
    if(await findUser(id)===null){
        newUser(id,FCM)
    }
    else{
        updateFcm(id,FCM)
    }
}

const startChat = async(id,sellerId,roomId) =>{
    await saveChatRoom(id,roomId)
    await saveChatRoom(sellerId,roomId)
    return roomId
}

const getRoom = async(id)=>{
    const chatList = chat.findOne({"user":id},{_id:false,fcm:false,socketId:false,user:false,__v:false}).exec()
    return chatList.then((res)=>res)
}

const newUser = (id,FCM)=>{
    const userFCM = new chat
    userFCM.user = id
    userFCM.fcm = FCM
    userFCM.socketId = ""
    userFCM.chatList = []
    userFCM.save()
}

const updateFcm = (id,FCM)=>{
    chat.updateOne({"user":id},{$set:{"fcm":FCM}}).exec()
}

const findUser = (id) => {
    const isIn = chat.findOne({"user":id}).exec().chatList
    return isIn.then((res)=>res)
}

const saveChatRoom = async(id,roomId) => {
    await findRoom(id,roomId) === null && chat.updateOne({"user":id},{$push:{chatList:roomId}}).exec()
}

const findRoom = (id,roomId)=>{
    const isIn = chat.findOne({"user":id,"chatList":roomId}).exec()
    return isIn.then((res)=>res)
}


module.exports = {saveFCM,startChat,getRoom}