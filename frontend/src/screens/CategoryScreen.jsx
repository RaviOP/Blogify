import { Button } from 'primereact/button';
import React, { useState, useEffect } from 'react';
import day from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Dialog } from 'primereact/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { confirmDialog } from 'primereact/confirmdialog';
import { deleteCategory, getCategoryList } from '../actions/categoryActions';
import { Message } from 'primereact/message';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import EditCategory from '../components/EditCategory';
import { CATEGORY_DELETE_SUCCESS, CATEGORY_UPDATE_SUCCESS } from '../constants/categoryConstant';

day.extend(localizedFormat);

const CategoryScreen = () => {
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [search, setSearch] = useState('');
	const [show, setShow] = useState(false);
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);
	const { loading, categories, error } = useSelector((state) => state.categoryList);
	const { category: updatedCategory } = useSelector((state) => state.categoryUpdate);
	const { loading: deleteLoading,error: deleteError,category: deletedCategory } = useSelector((state) => state.categoryDelete);

	useEffect(() => {
		if (!userInfo || !userInfo._id) {
			navigate('/login');
		} else {
			dispatch(getCategoryList());
			setSelectedCategory(null);
		}
	}, [dispatch, navigate, userInfo]);

	useEffect(() => {
		if (updatedCategory) {
			dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: null });
			dispatch(getCategoryList());
		}
		setSelectedCategory(null);
	}, [dispatch, updatedCategory]);

	useEffect(() => {
		if (deletedCategory) {
			dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: null });
			dispatch(getCategoryList());
		}
		setSelectedCategory(null);
	}, [dispatch, deletedCategory]);


	const onAddClick = (e) => {
		navigate('/categories/new');
	};

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };
		_filters['global'].value = value;
		setFilters(_filters);
		setSearch(value);
	};

	const deletedAtTemplate = (rowData) => {
		return (
			<i
				className={classNames('pi', {
					'text-green-500 pi-check-circle': rowData.isDeleted,
					'text-pink-500 pi-times-circle': !rowData.isDeleted,
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

	const onDeleteClick = () => {
		confirmDialog({
			message: 'Are you sure you want to delete?',
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				dispatch(deleteCategory(selectedCategory._id))
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
									Category List
								</span>
							</div>
							<div>
								<InputText
									value={search}
									onChange={onGlobalFilterChange}
									placeholder='Search Categories'
									className='mr-2 w-20rem'
								/>
								<Button
									icon='pi pi-trash'
									className='p-button-rounded p-button-danger mr-1'
									tooltip='Delete Selected Category'
									tooltipOptions={{ position: 'bottom' }}
									onClick={onDeleteClick}
									disabled={!selectedCategory || selectedCategory.isDeleted}
								/>
								<Button
									icon='pi pi-pencil'
									className='p-button-rounded p-button-info mx-1'
									tooltip='Edit Seleted Category'
									tooltipOptions={{ position: 'bottom' }}
									onClick={onEditClick}
									disabled={!selectedCategory || selectedCategory.isDeleted}
								/>
								<Button
									icon='pi pi-plus'
									className='p-button-rounded p-button-success ml-1'
									tooltip='Add New Category'
									tooltipOptions={{ position: 'bottom' }}
									onClick={onAddClick}
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
									value={categories}
									filters={filters}
									loading={loading || deleteLoading}
									selectionMode='single'
									selection={selectedCategory}
									onSelectionChange={(e) => setSelectedCategory(e.value)}
									stripedRows
									columnResizeMode='fit'
									showGridlines
									resizableColumns
									responsiveLayout='stack'
									globalFilterFields={['name', 'user.username']}
									breakpoint='986px'
									emptyMessage='No Categories Found'
								>
									<Column
										field='name'
										header='Name'
										sortable
										bodyClassName='justify-content-center'
									/>
									<Column
										field='user.username'
										header='Created By'
										sortable
										bodyClassName='justify-content-center'
										body={(rowdata) =>
											rowdata && rowdata.user && rowdata.user.username 
												?  rowdata.user.username
												: '-'
										}
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
										field='isDeleted'
										header='Deleted'
										dataType='boolean'
										sortable
										body={deletedAtTemplate}
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
							<EditCategory onHide={onHide} category={selectedCategory} />
						</Dialog>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryScreen;
