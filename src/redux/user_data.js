const initialState = {
    client_id: 0,
    user_name: '',
    user_email: '',
    user_password: '',
    business_name: '',
    business_address: '',
    mobile_number: '',
    gst_number: '',
  };
  
  const user_data = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, ...action.payload };
      case 'RESET_USER':
        return initialState;
      default:
        return state;
    }
  };
  
  export default user_data;
  