import {
	CATEGORY_CREATE_FAIL,
	CATEGORY_CREATE_REQUEST,
	CATEGORY_CREATE_SUCCESS,
	CATEGORY_DELETE_FAIL,
	CATEGORY_DELETE_REQUEST,
	CATEGORY_DELETE_SUCCESS,
	CATEGORY_LIST_ALL_FAIL,
	CATEGORY_LIST_ALL_REQUEST,
	CATEGORY_LIST_ALL_SUCCESS,
	CATEGORY_LIST_FAIL,
	CATEGORY_LIST_REQUEST,
	CATEGORY_LIST_SUCCESS,
	CATEGORY_NAME_EXIST_CHECK,
	CATEGORY_UPDATE_FAIL,
	CATEGORY_UPDATE_REQUEST,
	CATEGORY_UPDATE_SUCCESS,
} from '../constants/categoryConstant';

export const categoryListReducer = (state = { categories: [] }, action) => {
	switch (action.type) {
		case CATEGORY_LIST_REQUEST:
			return { loading: true };
		case CATEGORY_LIST_SUCCESS:
			return { loading: false, categories: action.payload };
		case CATEGORY_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const categoryCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case CATEGORY_CREATE_REQUEST:
			return { loading: true };
		case CATEGORY_CREATE_SUCCESS:
			return { loading: false, category: action.payload };
		case CATEGORY_CREATE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const categoryCheckNameReducer = (state = {isNameUsed: false}, action) => {
	switch (action.type) {
		case CATEGORY_NAME_EXIST_CHECK:
			return {  isNameUsed: action.payload };
		default:
			return state;
	}
};

export const categoryUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case CATEGORY_UPDATE_REQUEST:
			return { loading: true };
		case CATEGORY_UPDATE_SUCCESS:
			return { loading: false, category: action.payload };
		case CATEGORY_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const categoryDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case CATEGORY_DELETE_REQUEST:
			return { loading: true };
		case CATEGORY_DELETE_SUCCESS:
			return { loading: false, category: action.payload };
		case CATEGORY_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const categoryListAllReducer = (state = { categories: [] }, action) => {
	switch (action.type) {
		case CATEGORY_LIST_ALL_REQUEST:
			return { loading: true };
		case CATEGORY_LIST_ALL_SUCCESS:
			return { loading: false, categories: action.payload };
		case CATEGORY_LIST_ALL_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};