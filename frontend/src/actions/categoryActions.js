import axios from 'axios';
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

export const getCategoryList = () => async (dispatch, getState) => {
	try {
		dispatch({ type: CATEGORY_LIST_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_BASE_URL}/api/categories`,
			config,
		);
		dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: CATEGORY_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const createCategory = (name) => async (dispatch, getState) => {
	try {
		dispatch({ type: CATEGORY_CREATE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_BASE_URL}/api/categories`,
			{ name },
			config,
		);
		dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: CATEGORY_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const checkCategoryName = (name) => async (dispatch, getState) => {
	const { userLogin } = getState();
	const { userInfo } = userLogin;
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	};
	const { data } = await axios.get(
		`${process.env.REACT_APP_API_BASE_URL}/api/categories/name?name=${name}`,
		config,
	);
	dispatch({ type: CATEGORY_NAME_EXIST_CHECK, payload: data.data });
};

export const updateCategory = (id,name) => async (dispatch, getState) => {
	try {
		dispatch({ type: CATEGORY_UPDATE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.put(
			`${process.env.REACT_APP_API_BASE_URL}/api/categories/${id}`,
			{ name },
			config,
		);
		dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: CATEGORY_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};


export const deleteCategory = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: CATEGORY_DELETE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_BASE_URL}/api/categories/${id}`,
			config,
		);
		dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: CATEGORY_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const listCategories = () => async (dispatch, getState) => {
	try {
		dispatch({ type: CATEGORY_LIST_ALL_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_BASE_URL}/api/categories/list`,
			config,
		);
		dispatch({ type: CATEGORY_LIST_ALL_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: CATEGORY_LIST_ALL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};