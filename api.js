// api.js
import axiosInstance from "./axiosInstance"; // 导入封装好的 Axios 实例

export async function fetchData() {
  try {
    const response = await axiosInstance.get("/data");
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // 抛出错误，以便在调用方处理
  }
}
