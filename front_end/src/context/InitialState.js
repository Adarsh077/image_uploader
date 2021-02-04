const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  images: [],
  addImage: () => {},
  loadImages: () => {},
  deleteImage: () => {},
  login: () => {},
  logout: () => {},
  register: () => {},
};

export default initialState;
