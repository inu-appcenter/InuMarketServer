const product = require('../model/product')

const upload = (query) =>{
    const moment = require('moment-timezone')
    
    const nowDate = moment.tz(new Date(),"Asia/Seoul").format('YYYY-MM-DD hh:mm:ss')
    let newProduct = new product()
    newProduct.productName = deleteDoubleQuotes(query.productName);
    newProduct.productState = deleteDoubleQuotes(query.productState);
    newProduct.productPrice = query.productPrice;
    newProduct.productStar = 0;
    newProduct.category = deleteDoubleQuotes(query.category);
    newProduct.productInfo = deleteDoubleQuotes(query.productInfo);
    newProduct.method = deleteDoubleQuotes(query.method);
    newProduct.place = deleteDoubleQuotes(query.place);
    newProduct.sellerId = deleteDoubleQuotes(query.sellerId);
    newProduct.productSelled = false
    newProduct.updateDate = nowDate
    newProduct.sellerName = deleteDoubleQuotes(query.sellerName)
    newProduct.sellerPhone = deleteDoubleQuotes(query.sellerPhone)
    newProduct.productImg = query.productImg
    newProduct.fileFolder = query.fileFolder    

    return newProduct.save() ? true : false
}

const mainList = async() => {
    const findList = (kind) => {
        let promise = product.find({"productSelled":false,"category":{$regex:kind,$options:'i'}},{
            "_id":false,
            "productStar":false,
            "productInfo":false,
            "productState":false,
            "method":false,
            "place":false,
        }).sort({updateDate:'desc'}).limit(6)
        .exec()
        return promise
    }

    let returnArray = ["식권","책","자취방"].map((item)=>{
        return findList(item)
    })

    return Promise.all(returnArray).then((res)=>res)       
}

const oneItem = async(productId) => {
    const returnItem = product.findOne({"productId":productId,"productSelled":false}).exec()
    return returnItem.then((res)=>res)
}

const search = async(searchName) => {
    const returnItems = product.find({"productName":{$regex:searchName,$options:'i'},"productSelled":false},{
        "_id":false,
        "productStar":false,
        "productInfo":false,
        "productState":false,
        "method":false,
        "place":false,
    }).exec()

    return returnItems.then((res)=> res)
}

const categorySearch = async(searchName,category) => {
    const returnItems = product.find({'productName':{$regex:searchName,$options:'i'},'category':{$regex:category,$options:'i'}},{
        "_id":false,
        "productStar":false,
        "productInfo":false,
        "productState":false,
        "method":false,
        "place":false,
    }).exec()

    return returnItems.then((res)=>res)
}

const userItem = async(sellerId) => {
    const returnItems = product.find({"sellerId":sellerId},{
        "_id":false,
        "productStar":false,
        "productInfo":false,
        "productState":false,
        "method":false,
        "place":false,
    }).sort({updateDate:"desc"}).exec()
    return returnItems.then((res)=>res)
}

const category = async(category)=>{
    const returnItems = product.find({"category":{$regex:category,$options:'i'},"productSelled":false},{
        "_id":false,
        "productStar":false,
        "productInfo":false,
        "productState":false,
        "method":false,
        "place":false,
    }).sort({updateDate:"desc"}).exec()

    return returnItems.then((res)=>res)
}

const selling = async(productId) => {
    return product.updateOne({"productId":productId},{$set:{productSelled:true}}).exec().then((res)=>res.n)
}

const removeOne = async(productId) => {
    const deleteReturn = product.deleteOne({"productId":productId}).exec()
    return deleteReturn.then((res)=>res.n)
}

function deleteDoubleQuotes(str){
    str = str.replace(/"/g,"");
    return str
}
module.exports = {upload,mainList,oneItem,search,categorySearch,selling,removeOne,userItem,category}