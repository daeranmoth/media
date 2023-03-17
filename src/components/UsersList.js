//import { useEffect } from "react";
//import { useSelector } from "react-redux";
//import { fetchUsers, addUser } from '../store';
//import { useThunk } from '../hooks/use-thunk';
import UsersListItem from "./UsersListItem";
import { useFetchUsersQuery, useAddUserMutation } from "../store";
import Skeleton from "./Skeleton";
//import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
//import AlbumsListItem from "./AlbumsListItem";

// function UsersList() {
//   const [doFetchUsers, isLoadingUsers, loadingUsersError] =
//     useThunk(fetchUsers);
//   const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);
//   const { data } = useSelector((state) => {
//     return state.users;
//   });

//   useEffect(() => {
//     doFetchUsers();
//   }, [doFetchUsers]);

//   const handleUserAdd = () => {
//     doCreateUser();
//   };

function UsersList({ user }) {
  const { data, error, isFetching } = useFetchUsersQuery(user);
  const [addUser, results] = useAddUserMutation();

  const handleAddUser = () => {
    addUser(user);
  };

  let content;
  if (isFetching) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (error) {
    content = <div>Error fetching data...</div>;
  } else {
    console.log(data);
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={results.isLoading} onClick={handleAddUser}>
          + Add User
        </Button>
      </div>
      {content}
    </div>
  );
}

export default UsersList;
