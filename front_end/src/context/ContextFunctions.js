import axios, { reloadToken } from "../services/axios";

export const logout = (dispatch) => async () => {
  reloadToken("", true);
  dispatch({
    type: "AUTHENTICATE_USER",
    payload: { isAuthenticated: false },
  });
};

export const login = (dispatch) => async (formData) => {
  try {
    const res = await axios.get("/login", { params: formData });
    if (res.data.status === "success") {
      reloadToken(res.data.body.token, formData.shouldRemeber);

      dispatch({
        type: "AUTHENTICATE_USER",
        payload: { isAuthenticated: true },
      });
    }
  } catch (e) {
    if (e.response && e.response.data) {
      return JSON.parse(e.response.data.err);
    }
  }
};
export const register = (dispatch) => async (formData) => {
  try {
    const res = await axios.post("/register", formData);
    if (res.data.status === "success") {
      reloadToken(res.data.body.token, true);

      dispatch({
        type: "AUTHENTICATE_USER",
        payload: { isAuthenticated: true },
      });
    }
    return false;
  } catch (e) {
    if (e.response && e.response.data) {
      return JSON.parse(e.response.data.err);
    }
  }
};

export const loadImages = (dispatch) => async () => {
  try {
    const res = await axios.get("/images");
    if (res.data.status === "success") {
      const images = res.data.body.images;

      dispatch({
        type: "ADD_IMAGES",
        payload: { images },
      });
    }
    return false;
  } catch (e) {
    console.log(e);
    if (e.response && e.response.data) {
      return JSON.parse(e.response.data.err);
    }
  }
};
export const addImage = (dispatch) => async (data) => {
  try {
    const res = await axios.post("/image", data);
    if (res.data.status === "success") {
      data._id = res.data.body._id;
      dispatch({
        type: "ADD_IMAGES",
        payload: { images: [data] },
      });
    }
    return false;
  } catch (e) {
    if (e.response && e.response.data) {
      return JSON.parse(e.response.data.err);
    }
    console.log(e);
  }
};

export const deleteImage = (dispatch) => async (imageId) => {
  try {
    const res = await axios.delete("/image", { params: { imageId } });
    if (res.data.status === "success") {
      dispatch({
        type: "DELETE_IMAGE",
        payload: { imageId },
      });
    }
    return false;
  } catch (e) {
    if (e.response && e.response.data) {
      return JSON.parse(e.response.data.err);
    }
    console.log(e);
  }
};
