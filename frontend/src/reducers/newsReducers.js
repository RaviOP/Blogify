import { HEADLINES_LIST_FAIL, HEADLINES_LIST_REQUEST, HEADLINES_LIST_SUCCESS, NEWS_LIST_FAIL, NEWS_LIST_REQUEST, NEWS_LIST_SUCCESS } from '../constants/newsConstants';

export const newsListReducer = (state = { news: [], count: 0 }, action) => {
	switch (action.type) {
		case NEWS_LIST_REQUEST:
			return { loading: true };
		case NEWS_LIST_SUCCESS:
			return { loading: false, news: action.payload.news, count: action.payload.count };
		case NEWS_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const headlinesListReducer = (state = { headlines: [], count: 0 }, action) => {
	switch (action.type) {
		case HEADLINES_LIST_REQUEST:
			return { loading: true };
		case HEADLINES_LIST_SUCCESS:
			return { loading: false, headlines: action.payload.headlines, count: action.payload.count };
		case HEADLINES_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};