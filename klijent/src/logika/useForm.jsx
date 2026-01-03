import react from 'react';

const useForm = (podaci) => {
    const [formData, setFormData] = react.useState(podaci);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return {formData, handleChange};
}

export default useForm;
