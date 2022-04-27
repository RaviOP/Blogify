import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { classNames } from 'primereact/utils';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkCategoryName, createCategory } from '../actions/categoryActions';
import { CATEGORY_CREATE_SUCCESS } from '../constants/categoryConstant';

import '../styles/formscreen.css';

const CreateCategoryScreen = () => {
	const [name, setName] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { userInfo } = useSelector((state) => state.userLogin);
	const { loading, error, category } = useSelector((state) => state.categoryCreate);
	const { isNameUsed } = useSelector((state) => state.categoryCheckName);

	useEffect(() => {
		if (!userInfo || !userInfo._id) {
			navigate('/login');
		}
	}, [navigate, userInfo]);

	useEffect(() => {
		if (category && category.name) {
			dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: null });
			navigate('/categories');
		}
	}, [category, dispatch, navigate]);

	const onNameChange = (e) => {
		setName(e.target.value);
		if (e.target.value) {
			dispatch(checkCategoryName(e.target.value));
		}
	};

	const onCreateCategoryClick = () => {
		if (!isNameUsed) {
			dispatch(createCategory(name));
		}
	};

	const goBackClick = () => {
		navigate('/categories');
	}

	return (
		<div className='full-screen flex align-items-center justify-content-center'>
			<div className='mid-form shadow-2'>
				<div className='text-center text-4xl font-bold text-black-alpha-60'>
					Create Category
				</div>
				{loading ? (
					<ProgressSpinner />
				) : error ? (
					<Message className='w-full' text={error} />
				) : (
					<div>
						<div className='p-float-label my-5'>
							<InputText
								id='username'
								value={name}
								onChange={onNameChange}
								className={classNames(
									{ 'p-invalid': isNameUsed },
									'w-full',
									'p-inputtext-sm',
								)}
								required
							/>
							<label htmlFor='username'>Name*</label>
							{isNameUsed && (
								<small style={{ color: 'red' }}>Category Already Exist</small>
							)}
						</div>
						<div className='text-center'>
							<Button
								type='button'
								className='p-button-sm p-button-danger mr-2'
								onClick={goBackClick}
								label='Go Back'
							/>
							<Button
								type='button'
								className='p-button-sm p-button-success'
								onClick={onCreateCategoryClick}
								label='Create'
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CreateCategoryScreen;
