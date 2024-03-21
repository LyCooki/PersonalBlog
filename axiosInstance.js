// axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.example.com", // 设置请求的基础路径
  timeout: 5000, // 设置请求超时时间
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做一些处理，例如显示 loading 状态
    return config;
  },
  (error) => {
    // 对请求错误做些什么，例如打印错误日志
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // 对响应数据做一些处理，例如解析返回的数据
    return response.data;
  },
  (error) => {
    // 对响应错误做些什么，例如显示错误信息
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default instance;
