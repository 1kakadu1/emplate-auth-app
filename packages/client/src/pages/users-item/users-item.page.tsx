import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../../store/reducer/users/uesrs.rtk';

export const UserItemPage = () => {
	const { id = '-1' } = useParams();
	const { data, isLoading, isSuccess } = useGetUserQuery({ id });
	return (
		<Container>
			{!isLoading && isSuccess && data ? (
				<>
					<h1>USER: {id}</h1>
					<div className="name">Name: {data.user.name}</div>
					<div className="email">Email: {data.user.email}</div>
				</>
			) : (
				<h1>LOADING</h1>
			)}
		</Container>
	);
};
