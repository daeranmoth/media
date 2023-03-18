import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { useRemoveUserMutation } from "../store";
//import { removeUser } from "../store";
//import { useThunk } from '../hooks/use-thunk';
import AlbumsList from "./AlbumsList";

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
      {/* <Button className="mr-3" loading={isLoading} onClick={handleClick}>
        <GoTrashcan />
      </Button>
      {error && <div>Error deleting user.</div>} */}

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
