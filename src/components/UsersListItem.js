import { GoTrashcan } from "react-icons/go";
import { useRemoveUserMutation } from "../store";
import Button from "./Button";
//import { useThunk } from '../hooks/use-thunk';
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";
//import UsersList from "./UsersList";

// function UsersListItem({ user }) {
//   const [doRemoveUser, isLoading, error] = useThunk(removeUser);

//   const handleClick = () => {
//     doRemoveUser(user);
//   };

function UsersListItem({ user }) {
  const [removeUser, results] = useRemoveUserMutation();

  const handleRemoveUser = () => {
    removeUser(user);
  };

  const header = (
    <>
      <Button
        className="mr-3"
        loading={results.isLoading}
        onClick={handleRemoveUser}
      >
        <GoTrashcan />
      </Button>

      {user.name}
    </>
  );

  return (
    <ExpandablePanel key={user.id} header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
