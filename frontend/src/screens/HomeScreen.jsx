import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/screen.css';

const HomeScreen = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const navigate = useNavigate()

	useEffect(() => {
		if (userInfo && userInfo._id) {
			navigate('/news')
		}
	},[navigate, userInfo])

	return (
		<div className='full-screen'>
			<div>
				<div className='container flex'>
					<div className='col-12 full-screen flex flex-column align-items-center justify-content-center'>
						<div className='text-center'>
							<img src='/Logo.png' alt='Logo' style={{height: '5rem'}} />
						</div>
						<div
							style={{ fontSize: '1.5rem', fontWeight: '500' }}
							className='text-black-alpha-40'
						>
							OpenSource Articles Management App with Latest News Accessibility
						</div>
						<div className='flex flex-column justify-content-center mt-2 text-black-alpha-60'>
							<div className='p-button p-button-outlined p-button-sm'>
								<Link
									to='/login'
									className='no-underline'
									style={{ color: 'var(--info-color)' }}
								>
									Login to Get Started
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeScreen;
