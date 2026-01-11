import react from 'react';

const useForm = (podaci) => {
    const [formData, setFormData] = react.useState(podaci);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    const resetForm = () => {
        setFormData(podaci);
    }

    return {formData, handleChange, resetForm};
}

export default useForm;
