import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_LOCAL;

export const getAllVouchersCategory = async (category) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/category`,
      method: "GET",
      timeout: "10000",
      timeoutErrorMessage: "Could not connect to server.Plase try again later",
      params: {
        category,
      },
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

///
export const postCategory = async (newCategory) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/category`,
      method: "POST",
      data: newCategory,
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
