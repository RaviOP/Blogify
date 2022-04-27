import React from 'react';
import PrimeReact from 'primereact/api';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import LoadingComponent from './components/LoadingComponent';
import HomeScreen from './screens/HomeScreen';

import 'primereact/resources/themes/lara-light-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';
import './styles/app.css';


PrimeReact.ripple = true;
PrimeReact.inputStyle = 'filled';

const LoginScreen = React.lazy(() => import('./screens/LoginScreen'));
const RegisterScreen = React.lazy(() => import('./screens/RegisterScreen'))
const NewsScreen = React.lazy(() => import('./screens/NewsScreen'))
const ArticleScreen = React.lazy(() => import('./screens/ArticleScreen'))
const CreateArticleScreen = React.lazy(()=> import('./screens/CreateArticleScreen'))
const ConfirmAccountScreen = React.lazy(() => import('./screens/ConfirmAccountScreen'))
const NotFoundScreen = React.lazy(() => import('./screens/NotFoundScreen'))
const ProfileScreen = React.lazy(() => import('./screens/ProfileScreen'))
const CategoryScreen = React.lazy(()=>import('./screens/CategoryScreen'))
const UsersScreen = React.lazy(()=>import('./screens/UsersScreen'))
const ChangePasswordScreen = React.lazy(()=>import('./screens/ChangePasswordScreen'))
const CreateCategoryScreen = React.lazy(() => import('./screens/CreateCategoryScreen'));

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element={<HomeScreen />} />
				<Route
					path='/login'
					element={
						<React.Suspense fallback={<LoadingComponent />}>
							<LoginScreen />
						</React.Suspense>
					}
				/>
				<Route
					path='/register'
					element={
						<React.Suspense fallback={<LoadingComponent />}>
							<RegisterScreen />
						</React.Suspense>
					}
				/>
				<Route
					path='/news'
					element={
						<React.Suspense fallback={<LoadingComponent />}>
							<NewsScreen />
						</React.Suspense>
					}
				/>
				<Route
					path='/articles'
					element={
						<React.Suspense fallback={<LoadingComponent />}>
							<ArticleScreen />
						</React.Suspense>
					}
				/>
				<Route
					path='/articles/new'
					element={
						<React.Suspense fallback={<LoadingComponent />}>
							<CreateArticleScreen />
						</React.Suspense>
					}
				/>
				<Route
					path='/profile'
					element={
						<React.Suspense fallback={<LoadingComponent />}>
							<ProfileScreen />
						</React.Suspense>
					}
				/>
				<Route
					path='/categories'
					element={
						<React.Suspense fallback={<LoadingComponent />}>
							<CategoryScreen />
						</React.Suspense>
					}
				/>
				<Route
					path='/users'
					element={
						<React.Suspense fallback={<LoadingComponent />}>
							<UsersScreen />
						</React.Suspense>
					}
				/>
				<Route
					path='/categories/new'
					element={
						<React.Suspense fallback={<LoadingComponent />}>
							<CreateCategoryScreen />
						</React.Suspense>
					}
				/>
				<Route
					path='/change-password'
					element={
						<React.Suspense fallback={<LoadingComponent />}>
							<ChangePasswordScreen />
						</React.Suspense>
					}
				/>
				<Route
					path='/confirm/:id'
					element={
						<React.Suspense fallback={<LoadingComponent />}>
							<ConfirmAccountScreen />
						</React.Suspense>
					}
				/>
				<Route
					path='*'
					element={
						<React.Suspense fallback={<LoadingComponent />}>
							<NotFoundScreen />
						</React.Suspense>
					}
				/>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
