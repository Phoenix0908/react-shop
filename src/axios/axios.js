import axios from 'axios';
import { timeout } from './config.js'
import { message } from 'antd'

const { CancelToken } = axios;
const baseConfig = { timeout: timeout,method: 'post', headers:{}}

export const ajax = (path,params,success,failure) =>  {

	const hooks = {
      abort: null,
    }

    const cancelToken = new CancelToken((c) => { hooks.abort = c })

	axios({...baseConfig,url:path,data:params}).then(
		(res) => {
			if (res.status === 0){
				 return success(res.data)
			}else{			
	             message.error(res.data.msg)
			}
		}
	).catch((e) => {
		if (axios.isCancel(e)) {
          if (process.env.NODE_ENV !== 'production') {
            console.log('Request canceled', e.message)
          }
        }else{
        	
            if (e.code === 'ECONNABORTED') { // 超时的报错
               message.warning('服务器连接超时')
            } else {
              message.warning(e.data.msg)
            }
          
        }
	})
}