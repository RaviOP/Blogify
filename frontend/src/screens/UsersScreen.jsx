import { FilterMatchMode } from 'primereact/api';
import { classNames } from 'primereact/utils';
import { confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import day from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { USER_DELETE_SUCCESS, USER_UPDATE_SUCCESS } from '../constants/userConstants';
import { Dialog } from 'primereact/dialog';
import { deleteUserById, getAllUsers } from '../actions/userActions';
import EditUser from '../components/EditUser';

day.extend(localizedFormat);

const UsersScreen = () => {
	const [selectedUser, setSelectedUser] = useState(null);
	const [search, setSearch] = useState('');
	const [show, setShow] = useState(false);
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);
	const { loading, users, error } = useSelector((state) => state.userList);
	const { user: updatedUser } = useSelector((state) => state.userUpdate);
	const {
		loading: deleteLoading,
		error: deleteError,
		user: deletedUser,
	} = useSelector((state) => state.userDelete);

	useEffect(() => {
		if (!userInfo || !userInfo._id) {
			navigate('/login');
		} else {
			dispatch(getAllUsers());
			setSelectedUser(null);
		}
	}, [dispatch, navigate, userInfo]);

	useEffect(() => {
		if (updatedUser) {
			dispatch({ type: USER_UPDATE_SUCCESS, payload: null });
			dispatch(getAllUsers());
		}
		setSelectedUser(null);
	}, [dispatch, updatedUser]);

	useEffect(() => {
		if (deletedUser) {
			dispatch({ type: USER_DELETE_SUCCESS, payload: null });
			dispatch(getAllUsers());
		}
		setSelectedUser(null);
	}, [deletedUser, dispatch]);

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };
		_filters['global'].value = value;
		setFilters(_filters);
		setSearch(value);
	};

	const isDeletedTemplate = (rowData) => {
		return (
			<i
				className={classNames('pi', {
					'text-green-500 pi-check-circle': rowData.isDeleted,
					'text-pink-500 pi-times-circle': !rowData.isDeleted,
				})}
			></i>
		);
	};

	const isActiveTemplate = (rowData) => {
		return (
			<i
				className={classNames('pi', {
					'text-green-500 pi-check-circle': rowData.isActive,
					'text-pink-500 pi-times-circle': !rowData.isActive,
				})}
			></i>
		);
    };
    
    const isAdminTemplate = (rowData) => {
		return (
			<i
				className={classNames('pi', {
					'text-green-500 pi-check-circle': rowData.isAdmin,
					'text-pink-500 pi-times-circle': !rowData.isAdmin,
				})}
			></i>
		);
	};

	const onHide = () => {
		setShow(false);
	};

	const onEditClick = () => {
		setShow(true);
    };
    
    const usernameBodyTemplate = (rowData) => {
		return (
			<React.Fragment>
				<img
					alt={rowData.username}
					src={`${process.env.REACT_APP_API_BASE_URL}/${rowData.profile}`}
					width='32'
					style={{ verticalAlign: 'middle',borderRadius: '50%' }}
				/>
				<span className='image-text' style={{ verticalAlign: 'middle',marginLeft: '.5rem' }}>
					{rowData.username}
				</span>
			</React.Fragment>
		);
	};

	const onDeleteClick = () => {
		confirmDialog({
			message: 'Are you sure you want to delete?',
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				dispatch(deleteUserById(selectedUser._id));
			},
		});
	};

	return (
		<div className='full-screen'>
			<div className='container'>
				<div className='pt-2'>
					<div className='w-full outer-card shadow-1'>
						<div className='flex align-items-center px-3 py-2 border-bottom-1 border-300'>
							<div className='flex-grow-1'>
								<span className='font-bold text-3xl text-black-alpha-40'>
									User List
								</span>
							</div>
							<div>
								<InputText
									value={search}
									onChange={onGlobalFilterChange}
									placeholder='Search Users'
									className='mr-2 w-20rem'
								/>
								<Button
									icon='pi pi-trash'
									className='p-button-rounded p-button-danger mr-1'
									tooltip='Delete Selected User'
									tooltipOptions={{ position: 'bottom' }}
									onClick={onDeleteClick}
									disabled={
										!selectedUser ||
										selectedUser.isDeleted ||
										selectedUser._id === userInfo._id
									}
								/>
								<Button
									icon='pi pi-pencil'
									className='p-button-rounded p-button-info ml-1'
									tooltip='Edit Seleted User'
									tooltipOptions={{ position: 'bottom' }}
									onClick={onEditClick}
									disabled={
										!selectedUser ||
										selectedUser.isDeleted ||
										selectedUser._id === userInfo._id
									}
								/>
							</div>
						</div>
						<div className=''>
							{error || deleteError ? (
								<Message
									className='w-full'
									text={error || deleteError}
									severity='error'
								/>
							) : (
								<DataTable
									className='mx-2 my-1 justify-content-center h-auto'
									scrollable
									style={{ height: '77vh', maxHeight: '79vh' }}
									scrollHeight='flex'
									value={users}
									filters={filters}
									loading={loading || deleteLoading}
									selectionMode='single'
									selection={selectedUser}
									onSelectionChange={(e) => setSelectedUser(e.value)}
									stripedRows
									columnResizeMode='fit'
									showGridlines
									resizableColumns
									responsiveLayout='stack'
									globalFilterFields={['username', 'email']}
									breakpoint='986px'
									emptyMessage='No Categories Found'
								>
									<Column
										field='username'
										header='Username'
										sortable
										body={usernameBodyTemplate}
										// bodyClassName='justify-content-center'
									/>
									<Column
										field='email'
										header='Email'
										sortable
										bodyClassName='justify-content-center'
									/>
									<Column
										field='country'
										header='Country'
										sortable
										style={{ maxWidth: '8rem' }}
										bodyClassName='justify-content-center'
									/>
									<Column
										field='createdAt'
										header='Created At'
										sortable
										bodyClassName='justify-content-center'
										body={(rowdata) => day(rowdata.createdAt).format('lll')}
									/>
									<Column
										field='updatedAt'
										header='Last Updated'
										bodyClassName='justify-content-center'
										sortable
										body={(rowdata) => day(rowdata.updatedAt).format('lll')}
									/>
									<Column
										field='isAdmin'
										header='Admin'
										dataType='boolean'
										sortable
										style={{ maxWidth: '8rem' }}
										body={isAdminTemplate}
										bodyClassName='justify-content-center'
									/>
									<Column
										field='isActive'
										header='Active'
										dataType='boolean'
										sortable
										style={{ maxWidth: '8rem' }}
										body={isActiveTemplate}
										bodyClassName='justify-content-center'
									/>
									<Column
										field='isDeleted'
										header='Deleted'
										dataType='boolean'
										sortable
										style={{ maxWidth: '8rem' }}
										body={isDeletedTemplate}
										bodyClassName='justify-content-center'
									/>
								</DataTable>
							)}
						</div>
						<Dialog
							visible={show}
							onHide={onHide}
							closable
							dismissableMask
							style={{ width: '30vw' }}
						>
							<EditUser onHide={onHide} user={selectedUser} />
						</Dialog>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UsersScreen;
