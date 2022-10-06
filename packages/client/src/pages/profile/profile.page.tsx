import { Container, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { fetchUserByID } from "../../store/reducer/user/user.reducer";
import { toUserSelector } from "../../store/reducer/user/user.selector";
import { useAppDispatch } from "../../store/state";

export const ProfilePage = () => {
  const user = useSelector(toUserSelector.user);
  const dispatch = useAppDispatch();
  return (
    <Container>
      <h1>Profile page</h1>
      <div className="name">Name: {user?.name || "Unset"}</div>
      <div className="email">Email: {user?.email}</div>
      <div className="id">ID: {user?.id}</div>
      <Button
        variant="contained"
        onClick={() => {
          console.log(user);
          user && dispatch(fetchUserByID(user?.id.toString()) as any);
        }}
      >
        Refresh
      </Button>
    </Container>
  );
};
