import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';

import '../styles/formscreen.css';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../actions/userActions';
import { Divider } from 'primereact/divider';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, userInfo, error } = userLogin;

	useEffect(() => {
		if (userInfo && userInfo._id) {
			navigate('/');
		}
	}, [navigate, userInfo]);

	const onLoginFormSubmit = (e) => {
		e.preventDefault();
		dispatch(login(email,password))
	};

	return (
		<div className='full-screen flex align-items-center justify-content-center'>
			<div className='mid-form shadow-2'>
				<div className='text-center text-4xl font-bold text-black-alpha-60'>Login</div>
				{error && <Message severity='error' text={error} className='w-full my-3' />}
				{loading ? (
					<div className='text-center my-4'>
						<ProgressSpinner />
					</div>
				) : (
					<form onSubmit={onLoginFormSubmit}>
						<div className='p-float-label my-4'>
							<InputText
								id='username'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={classNames({}, 'w-full', 'p-inputtext-sm')}
								required
							/>
							<label htmlFor='username'>Username/Email</label>
						</div>
						<div className='p-float-label my-4'>
							<Password
								value={password}
								id='password p-fluid'
								className={classNames({}, 'w-full', 'p-inputtext-sm')}
								onChange={(e) => setPassword(e.target.value)}
								toggleMask
								feedback={false}
								required
							/>
							<label htmlFor='password'>Password</label>
						</div>
						<div className='text-center'>
							<Button
								type='submit'
								label='Login'
								className='p-button-sm p-button-success'
							/>
						</div>
						<Divider align='center'>
							{/* <span className='p-tag p-tag-warning'>OR</span> */}
							<small className='text-black-alpha-40'>OR</small>
						</Divider>
						<div className='text-center'>
							<Link
								to='/register'
								className='no-underline'
								style={{ color: 'var(--primary-color)' }}
							>
								Don't Have an Account?
							</Link>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default LoginScreen;
