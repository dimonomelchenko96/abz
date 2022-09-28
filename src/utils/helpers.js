export const SUPPORTED_FORMATS = ["image/jpg","image/jpeg"];

export const convertFileToImg = (e, setFieldValue) => {
    let file = e.currentTarget.files[0];
    
    if (file && SUPPORTED_FORMATS.includes(file.type)) {
        const localImageUrl = URL.createObjectURL(file);
        const imageObject = new window.Image();
        imageObject.onload = () => {
            file.width = imageObject.naturalWidth;
            file.height = imageObject.naturalHeight;
            setFieldValue("photo", file);
            URL.revokeObjectURL(file);
        };
        imageObject.src = localImageUrl;
    }
    setFieldValue("photo", e.currentTarget.files[0]);
}

export const formatPhone = (phoneNumber) => {
    return phoneNumber.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3 $4 $5');
};