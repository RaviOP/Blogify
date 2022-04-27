import React from 'react';

const Footer = () => {

	return (
		<div className='footer' style={{ backgroundColor: 'black', height: '4vh' }}>
			<div className='w-full flex align-items-center justify-content-center h-full'>
				{/* eslint-disable-next-line react/jsx-no-target-blank*/}
				<a
					href='https://github.com/RaviOP'
					target='_blank'
					style={{ textDecoration: 'none' }}
					className='mx-2'
				>
					<i className='pi pi-github' style={{ color: 'white', fontSize: '20px' }}></i>
				</a>
				{/* eslint-disable-next-line react/jsx-no-target-blank*/}
				<a
					href='https://www.linkedin.com/in/ravikumar-baniya-0644391a8/'
					target='_blank'
					style={{ textDecoration: 'none' }}
					className='mx-2'
				>
					<i className='pi pi-linkedin' style={{ color: 'white', fontSize: '20px' }}></i>
				</a>
			</div>
		</div>
	);
};

export default Footer;
