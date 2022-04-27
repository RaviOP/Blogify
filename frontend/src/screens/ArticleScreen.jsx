import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import React from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { getArticleList } from '../actions/articleActions';

import '../styles/screen.css';
import { Dialog } from 'primereact/dialog';
import ViewArticle from '../components/ViewArticle';

dayjs.extend(localizedFormat);

const ArticleScreen = () => {
	const [keyword, setKeyword] = useState('');
	const [show, setShow] = useState(false);
	const [article, setArticle] = useState(null);
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userLogin);
	const { loading, error, articles } = useSelector((state) => state.articleList);

	useEffect(() => {
		if (!userInfo || !userInfo._id) {
			navigate('/login');
		}
	}, [navigate, userInfo]);

	useEffect(() => {
		dispatch(getArticleList(keyword));
	}, [dispatch, keyword]);

	const createArticleClick = () => {
		navigate('/articles/new');
	};

	const linkClick = (article) => {
		setShow(true)
		setArticle(article)
	}

	const onHide = () => {
		setShow(false)
	}

	return (
		<div className='full-screen'>
			<div className='container'>
				<div className='pt-2'>
					<div className='w-full outer-card shadow-1'>
						<div className='flex align-items-center px-3 py-2 border-bottom-1 border-300'>
							<div className='flex-grow-1'>
								<span className='font-bold text-3xl text-black-alpha-40'>
									Articles
								</span>
							</div>
							<div>
								<InputText
									value={keyword}
									onChange={(e) => setKeyword(e.target.value)}
									placeholder='Search Articles'
									className='mr-2 w-20rem'
								/>
								<Button
									icon='pi pi-plus'
									className='p-button-rounded p-button-success ml-2'
									tooltip='Create Articles'
									tooltipOptions={{ position: 'bottom' }}
									onClick={createArticleClick}
								/>
							</div>
						</div>
						<div className='grid py-3 px-3'>
							{loading ? (
								<ProgressSpinner />
							) : error ? (
								<Message text={error} severity='error' className='w-full' />
							) : articles && articles.length > 0 ? (
								articles.map((article) => (
									<div
										className='col-6 border-1 border-400 my-1'
										style={{ minHeight: '10rem' }}
										key={article._id}
									>
										<div className='flex'>
											<div className='col-4'>
												<img
													loading='eager'
													src={`${process.env.REACT_APP_API_BASE_URL}/${article.thumbnail}`}
													alt='Thumbnail'
													className='news-image'
												/>
											</div>
											<div className='col-8'>
												<div
													className='flex flex-column'
													style={{ height: '10rem' }}
												>
													<div className='flex-grow-0'>
														<div
															className='cursor-pointer'
															onClick={() => linkClick(article)}
														>
															<span>{article.heading}</span>
														</div>
													</div>
													<div className='flex-grow-1'>
														<small className='text-black-alpha-60'>
															{article.description}
														</small>
													</div>
													<div className='flex-grow-0'>
														<div className=''>
															<small className='text-black-alpha-40'>
																Published At:{' '}
															</small>
															<small>
																{dayjs(article.createdAt).format(
																	'lll',
																)}
															</small>
														</div>
													</div>
													<div
														className='flex-grow-0'
														style={{
															display: 'inline-block',
															whiteSpace: 'nowrap',
															overflow: 'hidden',
															textOverflow: 'ellipsis',
														}}
													>
														<small className='text-black-alpha-40'>
															Author:{' '}
														</small>
														<small className='font-medium'>
															{(article.user && article.user.username) || 'N/A'}
														</small>
													</div>
												</div>
											</div>
										</div>
									</div>
								))
							) : (
								<div className='text-center mt-2'>Articles Not Found</div>
							)}
						</div>
						<Dialog
							visible={show}
							onHide={onHide}
							closable
							dismissableMask
							style={{ width: '50vw',maxHeight: '60vh' }}
						>
							<ViewArticle onHide={onHide} article={article} />
						</Dialog>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArticleScreen;
