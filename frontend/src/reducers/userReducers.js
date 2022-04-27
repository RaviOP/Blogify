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

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};


export const userConfirmAccountReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_CONFIRM_ACCOUNT_REQUEST:
			return { loading: true };
		case USER_CONFIRM_ACCOUNT_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_CONFIRM_ACCOUNT_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userInactiveDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_INACTIVE_DETAILS_REQUEST:
			return { loading: true };
		case USER_INACTIVE_DETAILS_SUCCESS:
			return { loading: false, user: action.payload };
		case USER_INACTIVE_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userEmailExistCheckReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_EMAIL_EXIST_CHECK:
			return { isEmailUsed: action.payload };
		default:
			return state;
	}
}

export const userUsernameExistCheckReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_USERNAME_EXIST_CHECK:
			return { isUsernameUsed: action.payload };
		default:
			return state;
	}
};

export const userListReducer = (state = {users: []}, action) => {
	switch (action.type) {
		case USER_LIST_REQUEST:
			return { loading: true };
		case USER_LIST_SUCCESS:
			return { loading: false, users: action.payload };
		case USER_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_UPDATE_REQUEST:
			return { loading: true };
		case USER_UPDATE_SUCCESS:
			return { loading: false, user: action.payload };
		case USER_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_DELETE_REQUEST:
			return { loading: true };
		case USER_DELETE_SUCCESS:
			return { loading: false, user: action.payload };
		case USER_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userProfileDetailReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_PROFILE_DETAILS_REQUEST:
			return { loading: true };
		case USER_PROFILE_DETAILS_SUCCESS:
			return { loading: false, user: action.payload };
		case USER_PROFILE_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userProfileUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_PROFILE_UPDATE_REQUEST:
			return { loading: true };
		case USER_PROFILE_UPDATE_SUCCESS:
			return { loading: false, user: action.payload };
		case USER_PROFILE_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userProfileDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_PROFILE_DELETE_REQUEST:
			return { loading: true };
		case USER_PROFILE_DELETE_SUCCESS:
			return { loading: false, user: action.payload };
		case USER_PROFILE_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userUpdatePasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_UPDATE_PASSWORD_REQUEST:
			return { loading: true };
		case USER_UPDATE_PASSWORD_SUCCESS:
			return { loading: false, user: action.payload };
		case USER_UPDATE_PASSWORD_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};