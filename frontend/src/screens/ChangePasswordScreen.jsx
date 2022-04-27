import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserPassword } from '../actions/userActions';
import { USER_UPDATE_PASSWORD_SUCCESS } from '../constants/userConstants';

const ChangePasswordScreen = () => {
    const toast = useRef(null)
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [newError, setError] = useState(false);
	const [sameError, setSameError] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);
	const { loading, user, error } = useSelector((state) => state.userUpdatePassword);

	useEffect(() => {
		if (!userInfo || !userInfo._id) {
			navigate('/');
		}
    }, [navigate, userInfo]);
    
    useEffect(() => {
        if (user) {
            toast.current.show({
				severity: 'success',
				summary: 'Success',
				detail: 'Password Changed Successfully',
            });
            setPassword('')
            setNewPassword('')
            setConfirmNewPassword('')
            dispatch({type: USER_UPDATE_PASSWORD_SUCCESS,payloaad: null})
        }
    },[dispatch, user])

	const onPasswordChangeFormSubmit = (e) => {
		e.preventDefault();
		if (newPassword !== confirmNewPassword) {
            setError(true);
            setConfirmNewPassword('')
        } else if (password === newPassword) {
            setSameError(true);
            setNewPassword('')
            setConfirmNewPassword('');
        } else {
            dispatch(updateUserPassword(password,newPassword))
        }
	};

	return (
		<div className='full-screen flex align-items-center justify-content-center'>
			<div className='mid-form shadow-2'>
				<Toast ref={toast} />
				<div className='text-center text-4xl font-bold text-black-alpha-60'>
					Change Password
				</div>
				{newError && (
					<Message
						severity='error'
						text='Passwords Do Not Match'
						className='w-full my-3'
					/>
				)}
				{sameError && (
					<Message
						severity='error'
						text='Old & New Password cannot be same'
						className='w-full my-3'
					/>
				)}
				{error && <Message severity='error' text={error} className='w-full my-3' />}
				{loading ? (
					<div className='text-center my-4'>
						<ProgressSpinner />
					</div>
				) : (
					<form onSubmit={onPasswordChangeFormSubmit}>
						<div className='p-float-label my-4'>
							<Password
								value={password}
								id='password p-fluid'
								className={classNames({}, 'w-full', 'p-inputtext-sm')}
								onChange={(e) => setPassword(e.target.value)}
								toggleMask
								feedback={false}
								required
							/>
							<label htmlFor='password'>Old Password*</label>
						</div>
						<div className='p-float-label my-4'>
							<Password
								value={newPassword}
								id='password p-fluid'
								className={classNames(
									{ 'p-invalid': newError },
									{ 'p-invalid': sameError },
									'w-full',
									'p-inputtext-sm',
								)}
								onChange={(e) => {
									setNewPassword(e.target.value);
									setError(false);
									setSameError(false);
								}}
								toggleMask
								feedback={true}
								required
							/>
							<label htmlFor='password'>New Password*</label>
						</div>
						<div className='p-float-label my-4'>
							<Password
								value={confirmNewPassword}
								id='password p-fluid'
								className={classNames(
									{ 'p-invalid': newError },
									{ 'p-invalid': sameError },
									'w-full',
									'p-inputtext-sm',
								)}
								onChange={(e) => {
									setConfirmNewPassword(e.target.value);
									setError(false);
									setSameError(false);
								}}
								toggleMask
								feedback={false}
								required
							/>
							<label htmlFor='password'>Confirm New Password*</label>
						</div>
						<div className='text-center'>
							<Button
								type='submit'
								label='Change Password'
								className='p-button-sm p-button-success'
							/>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default ChangePasswordScreen;
