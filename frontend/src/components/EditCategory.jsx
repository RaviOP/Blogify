import React,{useState} from 'react'
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkCategoryName, updateCategory } from '../actions/categoryActions';
import { Button } from 'primereact/button';

const EditCategory = ({ category,onHide }) => {
    const [name, setName] = useState((category && category.name) || '');

    const dispatch = useDispatch()
    const { loading, error, category: updatedCategory } = useSelector((state) => state.categoryUpdate);
    const { isNameUsed } = useSelector((state) => state.categoryCheckName);
    
    useEffect(() => { 
        if (updatedCategory) {
            onHide()
        }
    }, [onHide, updatedCategory])
    
    const onNameChange = (e) => {
        setName(e.target.value);
		if (e.target.value && e.target.value.toLowerCase() !== category.name.toLowerCase()) {
			dispatch(checkCategoryName(e.target.value));
		}
    }

    const onCancelClick = () => {
        onHide()
    }

    const onUpdateCategoryClick = () => {
        if (!isNameUsed) {
            dispatch(updateCategory(category._id,name))
        }
    }

  return (
		<div>
			<div className='text-center text-4xl font-bold text-black-alpha-60'>
				Edit Category
			</div>
			{loading ? (
				<ProgressSpinner />
			) : error ? (
				<Message className='w-full' text={error} />
			) : (
				<div>
					<div className='p-float-label my-5'>
						<InputText
							id='username'
							value={name}
							onChange={onNameChange}
							className={classNames(
								{ 'p-invalid': isNameUsed },
								'w-full',
								'p-inputtext-sm',
							)}
							required
						/>
						<label htmlFor='username'>Name*</label>
						{isNameUsed && (
							<small style={{ color: 'red' }}>Category Already Exist</small>
						)}
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
							onClick={onUpdateCategoryClick}
							label='Update'
						/>
					</div>
				</div>
			)}
		</div>
  );
}

export default EditCategory