import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { DataView } from 'primereact/dataview';
import { Paginator } from 'primereact/paginator';
import { Message } from 'primereact/message';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsList } from '../actions/newsActions';

import '../styles/screen.css';

dayjs.extend(localizedFormat)

const News = ({ keyword, searchIn, sortBy }) => {
	const [lazyParms, setLazyParams] = useState({
		first: 0,
		rows: 10,
		page: 0,
	});

	const dispatch = useDispatch();
	const { loading, news, count, error } = useSelector((state) => state.newsList);

	useEffect(() => {
		dispatch(
			getNewsList(
				keyword ? keyword : 'covid',
				lazyParms.rows,
				lazyParms.page + 1,
				searchIn,
				sortBy,
			),
		);
	}, [dispatch, keyword, lazyParms.page, lazyParms.rows, searchIn, sortBy]);

	const onPage = (e) => {
		setLazyParams(e);
	};

	const itemTemplate = (row, layout) => {
		return renderItems(row);
	};

	const renderItems = (data) => {
		return (
			<div className='card'>
				<div className='flex'>
					<div className='col-4'>
						<img
							loading='eager'
							src={data.urlToImage || '/NoImage.png'}
							alt='News-pic'
							className='news-image'
						/>
					</div>
					<div className='col-8'>
						<div className='flex flex-column' style={{ height: '10rem' }}>
							<div className='flex-grow-0'>
								<a
									href={data.url}
									target='_blank'
									rel='noreferrer'
									className='no-underline'
									style={{ color: 'var(--primary-color' }}
								>
									<span>{data.title}</span>
								</a>
							</div>
							<div className='flex-grow-1'>
								<small className='text-black-alpha-60'>{data.description}</small>
							</div>
							<div className='flex-grow-0'>
								<div className=''>
									<small className='text-black-alpha-40'>Published At: </small>
									<small>{dayjs(data.publishedAt).format('lll')}</small>
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
								<small className='text-black-alpha-40'>Author: </small>
								<small className='font-medium'>{data.author || 'N/A'}</small>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className='news-box'>
			{error ? (
				<Message text={error} severity='error' className='mt-3 w-full' />
			) : (
				<div className='shadow-1 mt-1'>
					<div className='slider'>
						<DataView
							className='m-2'
							value={news}
							itemTemplate={itemTemplate}
							layout='grid'
							lazy
							emptyMessage='News Not Found'
							loading={loading}
						/>
					</div>
					<div className='paginator'>
						<Paginator
							first={lazyParms.first}
							rows={lazyParms.rows}
							totalRecords={count}
							rowsPerPageOptions={[10, 20, 50]}
							onPageChange={onPage}
							alwaysShow
							template='PrevPageLink PageLinks NextPageLink RowsPerPageDropdown'
						></Paginator>
					</div>
				</div>
			)}
		</div>
	);
};

export default News;
