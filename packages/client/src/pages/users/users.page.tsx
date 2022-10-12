import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { IUser } from "../../types";
const rows: IUser[] = [];
export const UsersPage = () => {
  return (<Container maxWidth="xl">
            <h1>Users: </h1>
            <Box p={2} />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>№</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index: number) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index+1}
                      </TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
  );
};
