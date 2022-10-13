import * as Yup from 'yup';

export const registrationSchema = Yup.object().shape({
	email: Yup.string().email('Введите верно email').required('Обязательное поле'),
	password: Yup.string().required('Обязательное поле').min(4, 'Минимальная длина 4'),
	passwordConfirmation: Yup.string()
		.required('Обязательное поле')
		.oneOf([Yup.ref('password'), ''], 'Парол не совподают'),
});
