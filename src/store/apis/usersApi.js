import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const usersApi = createApi({
  //step 3 start
  reducerPath: "users",
  //step 3 end
  //step 4 start
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  //step 4 end
  //step 5 start
  endpoints(builder) {
    return {
      removeUser: builder.mutation({
        invalidatesTags: ["User"],
        query: (user) => {
          return {
            url: `/users/${user.id}`,
            method: "DELETE",
          };
        },
      }),
      addUser: builder.mutation({
        invalidatesTags: ["User"],
        query: () => {
          return {
            url: "/users",
            method: "POST",
            body: { name: faker.name.fullName() },
          };
        },
      }),
      fetchUsers: builder.query({
        providesTags: ["User"],
        query: () => "/users",
      }),
    };
  },
});

export const { useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation } =
  usersApi;
export { usersApi };
