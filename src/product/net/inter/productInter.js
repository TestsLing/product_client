import Api from '../index'


// 评论
const product = async(param)=>{
    return await Api.netFetch('test/create',param,false)
}

const productList = async(param)=>{
    return await Api.netFetch('comment/list',param,false)
}


export default {
    product,
    productList
}
