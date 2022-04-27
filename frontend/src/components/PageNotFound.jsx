import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<div className='full-screen text-center'>
			<img src='/notFound.svg' alt='Page Not Found' height='700px' />
			<div>
				<Link to='/' className='p-button no-underline p-button-sm p-button-help'>
					Go Back
				</Link>
			</div>
		</div>
	);
};

export default PageNotFound;
