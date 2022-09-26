import { useSelector } from "react-redux";
import RegisterForm from './form/RegisterForm';
import Preloader from '../preloader/Preloader'
import ErrorMessage from '../errorMessage/ErrorMessage';
import FormSuccess from './form/FormSuccess';


import "./workersFormSection.scss";

// можливо ui виглядить так собі, хотів показати що шарю за такий спосіб відмінний від того що в юзерах

const WorkersAddForm = () => {

	const {formStatus} = useSelector(state => state.app)

	const setContent = (status) => {
		switch (status) {
			case 'idle': 
				return <RegisterForm/>
			case 'sending': 
				return <Preloader/>	
			case 'success': 
				return <FormSuccess/>
			case 'error': 
				return <ErrorMessage/>	
			default : return				
		}
	}

	return (
		<section className='form-section' id='form-section'>
			<div className='container'>
				<div className="form-section__wrapper">
					{
						setContent(formStatus)
					}
				</div>
			</div>
		</section>
	)
}

export default WorkersAddForm