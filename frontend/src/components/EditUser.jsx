import React, { useState,useEffect } from 'react'
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Checkbox } from 'primereact/checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserById } from '../actions/userActions';
import { Button } from 'primereact/button';

const EditUser = ({ user, onHide }) => {
  const [isActive, setIsActive] = useState((user && user.isActive) || false);
  const [isAdmin, setIsAdmin] = useState((user && user.isAdmin) || false);

  const dispatch = useDispatch();
  const {
		loading,
		error,
		user: updatedUser
  } = useSelector((state) => state.userUpdate);

  useEffect(() => {
		if (updatedUser) {
			onHide();
		}
  }, [onHide, updatedUser]);


  const onCancelClick = () => {
		onHide();
  };

  const onUpdateUserClick = () => {
    dispatch(updateUserById(user._id,isActive,isAdmin))
  };

  return (
		<div>
			<div className='text-center text-4xl font-bold text-black-alpha-60'>Edit User</div>
			{loading ? (
				<ProgressSpinner />
			) : error ? (
				<Message className='w-full' text={error} />
			) : (
				<div>
					<div className='field-checkbox my-3'>
						<Checkbox
							id='isAdmin'
							checked={isAdmin}
							onChange={(e) => setIsAdmin(e.checked)}
						/>
						<label htmlFor='isAdmin'>Admin</label>
					</div>
					<div className='field-checkbox my-3'>
						<Checkbox
							id='isActive'
							checked={isActive}
							onChange={(e) => setIsActive(e.checked)}
						/>
						<label htmlFor='isActive'>Active</label>
					</div>
					<div className='text-center'>
						<Button
							type='button'
							className='p-button-sm p-button-danger mr-2'
							onClick={onCancelClick}
							label='Cancel'
						/>
						<Button
							type='button'
							className='p-button-sm p-button-success'
							onClick={onUpdateUserClick}
							label='Update'
						/>
					</div>
				</div>
			)}
		</div>
  );
}

export default EditUser