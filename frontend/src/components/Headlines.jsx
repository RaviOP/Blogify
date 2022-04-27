import React, { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { DataView } from 'primereact/dataview';
import { Message } from 'primereact/message';
import { Paginator } from 'primereact/paginator';
import { getHeadlinesList } from '../actions/newsActions';

const Headlines = () => {
  const [lazyParms, setLazyParams] = useState({
    first: 0,
		rows: 15,
		page: 0,
	});
  
  const dispatch = useDispatch();
  const { loading, headlines, count, error } = useSelector((state) => state.headlinesList);

  useEffect(() => {
    dispatch(getHeadlinesList(lazyParms.rows,lazyParms.page + 1,))
  },[dispatch, lazyParms.page, lazyParms.rows])

  const onPage = (e) => {
		setLazyParams(e);
  };

  const itemTemplate = (row) => {
		return renderItems(row);
  };

  const renderItems = (data) => {
		return (
			<div className='headline-card'>
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
						<div className='flex flex-column' style={{ height: '6rem' }}>
							<div className='flex-grow-0'>
								<a
									href={data.url}
									target='_blank'
									rel='noreferrer'
									className='no-underline'
									style={{
										color: 'var(--primary-color',
									}}
								>
									<small
										title={data.title}
									>
										{data.title}
									</small>
								</a>
							</div>
							<div
								className='flex-grow-1'
								style={{
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
								}}
							>
								<small className='text-black-alpha-60' title={data.description}>
									{data.description}
								</small>
							</div>
							<div className='flex-grow-0'>
								<div className=''>
									<small className='text-black-alpha-40'>Published At: </small>
									<small>{dayjs(data.publishedAt).format('lll')}</small>
								</div>
							</div>
							<div className='flex-grow-0'>
								<small className='text-black-alpha-40'>Author: </small>
								<small
									className='font-medium'
									style={{
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									}}
								>
									{data.author || 'N/A'}
								</small>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
  };
	return (
		<div>
			<div className='filter-box'>
				<div className='h-full w-full flex align-items-center justify-content-center'>
					<div className='font-bold text-black-alpha-60 text-5xl text-center'>
						Top Headlines
					</div>
				</div>
			</div>
			<div className='news-box shadow-1 mt-1'>
				{error ? (
					<Message text={error} severity='error' className='mt-3 w-full' />
				) : (
					<>
						<div className='slider'>
							<DataView
								className='m-2'
								value={headlines}
								itemTemplate={itemTemplate}
								layout='grid'
								lazy
								emptyMessage='Headlines Not Found'
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
								template='PrevPageLink PageLinks NextPageLink'
							></Paginator>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Headlines;
