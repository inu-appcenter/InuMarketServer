const report = require('../model/report')
const moment = require('moment-timezone')
const nowDate = moment.tz(new Date(),"Asia/Seoul").format('YYYY-MM-DD hh:mm:ss')

const moonHee = function(query){
    let moonHeeReport = new report()
    moonHeeReport.sender = query.sender
    moonHeeReport.context = query.context
    moonHeeReport.date = nowDate
    return moonHeeReport.save() ? true : false
}

const nineOneOne = function(query){
    const nineOneOneReport = new report()
    nineOneOneReport.sender = query.sender
    nineOneOneReport.context = query.kind +"분야로 '"+query.productId + "' 아이템 신고되엇습니다"
    nineOneOneReport.date = nowDate
    return nineOneOneReport.save() ? true : false
}

const reportRead = async function(){
    const returnReport = report.find({}).exec()
    return returnReport.then((res)=>res)
}


module.exports = {moonHee,nineOneOne,reportRead}