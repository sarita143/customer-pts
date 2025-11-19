export const initialState = {
  dashboardData: [],
  customerData: null,
  loading: false,
  error: null,
};

export const actionTypes = {
  FETCH_START: 'FETCH_START',
  FETCH_DASHBOARD_SUCCESS: 'FETCH_DASHBOARD_SUCCESS',
  FETCH_CUSTOMER_SUCCESS: 'FETCH_CUSTOMER_SUCCESS',
  CREATE_PAYMENT_SUCCESS: 'CREATE_PAYMENT_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  RESET_ERROR: 'RESET_ERROR',
  CLEAR_CUSTOMER_DATA: 'CLEAR_CUSTOMER_DATA',
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FETCH_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboardData: action.payload,
        loading: false,
        error: null,
      };

    case actionTypes.FETCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        customerData: action.payload,
        loading: false,
        error: null,
      };

    case actionTypes.CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        dashboardData: action.payload,
        loading: false,
        error: null,
      };

    case actionTypes.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actionTypes.RESET_ERROR:
      return {
        ...state,
        error: null,
      };

    case actionTypes.CLEAR_CUSTOMER_DATA:
      return {
        ...state,
        customerData: null,
      };

    default:
      return state;
  }
};
