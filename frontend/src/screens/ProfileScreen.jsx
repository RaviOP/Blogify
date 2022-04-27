import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	checkUsername,
	deleteCurrentUser,
	getCurrentUser,
	logout,
	updateCurrentUser,
} from '../actions/userActions';
import { USER_PROFILE_UPDATE_SUCCESS } from '../constants/userConstants';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { confirmDialog } from 'primereact/confirmdialog';
import { MultiSelect } from 'primereact/multiselect';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { getCountries } from '../utils/getCountries';
import { Button } from 'primereact/button';
import '../styles/formscreen.css';
import { listCategories } from '../actions/categoryActions';

const ProfileScreen = () => {
	const toast = useRef(null);
	const [username, setUsername] = useState('');
	const [birthday, setBirthday] = useState('');
	const [country, setCountry] = useState('');
	const [countries, setCountries] = useState([]);
	const [interested, setInterested] = useState([]);
	const [updateMessage, setUpdateMessage] = useState('');
	const [usernameError, setUsernameError] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUsernameExistCheck = useSelector((state) => state.userUsernameExistCheck);
	const { isUsernameUsed } = userUsernameExistCheck;

	const { loading, user, error } = useSelector((state) => state.userProfileDetail);
	const {
		loading: updateLoading,
		error: updateError,
		user: updatedUser,
	} = useSelector((state) => state.userProfileUpdate);

	const { categories } = useSelector((state) => state.categoryListAll);

	useEffect(() => {
		if (!userInfo) {
			navigate('/login');
		}
	}, [navigate, userInfo]);

	if (updateMessage) {
		setTimeout(() => {
			setUpdateMessage('');
		}, 2000);
	}

	useEffect(() => {
		getCountries().then((data) => setCountries(data));
	}, []);

	useEffect(() => {
		dispatch(listCategories());
  }, [dispatch]);
  
  useEffect(() => {
dispatch(getCurrentUser());
  },[dispatch])

	useEffect(() => {
		if (user && user.username) {
			setUsername(user.username);
			setBirthday(user.birthday ? new Date(user.birthday) : '');
			setCountry(user.country);
			setInterested(user.interested.map((interest) => interest._id));
		}
	}, [user]);

	useEffect(() => {
		if (updatedUser) {
			toast.current.show({
				severity: 'success',
				summary: 'Profile Updated',
				detail: 'Successfully Updated Profile',
			});
			dispatch(getCurrentUser());
			dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: null });
		}
	}, [dispatch, updatedUser]);

	const updateProfileHandler = (e) => {
		// Dispatch Update Profile
		if (username) {
			dispatch(updateCurrentUser(username, birthday, country, interested));
		} else {
			setUsernameError(true);
		}
	};

	const deleteHandler = (e) => {
		e.preventDefault();
		confirmDialog({
			message: 'Are you sure. Do You want to Delete your Account??',
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				dispatch(deleteCurrentUser());
				dispatch(logout());
				navigate('/register');
			},
		});
	};

	const onUsernameChange = (e) => {
		setUsername(e.target.value);
		setUsernameError(false);
		if (e.target.value && e.target.value !== user.username) {
			dispatch(checkUsername(e.target.value));
		}
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

	return (
		<div className='full-screen flex align-items-center justify-content-center'>
			<div className='mid-form shadow-2'>
				<Toast ref={toast} />
				<div className='text-center text-4xl font-bold text-black-alpha-60'>
					Your Profile
				</div>
				{(error || updateError) && (
					<Message severity='error' text={error || updateError} className='w-full my-3' />
				)}
				{loading || updateLoading ? (
					<div className='text-center my-4'>
						<ProgressSpinner />
					</div>
				) : (
					<>
						{user && user.profile && (
							<div className='w-full text-center mt-3'>
								<Avatar
									image={`${process.env.REACT_APP_API_BASE_URL}/${user.profile}`}
									shape='circle'
									style={{ height: '5rem', width: '5rem', objectFit: 'fill' }}
								/>
							</div>
						)}
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
							<label htmlFor='username'>Username</label>
							{isUsernameUsed && (
								<small style={{ color: 'red' }}>Username Already Exist</small>
							)}
							{usernameError && (
								<small style={{ color: 'red' }}>Username is required</small>
							)}
						</div>
						<div className='p-float-label my-4'>
							<InputText
								id='email'
								enterKeyHint='next'
								value={user && user.email}
								className={classNames('w-full', 'p-inputtext-sm')}
								disabled
							/>
							<label htmlFor='email'>Email</label>
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
						<div className='p-float-label my-4'>
							<MultiSelect
								id='categories'
								options={categories}
								optionLabel='name'
								optionValue='_id'
								value={interested}
								onChange={(e) => setInterested(e.target.value)}
								className={classNames({}, 'w-full', 'p-inputtext-sm')}
							/>
							<label htmlFor='categories' className='ml-0'>
								Categories
							</label>
						</div>
						<div className='text-center'>
							<Button
								type='button'
								onClick={deleteHandler}
								label='Delete Account'
								className='p-button-sm p-button-danger mr-1'
							/>
							<Button
								type='button'
								onClick={updateProfileHandler}
								label='Update Account'
								className='p-button-sm p-button-success ml-1'
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ProfileScreen;
