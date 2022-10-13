import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RoutsPath } from '../../application/application.model';
import { useGetUsersQuery } from '../../store/reducer/users/uesrs.rtk';

export const UsersPage = () => {
	const navigate = useNavigate();
	const { data: values, error, isLoading, isSuccess } = useGetUsersQuery();

	return (
		<Container maxWidth="xl">
			<h1>Users: </h1>
			<Box p={2} />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>№</TableCell>
							<TableCell align="left">Email</TableCell>
							<TableCell align="left">Name</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{!isLoading && isSuccess && values ? (
							values.data.users.map((row, index: number) => (
								<TableRow
									key={row.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									onClick={() => {
										navigate(RoutsPath.user + row.id);
									}}
								>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell align="left">{row.email}</TableCell>
									<TableCell align="left">{row.name}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}></TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};
