import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL, TOP_FIVE_PRODUCT_LIST_REQUEST, TOP_FIVE_PRODUCT_LIST_SUCCESS, TOP_FIVE_PRODUCT_LIST_FAIL, TODAY_SALE_FAIL, TODAY_SALE_REQUEST, TODAY_SALE_SUCCESS } from '../constants/product'

export const productListReducer = (state = { products: [] }, action) => {
        switch (action.type) {
          case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
          case PRODUCT_LIST_SUCCESS:
            return {
              loading: false,
              products: action.payload,
              
            }
          case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
          default:
            return state
        }
}

export const topFiveListReducer = (state = { topFiveProducts: [] }, action) => {
    switch (action.type) {
      case TOP_FIVE_PRODUCT_LIST_REQUEST:
        return { loading: true, topFiveProducts: [] }
      case TOP_FIVE_PRODUCT_LIST_SUCCESS:
        return {
          loading: false,
          topFiveProducts: action.payload,
        }
      case TOP_FIVE_PRODUCT_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
}

export const todaySalesReducer = (state = { totalAmount: [] }, action) => {
    switch (action.type) {
      case TODAY_SALE_REQUEST:
        return { loading: true, totalAmount: [] }
      case TODAY_SALE_SUCCESS:
        return {
          loading: false,
          totalAmount: action.payload,
        }
      case TODAY_SALE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
}