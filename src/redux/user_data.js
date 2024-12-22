const initialState = {
    client_id: 0,
    user_name: '',
    user_email: '',
    user_password: '',
    business_name: '',
    business_address: '',
    mobile_number: '',
    gst_number: '',
    user_Status: '',
    admin_message: '',
    set_status_by_admin: '',
  };
  
  const user_data = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_Owner':
        return { ...state, ...action.payload };
      case 'RESET_USER_Owner':
        return initialState;
      default:
        return state;
    }
  };
  
  export default user_data;
  