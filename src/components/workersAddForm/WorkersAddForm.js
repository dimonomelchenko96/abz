import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { workersListReset , fetchWorkersList} from '../workersList/workerListSlice';
import useService from '../../service/Service';

import "./workersAddForm.scss";

const WorkersAddForm = () => {
	const phoneRegExp = /^[\+]{0,1}380([0-9]{9})$/;
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
    ];

	const {addUser, getPosition, getWorker , getToken} = useService();

	const dispatch = useDispatch();

	const [positions, setPositions] = useState([]);

	useEffect(() => {
		getPosition()
			.then(res => setPositions(res));
	}, [])

	const addNewUser = async ({position_id, name, email, phone, photo}) => {
		const token = await getToken();

		const formData = new FormData();
		formData.append('position_id', +position_id);
		formData.append('name', name);
		formData.append('email', email);
		formData.append('phone', `+${phone}`);
		formData.append('photo', photo);

		
		
		addUser('POST', formData, {'Token': token})
			.then(data => console.log(data))
			.then(() => {
				dispatch(workersListReset())
			})
			.then(() => {
				dispatch(fetchWorkersList(1))
			})	
	}

	return (
		<section className='form-section'>
			<div className='container'>
				<h2 className='form-section__title'>Working with POST request</h2>
				<Formik
					initialValues={{
						name: '',
						email: '',
						phone: '',
						position_id: 1,
						photo: null
					}}
					validationSchema={Yup.object({
						name: Yup.string()
								.required('Required field')
								.min(2, 'Minimum 2 characters')
								.max(60, 'Maximum 60 characters'),						
						email: Yup.string()
								.required('Required field')
								.min(2)
								.max(100, 'Maximum email length 100')
								.email('Invalid email format'),  							
						phone: Yup.string()
								.required('Required field')
								.matches(phoneRegExp, 'Phone number is not valid'),
						photo: Yup.mixed()
								.required("A photo is required")
								.test(
									"fileFormat",
									"Unsupported Format",
									value => value && SUPPORTED_FORMATS.includes(value.type)
								) 
								.test(
									"fileSize",
									"File too small",
									(value) => !value || (value.size && value.size >= 70 * 70)
								)            
					})}
					onSubmit={values => addNewUser(values)}
				>
					{({values, setFieldValue, errors, touched}) => (
						<Form className='form form-section__form'>
						<div className="form__item">
							<Field 
								name='name' 
								className={`form__input ${errors.name && touched.name ? 'form__input-error' : ''}`}
								type='text' 
								id='name' 
								/>
							<label 
								className={`form__input-label ${values.name && 'active'}`} 
								htmlFor='name'
							>
								Your name
							</label>
							<ErrorMessage className='form__error' name='name' component="div"/>
						</div>
						<div className="form__item">
							<Field 
								name='email' 
								className='form__input' 
								type='email' 
								id='email' 
							/>
							<ErrorMessage className='form__error' name='email' component="div"/>
							<label 
								className={`form__input-label ${values.email && 'active'}`} 
								htmlFor='email'
							>
									Email
							</label>
						</div>
						<div className="form__item">
							<Field 
								name='phone' 
								className='form__input' 
								type='number' 
								id='phone' 
							/>
							<ErrorMessage className='form__error' name='phone' component="div"/>
							<label 
								className={`form__input-label ${values.phone && 'active'}`} 
								htmlFor='phone'
							>
								Phone
							</label>
						</div>
						<div className='form__radio-block'>
							<div className='form__radio-title'>Select your position</div>
							{
								positions.map(({id, name}) => {
									return (
										<div key={id} className='form__radio-item'>
											<input
												type="radio"
												name='position_id' 
												id={`radio-${id}`} 
												value={id}
												// checked={values.position_id ? values.position_id === id : id === 1}
												onChange={(e) => {
													setFieldValue("position_id", e.target.value);
												}}
											/>
											<label htmlFor={`radio-${id}`}>{name}</label>
										</div>
									)	
								})
							}
							<ErrorMessage className='form__error' name='radio' component="div"/>

						</div>
						<div className='form__photo-block'>
							<input 
								name='photo'
								type="file" 
								id='file' 
								className='form__photo-input'
								onChange={(e) => {
									setFieldValue("photo", e.currentTarget.files[0]);
								}}
							/>
							<div className='form__photo-wrapper'>
								<label className='form__photo-fake-button'  htmlFor='file'>Upload</label>
								<div className='form__photo-name'>{values.photo?.name ? values.photo.name : 'Upload your photo'}</div>
							</div>
								<ErrorMessage className='form__error' name='photo' component="div"/>
							</div>
							<button className='form__button button' type="submit">Sign up</button>
						</Form>
					)}
					
				</Formik>
				
			</div>
		</section>
	)
}

export default WorkersAddForm