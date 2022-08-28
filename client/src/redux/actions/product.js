import axios from "axios";

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  TOP_FIVE_PRODUCT_LIST_REQUEST,
  TOP_FIVE_PRODUCT_LIST_SUCCESS,
  TOP_FIVE_PRODUCT_LIST_FAIL,
  TODAY_SALE_FAIL,
  TODAY_SALE_REQUEST,
  TODAY_SALE_SUCCESS,
} from "../constants/product";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("api/v1/product", {}, config);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    console.log("in actions", data);
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTopFiveProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TOP_FIVE_PRODUCT_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      "api/v1/product/getTopFiveSellingProducts",
      {},
      config
    );
    dispatch({ type: TOP_FIVE_PRODUCT_LIST_SUCCESS, payload: data });
    console.log("in actions", data);
  } catch (error) {
    dispatch({
      type: TOP_FIVE_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const todaysSaleAmount = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TODAY_SALE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      "api/v1/product/getTodaySale",
      {},
      config
    );
    dispatch({ type: TODAY_SALE_SUCCESS, payload: data });
    console.log("in actions", data);
  } catch (error) {
    dispatch({
      type: TODAY_SALE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
