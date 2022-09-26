import * as Yup from 'yup';

const phoneRegExp = /^[\+]{0,1}380([0-9]{9})$/;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
];

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
                value => value && SUPPORTED_FORMATS.includes(value.type)
            ) 
            .test(
                "fileSize",
                "File size must not exceed 5MB",
                (value) => !value || (value && value.size <= 5242880)
            )            
})
