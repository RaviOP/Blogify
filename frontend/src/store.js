import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	userConfirmAccountReducer,
	userDeleteReducer,
	userEmailExistCheckReducer,
	userInactiveDetailsReducer,
	userListReducer,
	userLoginReducer,
	userProfileDeleteReducer,
	userProfileDetailReducer,
	userProfileUpdateReducer,
	userRegisterReducer,
	userUpdatePasswordReducer,
	userUpdateReducer,
	userUsernameExistCheckReducer,
} from './reducers/userReducers';
import { headlinesListReducer, newsListReducer } from './reducers/newsReducers';
import {
	categoryCheckNameReducer,
	categoryCreateReducer,
	categoryDeleteReducer,
	categoryListAllReducer,
	categoryListReducer,
	categoryUpdateReducer,
} from './reducers/categoryReducers';
import { articleCreateReducer, articleListReducer } from './reducers/articleReducer';

const reducers = combineReducers({
	userRegister: userRegisterReducer,
	userLogin: userLoginReducer,
	userConfirmAccount: userConfirmAccountReducer,
	userInactiveDetails: userInactiveDetailsReducer,
	userEmailExistCheck: userEmailExistCheckReducer,
	userUsernameExistCheck: userUsernameExistCheckReducer,
	userList: userListReducer,
	userUpdate: userUpdateReducer,
	userDelete: userDeleteReducer,
	userProfileDetail: userProfileDetailReducer,
	userProfileUpdate: userProfileUpdateReducer,
	userProfileDelete: userProfileDeleteReducer,
	userUpdatePassword: userUpdatePasswordReducer,
	newsList: newsListReducer,
	headlinesList: headlinesListReducer,
	categoryList: categoryListReducer,
	categoryCreate: categoryCreateReducer,
	categoryCheckName: categoryCheckNameReducer,
	categoryUpdate: categoryUpdateReducer,
	categoryDelete: categoryDeleteReducer,
	categoryListAll: categoryListAllReducer,
	articleList: articleListReducer,
	articleCreate: articleCreateReducer,
});

const userInfoFromStorage = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: null;

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

let store = createStore(reducers, initialState, compose(applyMiddleware(...middleware)));
if (process.env.NODE_ENV === 'development') {
	store = createStore(
		reducers,
		initialState,
		composeWithDevTools(applyMiddleware(...middleware)),
	);
}
export default store;
