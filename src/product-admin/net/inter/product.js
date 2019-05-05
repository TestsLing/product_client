import Api from '../index'


/**
 * 添加产品
 * @param param
 * @returns {Promise<{result, success, failblock}>}
 */
const add = async(param)=>{
    return await Api.netFetch('product/create',param,false)
};

/**
 * 获取产品列表
 * @param param
 * @returns {Promise<{result, success, failblock}>}
 */
const list = async(param)=>{
    return await Api.netFetch('product/list',param,false)
};


/**
 * 删除产品
 * @param param
 * @returns {Promise<{result, success, failblock}>}
 */
const del = async(param)=>{
    return await Api.netFetch('product/delete',param,false)
};

/**
 * 修改产品基本信息
 * @param param
 * @returns {Promise<{result, success, failblock}>}
 */
const update = async(param)=>{
    return await Api.netFetch('product/update',param,false)
};

/**
 * 修改产品详情
 * @param param
 * @returns {Promise<{result, success, failblock}>}
 */
const editDetail = async(param)=>{
    return await Api.netFetch('product/detail/edit',param,false)
};

/**
 * 获取产品详情
 * @param param
 * @returns {Promise<{result, success, failblock}>}
 */
const detail = async(param)=>{
    return await Api.netFetch('product/detail',param,false)
};

/**
 * 修改产品规格
 * @param param
 * @returns {Promise<{result, success, failblock}>}
 */
const updateSpecific = async(param)=>{
    return await Api.netFetch('specification/update',param,false)
};

/**
 * 产品规格列表
 * @param param
 * @returns {Promise<{result, success, failblock}>}
 */
const specificList = async(param)=>{
    return await Api.netFetch('specification/list',param,false)
};


export default {
    add,
    del,
    update,
    editDetail,
    specificList,
    updateSpecific,
    detail,
    list
}
