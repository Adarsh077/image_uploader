import initialState from "./InitialState";

const AppReducer = (state, action) => {
  switch (action.type) {
    case "AUTHENTICATE_USER":
      if (!action.payload.isAuthenticated) return initialState;
      return {
        ...state,
        isAuthenticated: true,
      };

    case "ADD_IMAGES":
      return {
        ...state,
        images: [...state.images, ...action.payload.images],
      };

    case "DELETE_IMAGE":
      const imageIdx = state.images.findIndex(
        (image) => image._id === action.payload.imageId
      );

      const images = state.images.slice();
      images.splice(imageIdx, 1);
      return { ...state, images };

    default:
      return state;
  }
};

export default AppReducer;