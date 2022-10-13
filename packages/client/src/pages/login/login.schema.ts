import * as Yup from 'yup';

export const loginFormSchema = Yup.object().shape({
	email: Yup.string().email('Введите верно email').required('Обязательное поле'),
	password: Yup.string().required('Обязательное поле').min(4, 'Минимальная длина 4'),
});
