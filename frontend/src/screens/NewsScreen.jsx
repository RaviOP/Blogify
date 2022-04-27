import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import Headlines from '../components/Headlines';
import News from '../components/News';

import '../styles/screen.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const NewsScreen = () => {

	const [keyword, setKeyword] = useState('Technology');
	const [searchIn, setSearchIn] = useState('title');
	const [sortBy, setSortBy] = useState('publishedAt');
	const navigate = useNavigate()

	const { userInfo } = useSelector(state => state.userLogin);

	useEffect(() => {
		if (!userInfo || !userInfo._id) {
			navigate('/login')
		}
	},[navigate, userInfo])

	const searchInDropdown = [
		{ key: 'Title', value: 'title' },
		{ key: 'Description', value: 'description' },
		{ key: 'Content', value: 'content' },
	];

	const sortByDropdown = [
		{ key: 'PublishedAt', value: 'publishedAt' },
		{ key: 'Relevancy', value: 'relevancy' },
		{ key: 'Popularity', value: 'popularity' },
	];

	return (
		<div className='full-screen'>
			<div className='container flex'>
				<div className='md:col-7 col-12'>
					<div className='filter-box w-full pb-2 px-2'>
						<div className='formgrid h-full grid flex align-items-end'>
							<div className='col-4'>
								<div>
									<small className='text-black-alpha-40 ml-1'>
										Search Keyword
									</small>
									<InputText
										value={keyword}
										onChange={(e) => setKeyword(e.target.value)}
										className='p-inputtext-sm w-full'
									/>
								</div>
							</div>
							<div className='col-4'>
								<div>
									<small className='text-black-alpha-40 ml-1'>Search In</small>
									<Dropdown
										value={searchIn}
										options={searchInDropdown}
										onChange={(e) => setSearchIn(e.value)}
										className='p-inputtext-sm w-full'
										optionLabel='key'
										optionValue='value'
									/>
								</div>
							</div>
							<div className='col-4'>
								<div>
									<small className='text-black-alpha-40 ml-1'>Sort By</small>
									<Dropdown
										value={sortBy}
										options={sortByDropdown}
										onChange={(e)=>setSortBy(e.value)}
										className='p-inputtext-sm w-full'
										optionLabel='key'
										optionValue='value'
									/>
								</div>
							</div>
						</div>
					</div>
					<News keyword={keyword} searchIn={searchIn} sortBy={sortBy} />
				</div>
				<div className='md:col-5 col-12'>
					<Headlines />
				</div>
			</div>
		</div>
	);
};

export default NewsScreen;
