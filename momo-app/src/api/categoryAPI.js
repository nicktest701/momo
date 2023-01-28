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

export const getCategory = async (id) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/category/${id}`,
      method: "GET",
      timeout: "10000",
      timeoutErrorMessage: "Could not connect to server.Plase try again later",
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

///
export const editCategory = async (updatedCategory) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/category`,
      method: "PUT",
      data: updatedCategory,
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

///DELETE CATEGORY
export const deleteCategory = async (id) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/category`,
      method: "DELETE",
      params: {
        id,
      },
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
