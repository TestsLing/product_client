/**
 *  Created By 憧憬
 */

import Api from '../index'


/**
 * 添加类别
 * @param param
 * @returns {Promise<{result, success, failblock}>}
 */
const add = async(param)=>{
    return await Api.netFetch('cate/create',param,false)
};

/**
 * 获取类别列表
 * @param param
 * @returns {Promise<{result, success, failblock}>}
 */
const list = async(param)=>{
    return await Api.netFetch('cate/list',param,false)
};


/**
 * 删除类别
 * @param param
 * @returns {Promise<{result, success, failblock}>}
 */
const del = async(param)=>{
    return await Api.netFetch('cate/delete',param,false)
};

/**
 * 修改类别
 * @param param
 * @returns {Promise<{result, success, failblock}>}
 */
const update = async(param)=>{
    return await Api.netFetch('cate/update',param,false)
};


export default {
    add,
    del,
    update,
    list
}
