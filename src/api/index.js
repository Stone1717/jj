import request from '../utils/request';

// 获取列表
export const getList = (option) => {
  const newOpt = { ...option, ...{ url: '/queryLog', method: 'GET' } };
  return request(newOpt);
};

// 获取详情
export const getDetail = (option) => {
  const newOpt = { ...option, ...{ url: '/getLogDetail', method: 'GET' } };
  return request(newOpt);
};
