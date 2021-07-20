import axios from 'axios';
import { ElNotification } from 'element-plus';
const baseAxiosConfig = {
  baseURL: '/api/v1',
  headers: {
    Accept: 'application/json',
    timeout: 3000,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

const request = axios.create({ ...baseAxiosConfig });

request.interceptors.request.use((config) => {
  const newConfig = { ...config };
  // 增加请求时间戳
  newConfig.params = {
    ...{
      _t: new Date().getTime(),
    },
    ...config.params,
  };

  return newConfig;
});

request.interceptors.response.use(
  (result) => {
    const { code, msg } = result.data || {};
    if (code !== 200) {
      if (msg) {
        ElNotification.error({
            title: "错误",
            message: msg
        })
      }
      return Promise.reject(result.data);
    }
    return result.data;
  },
  (error) => Promise.reject(error),
);

export default request;
