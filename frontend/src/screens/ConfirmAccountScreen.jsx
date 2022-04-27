import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { classNames } from 'primereact/utils';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { activateUserAccount, getInactivateUserDetail } from '../actions/userActions';
import PageNotFound from '../components/PageNotFound';

import '../styles/formscreen.css';

const ConfirmAccountScreen = () => {
	const params = useParams();
	const id = params.id;
	const [securityCode, setSecurityCode] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userInactiveDetails = useSelector((state) => state.userInactiveDetails);
	const { loading, error, user } = userInactiveDetails;

	const userConfirmAccount = useSelector((state) => state.userConfirmAccount);
	const { loading: confirmLoading, error: errorConfirm, userInfo } = userConfirmAccount;

	useEffect(() => {
		if (userInfo && userInfo._id) {
			navigate('/');
		}
		if (user && !user._id) {
			dispatch(getInactivateUserDetail(id));
		}
		
	}, [dispatch, id, navigate, userInfo,user]);

    const onConfirmAccountFormSubmit = (e) => {
        e.preventDefault();
        if (user && user._id === id) {
            dispatch(activateUserAccount(id, securityCode));
        }
	};
	return loading ? (
		<div className='full-screen flex align-items-center justify-content-center'>
			<ProgressSpinner />
		</div>
	) : error ? (
		<PageNotFound />
	) : (
		<div className='full-screen flex align-items-center justify-content-center'>
			<div className='mid-form'>
				<div className='text-center'>
					<div className=' text-4xl font-bold text-black-alpha-60'>Confirm Account</div>
					<small className='text-black-alpha-40'>(Please Check your Email for security Code)</small>
				</div>
				{confirmLoading ? (
					<div className='text-center my-4'>
						<ProgressSpinner />
					</div>
				) : (
					<form onSubmit={onConfirmAccountFormSubmit}>
						{errorConfirm && (
							<Message severity='error' text={errorConfirm} className='w-full my-2' />
						)}

						<InputText id='_id' value={id} style={{ display: 'none' }} required />
						<div className='p-float-label my-4'>
							<InputText
								id='code'
								value={securityCode}
								onChange={(e) => setSecurityCode(e.target.value)}
								className={classNames(
									{ 'p-invalid': errorConfirm },
									'w-full',
									'p-inputtext-sm',
								)}
								required
							/>
							<label htmlFor='code'>Security Code</label>
						</div>
						<div className='text-center'>
							<Button type='submit' label='Confirm' className='p-button-sm' />
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default ConfirmAccountScreen;
