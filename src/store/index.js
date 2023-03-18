import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
//import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";
import { usersApi } from "./apis/usersApi";

//step 7 start
export const store = configureStore({
  reducer: {
    //users: usersReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  },
});

setupListeners(store.dispatch);
//step 7 end

// export * from "./thunks/fetchUsers";
// export * from "./thunks/addUser";
// export * from "./thunks/removeUser";

//step 8 start
export {
  useFetchUsersQuery,
  useAddUserMutation,
  useRemoveUserMutation,
} from "./apis/usersApi";
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from "./apis/albumsApi";
export {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} from "./apis/photosApi";

//step 8 end
