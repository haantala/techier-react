import Request from '.';
import { ApiRoutes } from '../constants';

// Define a type for the data parameter
interface Data {
  [key: string]: any; // Use a more specific type if you have a known structure
}

// Define the return type for API functions
interface ApiResponse {
  status: any;
  message: any;
  data?: any;
  description:any; // Adjust type based on your actual API response
}

// Function to insert data
export const insertData = async (data: Data): Promise<ApiResponse> => {
  console.log('====================================');
  console.log(data);
  console.log('====================================');
  const res: ApiResponse = await Request.post(ApiRoutes.ADDDATA, data);
  return res;
};

// Function to get data
export const getData = async ()  => {

  const res: ApiResponse = await Request.get(ApiRoutes.GETDATA);
  return res;
};

// Function to update data
export const updateData = async (data: Data): Promise<ApiResponse> => {
  console.log('====================================');
  console.log(data);
  console.log('====================================');
  const res: ApiResponse = await Request.post(ApiRoutes.UPDATEDATA, data);
  return res;
};

// Function to delete data
export const deleteData = async (data: Data): Promise<ApiResponse> => {
  console.log('====================================');
  console.log(data);
  console.log('====================================');
  const res: ApiResponse = await Request.post(ApiRoutes.DELETEDATA, data);
  return res;
};
