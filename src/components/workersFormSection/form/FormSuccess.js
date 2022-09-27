import React from 'react'
import successImg from '../../../assets/img/success-image.png'

const FormSuccess = () => {
 	return (
		<>
			<h2 className='form__success-title'>User successfully registered</h2>
			<img className='form__success-img' src={successImg} alt="successImage" />
		</>	
	)
}

export default FormSuccess