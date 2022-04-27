import { Button } from 'primereact/button';
import React, { useState, useEffect, useRef } from 'react';
import { Editor } from 'primereact/editor';
import { useDispatch, useSelector } from 'react-redux';
import { InputTextarea } from 'primereact/inputtextarea';
import { useNavigate } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { MultiSelect } from 'primereact/multiselect';
import { listCategories } from '../actions/categoryActions';
import { ARTICLE_CREATE_SUCCESS } from '../constants/articleConstant';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { createArticle } from '../actions/articleActions';

const CreateArticleScreen = () => {
	const inputFile = useRef(null);
	const [content, setContent] = useState(null);
	const [heading, setHeading] = useState('');
	const [headingError, setHeadingError] = useState(false);
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState([]);
	const [categoryError, setCategoryError] = useState(false);
	const [fileError, setFileError] = useState(null);
	const [file, setFile] = useState('');
	const [image, setImage] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);
	const { categories } = useSelector((state) => state.categoryListAll);
	const { loading, article, error } = useSelector((state) => state.articleCreate);

	useEffect(() => {
		if (!userInfo || !userInfo._id) {
			navigate('/login');
		}
	}, [navigate, userInfo]);

	useEffect(() => {
		if (article && article._id) {
			dispatch({ type: ARTICLE_CREATE_SUCCESS, payload: null });
			navigate('/articles');
		}
	}, [article, dispatch, navigate]);

	useEffect(() => {
		dispatch(listCategories());
	}, [dispatch]);

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

	const goBackHandler = () => {
		navigate('/articles');
	};

	const publishHandler = () => {
		if (!file) {
			setFileError('Please select a thumbnail');
		}
			if (!heading) {
			setHeadingError(true);
		}
		if (!categories) {
			setCategoryError(true);
		}
		if (!fileError && !headingError && !categoryError){
			dispatch(createArticle(heading,description,content,file,category));
		}
	};

	return (
		<div className='full-screen'>
			<div className='container'>
				<div className='pt-2'>
					{loading ? (
						<ProgressSpinner />
					) : error ? (
						<Message severity='error' text={error} className='w-full' />
					) : (
						<div className='w-full outer-card shadow-1'>
							<div className='flex align-items-center px-3 py-2 border-bottom-1 border-300'>
								<div className='flex-grow-1'>
									<span className='font-bold text-3xl text-black-alpha-40'>
										Create Article
									</span>
								</div>
								<div>
									<Button
										icon='pi pi-back'
										className=' p-button-danger p-button-sm ml-2'
										label='Go Back'
										onClick={goBackHandler}
									/>
									<Button
										icon='pi pi-plus'
										className=' p-button-success p-button-sm ml-2'
										label='Publish'
										tooltipOptions={{ position: 'bottom' }}
										onClick={publishHandler}
									/>
								</div>
							</div>
							<div className='formgrid grid w-full'>
								<div className='col-4 mt-2'>
									<div className='ml-2 border-1 border-500 py-4 px-3'>
										<div className='p-float-label'>
											<InputTextarea
												id='heading'
												value={heading}
												rows={3}
														onChange={(e) => {
															setHeading(e.target.value)
															setHeadingError(false)
														}
														}
												autoResize
												className={classNames(
													{ 'p-invalid': headingError },
													'w-full',
													'p-inputtext-sm',
												)}
											/>
											<label htmlFor='heading'>Title*</label>
											{headingError && (
												<small style={{ color: 'red' }}>
													Title is required
												</small>
											)}
										</div>
										<div className='p-float-label mt-5'>
											<InputTextarea
												id='description'
												value={description}
												rows={3}
												onChange={(e) => setDescription(e.target.value)}
												autoResize
												className={classNames('w-full', 'p-inputtext-sm')}
											/>
											<label htmlFor='description'>Description</label>
										</div>
										<div className='p-float-label my-4'>
											<MultiSelect
												id='categories'
												options={categories}
												optionLabel='name'
												optionValue='_id'
												value={category}
														onChange={(e) => {
															setCategory(e.target.value)
															setCategoryError(false)
														}}
												className={classNames(
													{ 'p-invalid': headingError },
													'w-full',
													'p-inputtext-sm',
												)}
											/>
											<label htmlFor='categories' className='ml-0'>
												Categories*
											</label>
											{categoryError && (
												<small style={{ color: 'red' }}>
													Please select atleast 1 category
												</small>
											)}
										</div>
										<div className='p-float-label my-3'>
											<input
												id='image'
												ref={inputFile}
												type='file'
												accept='image/*'
												style={{ display: 'none' }}
												onChange={imagePicked}
											/>
											<Button
												className='w-full p-button-sm p-button-outlined p-button-success'
												label='Choose Thumbnail'
												type='button'
												onClick={() => inputFile.current.click()}
											/>
											{fileError && (
												<small style={{ color: 'red' }}>{fileError}</small>
											)}
										</div>
										{image && (
											<div className='w-full text-center mt-3'>
												<img
													src={image}
													alt='Thumbnail'
													style={{
														maxHeight: '20rem',
														width: '100%',
														objectFit: 'fill',
													}}
												/>
											</div>
										)}
									</div>
								</div>
								<div className='col-8 mt-2'>
									<Editor
										className=''
										style={{
											height: '74vh',
											maxHeight: '74vh',
											overflowY: 'scroll',
										}}
										value={content}
										onTextChange={(e) => setContent(e.htmlValue)}
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CreateArticleScreen;
