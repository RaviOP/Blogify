import axios from "axios";
import { HEADLINES_LIST_FAIL, HEADLINES_LIST_REQUEST, HEADLINES_LIST_SUCCESS, NEWS_LIST_FAIL, NEWS_LIST_REQUEST, NEWS_LIST_SUCCESS } from "../constants/newsConstants";

export const getNewsList = (keyword,pageSize,page,searchIn,sortBy) => async (dispatch) => {
	try {
        dispatch({ type: NEWS_LIST_REQUEST });
        const config = {
			headers: {
				'X-Api-Key': process.env.REACT_APP_NEWS_API_KEY,
			},
        };
        const query = `q=${keyword}&pageSize=${pageSize}&page=${page}&searchIn=${searchIn}&sortBy=${sortBy}`;
        const { data } = await axios.get(`${process.env.REACT_APP_NEWS_BASE_URL}/everything?${query}`,config);
        dispatch({ type: NEWS_LIST_SUCCESS, payload: { news: data.articles, count: data.totalResults } });
	} catch (error) {
		dispatch({
			type: NEWS_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const getHeadlinesList = (pageSize, page) => async (dispatch) => {
	try {
		dispatch({ type: HEADLINES_LIST_REQUEST });
		const config = {
			headers: {
				'X-Api-Key': process.env.REACT_APP_NEWS_API_KEY,
			},
		};
		const query = `pageSize=${pageSize}&page=${page}&country=in`;
		const { data } = await axios.get(
			`${process.env.REACT_APP_NEWS_BASE_URL}/top-headlines?${query}`,
			config,
		);
		dispatch({
			type: HEADLINES_LIST_SUCCESS,
			payload: { headlines: data.articles, count: data.totalResults },
		});
	} catch (error) {
		dispatch({
			type: HEADLINES_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};