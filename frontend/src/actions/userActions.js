import axios from 'axios';
import {
	USER_CONFIRM_ACCOUNT_FAIL,
	USER_CONFIRM_ACCOUNT_REQUEST,
	USER_CONFIRM_ACCOUNT_SUCCESS,
	USER_DELETE_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_EMAIL_EXIST_CHECK,
	USER_INACTIVE_DETAILS_FAIL,
	USER_INACTIVE_DETAILS_REQUEST,
	USER_INACTIVE_DETAILS_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_PROFILE_DELETE_FAIL,
	USER_PROFILE_DELETE_REQUEST,
	USER_PROFILE_DELETE_SUCCESS,
	USER_PROFILE_DETAILS_FAIL,
	USER_PROFILE_DETAILS_REQUEST,
	USER_PROFILE_DETAILS_SUCCESS,
	USER_PROFILE_UPDATE_FAIL,
	USER_PROFILE_UPDATE_REQUEST,
	USER_PROFILE_UPDATE_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_PASSWORD_FAIL,
	USER_UPDATE_PASSWORD_REQUEST,
	USER_UPDATE_PASSWORD_SUCCESS,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_USERNAME_EXIST_CHECK,
} from '../constants/userConstants';

export const login = (username, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });
		const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/login`, {
			username,
			password,
		});
		const response = { ...data.data.user, token: data.data.token };
		dispatch({ type: USER_LOGIN_SUCCESS, payload: response });
		localStorage.setItem('user', JSON.stringify(response));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('user');
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_PROFILE_UPDATE_SUCCESS,payload: null });
	dispatch({ type: USER_PROFILE_DETAILS_SUCCESS,payload: null });
	dispatch({ type: USER_PROFILE_DELETE_SUCCESS,payload: null });
};

export const register =
	(username, email, password, image, birthday, country) => async (dispatch) => {
		try {
			dispatch({ type: USER_REGISTER_REQUEST });
			const formdata = new FormData();
			formdata.append('username', username);
			formdata.append('email', email);
			formdata.append('password', password);
			formdata.append('image', image);
			formdata.append('birthday', birthday);
			formdata.append('country', country);
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};
			const { data } = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/api/users`,
				formdata,
				config,
			);
			dispatch({ type: USER_REGISTER_SUCCESS, payload: data.data.user });
		} catch (error) {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.response,
			});
		}
	};

export const activateUserAccount = (userId, securityCode) => async (dispatch) => {
	try {
		dispatch({ type: USER_CONFIRM_ACCOUNT_REQUEST });
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_BASE_URL}/api/users/activate`,
			{
				userId,
				securityCode,
			},
		);
		const response = { ...data.data.user, token: data.data.token };
		dispatch({ type: USER_CONFIRM_ACCOUNT_SUCCESS, payload: response });
		dispatch({ type: USER_LOGIN_SUCCESS, payload: response });
		localStorage.setItem('user', JSON.stringify(response));
	} catch (error) {
		dispatch({
			type: USER_CONFIRM_ACCOUNT_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const getInactivateUserDetail = (id) => async (dispatch) => {
	try {
		dispatch({
			type: USER_INACTIVE_DETAILS_REQUEST,
		});
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_BASE_URL}/api/users/inactive/${id}`,
		);
		dispatch({
			type: USER_INACTIVE_DETAILS_SUCCESS,
			payload: data.data,
		});
	} catch (error) {
		dispatch({
			type: USER_INACTIVE_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const checkEmail = (email) => async (dispatch) => {
	const { data } = await axios.get(
		`${process.env.REACT_APP_API_BASE_URL}/api/users/email?email=${email}`,
	);
	dispatch({
		type: USER_EMAIL_EXIST_CHECK,
		payload: data.data,
	});
};

export const checkUsername = (username) => async (dispatch) => {
	const { data } = await axios.get(
		`${process.env.REACT_APP_API_BASE_URL}/api/users/username?username=${username}`,
	);
	dispatch({
		type: USER_USERNAME_EXIST_CHECK,
		payload: data.data,
	});
};

export const getAllUsers = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_LIST_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users`, config);
		dispatch({ type: USER_LIST_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const updateUserById = (id, isActive, isAdmin) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const body = { isActive, isAdmin };
		const { data } = await axios.put(
			`${process.env.REACT_APP_API_BASE_URL}/api/users/${id}`,
			body,
			config,
		);
		dispatch({ type: USER_UPDATE_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const deleteUserById = (id)  => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DELETE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_BASE_URL}/api/users/${id}`,
			config,
		);
		dispatch({ type: USER_DELETE_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const updateUserPassword = (password,newPassword) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_PASSWORD_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const body = {
			password,newPassword
		}
		const { data } = await axios.put(
			`${process.env.REACT_APP_API_BASE_URL}/api/users/profile/password`,
			body,
			config
		);
		dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PASSWORD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const getCurrentUser = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_PROFILE_DETAILS_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_BASE_URL}/api/users/profile`,
			config,
		);
		dispatch({ type: USER_PROFILE_DETAILS_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: USER_PROFILE_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const updateCurrentUser =
	(username = '', birthday = '', country = '', interested=[]) =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: USER_PROFILE_UPDATE_REQUEST });
			const { userLogin } = getState();
			const { userInfo } = userLogin;
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};
			const body = { username, birthday,country,interested };
			const { data } = await axios.put(
				`${process.env.REACT_APP_API_BASE_URL}/api/users/profile`,
				body,
				config,
			);
			const response = { ...data.data.user, token: data.data.token };
			dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: data.data.user });
			dispatch({ type: USER_LOGIN_SUCCESS, payload: response });
			localStorage.setItem('user', JSON.stringify(response));
		} catch (error) {
			dispatch({
				type: USER_PROFILE_UPDATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.response,
			});
		}
	};

export const deleteCurrentUser = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_PROFILE_DELETE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_BASE_URL}/api/users/profile`,
			config,
		);
		dispatch({ type: USER_PROFILE_DELETE_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: USER_PROFILE_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};


