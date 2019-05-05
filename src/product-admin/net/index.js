import * as Constant from '../constant/constant'


class HttpManager {

    /**
     * 请求
     * @param path                  接口路径如'goods/newindex2'
     * @param parameter             参数{}对象类型，为空时传{}
     * @param isBusiness            是否是通用型接口
     * @param navigator             导航(不是必须，登录业务需要)
     * @param loginCallBack         登录回调(不是必须，登录业务需要)

     * @returns {success:true,result:data}
     */
    async netFetch(path, parameter, isBusiness, navigator=null,loginCallBack=null) {

        // 对每一次的请求参数加入 资源标识

        //默认guid
        const { guid = Constant.defaultGuid } = parameter;

        //默认cryptToken
        let cryptToken = Constant.defaultToken;

        let token = 'a6f315199e844344aba75cddab184bd4';

        console.log(parameter);
        parameter.resource_guid = Constant.resource_guid;

        //参数为json字符串
        let param = JSON.stringify(parameter);



        /*计算签名*/
        let hashStr = token.charAt(3) + token.charAt(5) + token.charAt(7);
        let num10 = parseInt(hashStr, 16);
        let hashKind = num10 % 8;
        let hashArrays = Constant.hashRule[hashKind];
        let loginCryptToken = ""
        hashArrays.map(function (n) {
            loginCryptToken += token.charAt(n);
        });

        cryptToken = loginCryptToken;

        //console.log('cryptToken是',cryptToken)



        let url = Constant.apiurl + path;
        let timestamp = Date.parse(new Date());
        let time = timestamp / 1000;
        let platform = Constant.platform

        let signature = Constant.testGuid;

        console.log('path=' + path + ",time=" + time + ",guid=" + guid + ",parm=" + param + ",cryptToken=" + cryptToken)

        let requestParams = formParamsJson("POST",
            {
                "time": time,
                "version": Constant.version,
                "guid": guid,
                "param": param,
                "signature": signature,
                "platform": platform
            })

        let response = await fetch(url, requestParams);
        let responseJson = await response.json();

        let serverNo = responseJson.ServerNo
        if (serverNo === 'SN200') {
            return {
                success: true,
                result: responseJson.ResultData,
                failblock:function () {

                }
            }
        } else if (Constant.loginRule.includes(serverNo)) {//'SN005','SN007','SN009',
            //登录过期，清空用户登录信息

        } else if (serverNo === 'SN520') {
            return {
                success: false,
                result: responseJson.ResultData.info,
                failblock:function () {

                }
            }
        } else {
            return {
                success: false,
                result: responseJson.ResultData.info,
                failblock:function () {

                }
            }
        }
        //return  responseJson;
    }


    /*
     /*  /!**
     * 格式化表单请求参数
     *!/
     formParams(method, params) {
     const str = [];
     for (let p in params) {
     str.push(p + "=" + params[p]);
     }
     let body = null;
     if (str.length > 0) {
     body = str.join("&");
     }
     const req = {
     method: method,
     headers: {
     "Content-Type": "application/x-www-form-urlencoded"
     },
     body
     };
     return req
     }
     */

}

const formParamsJson = function (method, params) {
    const body = JSON.stringify(params);
    const req = {
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body
    };
    return req
}
export default new HttpManager();

