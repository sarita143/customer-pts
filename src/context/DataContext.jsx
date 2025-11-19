import React, { useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from './DataContextDefinition';
import { getData, getDataByEmail, createData as apiCreateData } from '../utils/apiCall';
import { dataReducer, initialState, actionTypes } from './dataReducer';

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const fetchDashboardData = useCallback(async () => {
    try {
      dispatch({ type: actionTypes.FETCH_START });
      const res = await getData();
      dispatch({ type: actionTypes.FETCH_DASHBOARD_SUCCESS, payload: res });
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_ERROR,
        payload: err.message || 'Failed to fetch dashboard data',
      });
      throw err;
    }
  }, []);

  const fetchCustomerData = useCallback(async (email) => {
    try {
      dispatch({ type: actionTypes.FETCH_START });
      const res = await getDataByEmail(email);
      dispatch({ type: actionTypes.FETCH_CUSTOMER_SUCCESS, payload: res });
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_ERROR,
        payload: err?.data?.error || 'Failed to fetch customer data',
      });
      throw err;
    }
  }, []);

  const createPayment = useCallback(async (paymentData) => {
    try {
      dispatch({ type: actionTypes.FETCH_START });
      const res = await apiCreateData(paymentData);
      const updatedData = await getData();
      dispatch({ type: actionTypes.CREATE_PAYMENT_SUCCESS, payload: updatedData });
      return res;
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_ERROR,
        payload: err.message || 'Failed to create payment',
      });
      throw err;
    }
  }, []);

  const value = {
    dashboardData: state.dashboardData,
    customerData: state.customerData,
    loading: state.loading,
    error: state.error,
    fetchDashboardData,
    fetchCustomerData,
    createPayment,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
