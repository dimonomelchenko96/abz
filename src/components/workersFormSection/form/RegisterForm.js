import { useDispatch } from 'react-redux';
import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validationSchema } from './FormValidationSchema';
import useService from '../../../service/Service';
import Preloader from '../../preloader/Preloader';
import {addNewUser} from '../../../slices/appSlice'

const RegisterForm = () => {

    const dispatch = useDispatch();

    const {getPosition} = useService();

	const [positions, setPositions] = useState([]);
    const [positionsError, setPositionsError] = useState(false);

	useEffect(() => {
		getPosition()
			.then(res => setPositions(res))
            .catch(() => {
                setPositionsError(true);
            })
	}, [])

     return (
        <div>
            <h2 className='form-section__title'>Working with POST request</h2>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                    position_id: 1,
                    photo: null
                }}
                validationSchema={validationSchema}
                onSubmit={values => dispatch(addNewUser(values))}
            >
                {({values, setFieldValue, errors, touched, isValid, dirty}) => (
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
                            className={`form__input ${errors.email && touched.email ? 'form__input-error' : ''}`} 
                            type='email' 
                            id='email' 
                        />
                        <label 
                            className={`form__input-label ${values.email && 'active'}`} 
                            htmlFor='email'
                        >
                            Email
                        </label>
                        <ErrorMessage className='form__error' name='email' component="div"/>
                    </div>
                    <div className="form__item">
                        <Field 
                            name='phone' 
                            className={`form__input ${errors.phone && touched.phone ? 'form__input-error' : ''}`} 
                            type='number' 
                            id='phone' 
                        />
                        <label 
                            className={`form__input-label ${values.phone && 'active'}`} 
                            htmlFor='phone'
                        >
                            Phone
                        </label>
                        {
                            errors.phone && touched.phone ? 
                                <ErrorMessage className='form__error' name='phone' component="div"/> : 
                                <div className='form__helper'>+38 (XXX) XXX - XX - XX</div>
                        }
                    </div>
                    <div className='form__radio-block'>
                        <div className='form__radio-title'>Select your position</div>
                        {positions.length === 0 && !positionsError ? <Preloader/> : null}
                        {positionsError && <div>Error, please reload page</div>}
                        {positions.length > 0 && radioButtons(positions, values, setFieldValue)}
                        <ErrorMessage className='form__error' name='radio' component="div"/>
                    </div>
                    <div className='form__photo-block'>
                        <input 
                            name='photo'
                            type="file" 
                            // accept='image/jpg,image/jpeg'
                            id='file' 
                            className='form__photo-input'
                            onChange={(e) => {
                                setFieldValue("photo", e.currentTarget.files[0]);
                            }}
                        />
                        <div className='form__photo-wrapper'>
                            <label 
                                className={`form__photo-fake-button ${errors.photo && values.photo ? 'form__input-error' : ''}`}   
                                htmlFor='file'
                            >
                                Upload
                            </label>
                            <div 
                                className={`form__photo-name ${errors.photo && values.photo ? 'form__input-error' : ''}`}
                                style={values.photo?.name ? {'color': '#000000'} : null}   
                            >
                                {values.photo?.name ? values.photo.name : 'Upload your photo'}
                            </div>
                        </div>
                        {
                            errors.photo && values.photo ? <div className='form__error'>{errors.photo}</div> : null
                        }
                        </div>
                        <button disabled={!(isValid && dirty)} className='form__button button' type="submit">Sign up</button>
                    </Form>
                )}
                
            </Formik>
        </div>
  )
}

const radioButtons = (positions, values, setFieldValue) => {
    return (
        <Field name='position_id' >
            {() => {
                return positions.map(({id, name}) => {
                    return (
                        <div key={id} className='form__radio-item'>
                            <input
                                type="radio"
                                id={`radio-${id}`} 
                                value={id}
                                checked={values.position_id == id}
                                onChange={(e) => {
                                    setFieldValue("position_id", e.currentTarget.value);
                                }}
                            />
                            <label htmlFor={`radio-${id}`}>{name}</label>
                        </div>
                    )	
                })
            }}
        </Field>
    )
}

export default RegisterForm;