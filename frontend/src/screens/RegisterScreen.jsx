import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Password } from 'primereact/password';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';
import { classNames } from 'primereact/utils';
import { Avatar } from 'primereact/avatar';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getCountries } from '../utils/getCountries';
import { checkEmail, checkUsername, register } from '../actions/userActions';

import '../styles/formscreen.css';

const RegisterScreen = () => {
	const inputFile = useRef(null);
	const [username, setUsername] = useState('');
	const [file, setFile] = useState('');
	const [image, setImage] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [birthday, setBirthday] = useState('');
	const [country, setCountry] = useState('');
	const [fileError, setFileError] = useState(null);
	const [countries, setCountries] = useState([]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo: userLoginInfo } = userLogin;

	const userEmailExistCheck = useSelector((state) => state.userEmailExistCheck);
	const { isEmailUsed } = userEmailExistCheck;

	const userUsernameExistCheck = useSelector((state) => state.userUsernameExistCheck);
	const { isUsernameUsed } = userUsernameExistCheck;

	useEffect(() => {
		getCountries().then((data) => setCountries(data));
		if (userLoginInfo) {
			navigate('/');
		}
	}, [navigate, userLoginInfo]);

	useEffect(() => {
		if (userInfo && userInfo._id) {
			navigate(`/confirm/${userInfo._id}`);
		}
	}, [navigate, userInfo]);

	const header = <h6>Pick a password</h6>;
	const footer = (
		<React.Fragment>
			<Divider />
			<p className='mt-2'>Suggestions</p>
			<ul className='pl-2 ml-2 mt-0' style={{ lineHeight: '1.5' }}>
				<li>At least one lowercase</li>
				<li>At least one uppercase</li>
				<li>At least one numeric</li>
				<li>Minimum 8 characters</li>
			</ul>
		</React.Fragment>
	);

	const imagePicked = (e) => {
		e.preventDefault();
		setFileError(null);
		const selectedImage = e.target.files[0];
		setFile(selectedImage);
		const reader = new FileReader();
		reader.onload = () => {
			setImage(reader.result);
		};
		reader.readAsDataURL(selectedImage);
	};

	const monthNavigatorTemplate = (e) => {
		return (
			<Dropdown
				value={e.value}
				options={e.options}
				onChange={(event) => e.onChange(event.originalEvent, event.value)}
				style={{ lineHeight: 1 }}
			/>
		);
	};

	const yearNavigatorTemplate = (e) => {
		return (
			<Dropdown
				value={e.value}
				options={e.options}
				onChange={(event) => e.onChange(event.originalEvent, event.value)}
				className='ml-2'
				style={{ lineHeight: 1 }}
			/>
		);
	};

	const onRegisterFormSubmit = (e) => {
		e.preventDefault();
		if (!file) {
			setFileError('Please select profile picture');
		} else {
			if (!isEmailUsed && !isUsernameUsed) {
				dispatch(
					register(
						username,
						email,
						password,
						file,
						birthday ? dayjs(birthday).format('YYYY/DD/MM') : '',
						country,
					),
				);
			}
		}
	};

	const onUsernameChange = (e) => {
		setUsername(e.target.value);
		if (e.target.value) {
			dispatch(checkUsername(e.target.value));
		}
	};

	const onEmailChange = (e) => {
		setEmail(e.target.value);
		if (e.target.value) {
			dispatch(checkEmail(e.target.value));
		}
	};

	return (
		<div className='full-screen flex align-items-center justify-content-center'>
			<div className='mid-form shadow-2'>
				<div className='text-center text-4xl font-bold text-black-alpha-60'>Register</div>
				{error && <Message severity='error' text={error} className='w-full my-3' />}
				{loading ? (
					<div className='text-center my-4'>
						<ProgressSpinner />
					</div>
				) : (
					<form onSubmit={onRegisterFormSubmit}>
						{image && (
							<div className='w-full text-center mt-3'>
								<Avatar
									image={image}
									shape='circle'
									style={{ height: '5rem', width: '5rem',objectFit: 'fill' }}
								/>
							</div>
						)}
						<div className='p-float-label my-3'>
							<input
								id='image'
								ref={inputFile}
								type='file'
								accept='image/*'
								style={{ display: 'none' }}
								onChange={imagePicked}
							/>
							{/* <label htmlFor='image'>Profile*</label> */}
							<Button
								className='w-full p-button-sm p-button-outlined p-button-success'
								label='Choose Image'
								type='button'
								onClick={() => inputFile.current.click()}
							/>
							{fileError && <small style={{ color: 'red' }}>{fileError}</small>}
						</div>
						<div className='p-float-label my-4'>
							<InputText
								id='username'
								value={username}
								onChange={onUsernameChange}
								className={classNames(
									{ 'p-invalid': isUsernameUsed },
									'w-full',
									'p-inputtext-sm',
								)}
								required
							/>
							<label htmlFor='username'>Username*</label>
							{isUsernameUsed && (
								<small style={{ color: 'red' }}>Username Already Exist</small>
							)}
						</div>
						<div className='p-float-label my-4'>
							<InputText
								id='email'
								enterKeyHint='next'
								value={email}
								onChange={onEmailChange}
								className={classNames(
									{ 'p-invalid': isEmailUsed },
									'w-full',
									'p-inputtext-sm',
								)}
								required
							/>
							<label htmlFor='email'>Email*</label>
							{isEmailUsed && (
								<small style={{ color: 'red' }}>Email Already Exist</small>
							)}
						</div>
						<div className='p-float-label my-4'>
							<Password
								value={password}
								id='password p-fluid'
								className={classNames({}, 'w-full', 'p-inputtext-sm')}
								onChange={(e) => setPassword(e.target.value)}
								toggleMask
								header={header}
								footer={footer}
								required
							/>
							<label htmlFor='password'>Password*</label>
						</div>
						<div className='p-float-label my-4'>
							<Calendar
								id='birthday'
								dateFormat='dd/mm/yy'
								value={birthday}
								onChange={(e) => setBirthday(e.value)}
								monthNavigator
								monthNavigatorTemplate={monthNavigatorTemplate}
								yearNavigatorTemplate={yearNavigatorTemplate}
								yearNavigator
								yearRange={`${
									new Date().getFullYear() - 50
								}:${new Date().getFullYear()}`}
								className={classNames({}, 'w-full', 'p-inputtext-sm')}
							/>
							<label htmlFor='birthday' className='ml-0'>
								Birthday
							</label>
						</div>
						<div className='p-float-label my-4'>
							<Dropdown
								id='country'
								options={countries}
								optionLabel='name'
								optionValue='name'
								value={country}
								onChange={(e) => setCountry(e.target.value)}
								className={classNames({}, 'w-full', 'p-inputtext-sm')}
							/>
							<label htmlFor='country' className='ml-0'>
								Country
							</label>
						</div>
						<div className='text-center'>
							<Button
								type='submit'
								label='Proceed'
								className='p-button-sm p-button-success'
							/>
						</div>
						<Divider align='center'>
							{/* <span className='p-tag p-tag-warning'>OR</span> */}
							<small className='text-black-alpha-40'>OR</small>
						</Divider>
						<div className='text-center'>
							<Link
								to='/login'
								className='no-underline'
								style={{ color: 'var(--primary-color)' }}
							>
								Already Have an Account?
							</Link>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default RegisterScreen;
