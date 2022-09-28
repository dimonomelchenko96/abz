import * as Yup from 'yup';
import { SUPPORTED_FORMATS } from '../../../utils/helpers';

const phoneRegExp = /^[\+]{0,1}380([0-9]{9})$/;

export const validationSchema =  Yup.object({
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
                value => {
                    return !value || (value && SUPPORTED_FORMATS.includes(value.type))
                }
            )
            .test(
                "fileSize",
                "File size must not exceed 5MB",
                value => !value || (value && value.size <= 5242880)
            )
            .test(
                "fileResolution",
                "Resolution at least 70x70px",       
				value => !value || value.width > 70 && value.height > 70  
            )               
})
