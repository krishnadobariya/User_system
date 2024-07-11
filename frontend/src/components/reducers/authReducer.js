const initialState = {
    user: null,
    loading: false,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload,
          loading: false,
          error: null,
        };
      case 'LOGIN_FAIL':
        return {
          ...state,
          user: null,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;