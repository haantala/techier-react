import Request from '.';
import { ApiRoutes } from '../constants';

export const insertData = async (data) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
  const res = await Request.post(ApiRoutes.ADDDATA, data);
  return res;
};



export const getData = async (data) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
  const res = await Request.get(ApiRoutes.GETDATA, data);
  return res;
};

export const updateData = async (data) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
  const res = await Request.post(ApiRoutes.UPDATEDATA, data);
  return res;
};

export const deleteData = async (data) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
  const res = await Request.post(ApiRoutes.DELETEDATA, data);
  return res;
};
