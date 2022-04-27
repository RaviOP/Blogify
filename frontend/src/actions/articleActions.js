import axios from "axios";
import { ARTICLE_CREATE_FAIL, ARTICLE_CREATE_REQUEST, ARTICLE_CREATE_SUCCESS, ARTICLE_LIST_FAIL, ARTICLE_LIST_REQUEST, ARTICLE_LIST_SUCCESS } from "../constants/articleConstant";

export const getArticleList = (keyword) => async (dispatch, getState) => {
	try {
		dispatch({ type: ARTICLE_LIST_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_BASE_URL}/api/articles?keyword=${keyword}`,
			config,
		);
		dispatch({ type: ARTICLE_LIST_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: ARTICLE_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const createArticle = (heading,description,content,file,category) => async (dispatch, getState) => {
	try {
		dispatch({ type: ARTICLE_CREATE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-Type': 'multipart/form-data',
			},
		};
        const formdata = new FormData();
		formdata.append('heading', heading);
		formdata.append('description', description);
		formdata.append('content',content);
		formdata.append('image', file);
		formdata.append('category', category);
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_BASE_URL}/api/articles`,
			formdata,
			config,
		);
		dispatch({ type: ARTICLE_CREATE_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: ARTICLE_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};
