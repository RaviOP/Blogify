import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import { logout } from '../actions/userActions';

import '../styles/header.css';
import CustomLink from './CustomLink';
import { classNames } from 'primereact/utils';

const Header = () => {
	const [avatarRoutes, setAvatarRoutes] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		const avatarRoutes = ['/profile'];
		if (avatarRoutes.includes(window.location.pathname)) {
			setAvatarRoutes(true);
		} else {
			setAvatarRoutes(false);
		}
	}, [window.location.pathname]); //eslint-disable-line

	const onLogoClick = () => {
		navigate('/');
	};

	const logoutClickHandler = () => {
		dispatch(logout());
	};
	return (
		<div className='header'>
			<div className='container'>
				<div className='flex align-items-center' style={{ height: '7vh' }}>
					<div className='flex-1'>
						<div>
							<img
								className='cursor-pointer'
								onClick={onLogoClick}
								src='/Logo.png'
								alt='Blogify'
								style={{ height: '3.5rem', background: 'white' }}
							/>
						</div>
					</div>
					<div className='flex align-items-center'>
						{!userInfo && (
							<>
								<CustomLink to='/' className='navbar-link'>
									<span>Home</span>
								</CustomLink>
								<CustomLink to='/login' className='navbar-link'>
									<span>Login</span>
								</CustomLink>
								<CustomLink to='/register' className='navbar-link'>
									<span>Register</span>
								</CustomLink>
							</>
						)}
						{userInfo && (
							<>
								<CustomLink to='/news' className='navbar-link'>
									<span>News</span>
								</CustomLink>
								<CustomLink to='/articles' className='navbar-link'>
									<span>Articles</span>
								</CustomLink>
								{userInfo.isAdmin && (
									<>
										<CustomLink to='/categories' className='navbar-link'>
											<span>Category</span>
										</CustomLink>
										<CustomLink to='/users' className='navbar-link'>
											<span>Users</span>
										</CustomLink>
									</>
								)}
								<div className='dropdown navbar-link'>
									<div>
										<Avatar
											className={classNames(
												{ 'border-primary border-2': avatarRoutes },
												'cursor-pointer',
												'border-1',
											)}
											image={`${process.env.REACT_APP_API_BASE_URL}/${userInfo.profile}`}
											shape='circle'
											size='large'
										/>
									</div>
									<div className='dropdown-content'>
										<div className='dropdown-child'>
											<CustomLink to='/profile' className='navbar-link'>
												<span>Profile</span>
											</CustomLink>
										</div>
										<div className='dropdown-child'>
											<CustomLink
												to='/change-password'
												className='navbar-link'
											>
												<span>Change Password</span>
											</CustomLink>
										</div>
										<div className='dropdown-child'>
											<div
												className='navbar-link cursor-pointer'
												onClick={logoutClickHandler}
											>
												<span>Logout</span>
											</div>
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
