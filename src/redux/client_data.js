const initialState = {
    client_id: 0,
    user_name: '',
    user_email: '',
    user_password: '',
  };
  
  const Client_data = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_Client':
        return { ...state, ...action.payload };
      case 'RESET_USER_Client':
        return initialState;
      default:
        return state;
    }
  };
  
  export default Client_data;
  