import { create, read } from "./localstorage";
const dataName = "apiData";

export const getData = async () => {
  try {
    const response = await new Promise((resolve) => {
      const data = read(dataName);
      const tempData = [];
      data.forEach((ele) => {
        const existing = tempData.find((item) => item.email === ele.email);
        if (!existing) {
          tempData.push(ele);
        }
      });
      setTimeout(() => {
        resolve({ data: tempData });
      }, 500);
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getDataByEmail = async (email) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const data = read(dataName);
      const existing = data.filter((item) => item.email === email);
      const user = data.find((item) => item.email === email);
      setTimeout(() => {
        if (!user) {
          reject({ data: { error: "No data found for the given email" } });
          return;
        } else {
          resolve({ data: { ...user, payments: existing } });
        }
      }, 1000);
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createData = async (data) => {
  try {
    const response = await new Promise((resolve) => {
      const createData = create(dataName, data);
      setTimeout(() => {
        resolve({ data: createData });
      }, 1000);
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
