import React from 'react'
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';


dayjs.extend(localizedFormat);

const ViewArticle = ({article}) => {
  return (
		<div>
			<div className=''>
				<span className='text-black-alpha-40'>Heading : </span>
				<span className='font-bold'>{article.heading}</span>
			</div>
			<div className=''>
				<span className='text-black-alpha-40'>Description : </span>
				<span className='font-bold'>{article.description}</span>
			</div>
			<div className=''>
				<span className='text-black-alpha-40'>Content : </span>
				<div dangerouslySetInnerHTML={{ __html: article.content }} />
			</div>
			<div className=''>
				<span className='text-black-alpha-40'>Author : </span>
				<span className='font-bold'>{article.user && article.user.username}</span>
			</div>
			<div className=''>
				<span className='text-black-alpha-40'>Published On : </span>
				<span className='font-bold'>{dayjs(article.createdAt).format('lll')}</span>
			</div>
		</div>
  );
}

export default ViewArticle