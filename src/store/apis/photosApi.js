import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const photosApi = createApi({
  //step 3 start
  reducerPath: "photos",
  //step 3 end
  //step 4 start
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  //step 4 end
  //step 5 start
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          const tags = result.map((photo) => {
            return { type: "Photo", id: photo.id };
          });
          tags.push({ type: "AlbumPhoto", id: album.id });
          return tags;
        },
        query: (album) => {
          return {
            url: "/photos",
            params: {
              albumId: album.id,
            },
            method: "GET",
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: "AlbumPhoto", id: album.id }];
        },
        query: (album) => {
          return {
            method: "POST",
            url: "/photos",
            body: {
              albumId: album.id,
              url: faker.image.abstract(150, 150, true),
            },
          };
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => {
          return [{ type: "Photo", id: photo.id }];
        },
        query: (photo) => {
          return {
            method: "DELETE",
            url: `/photos/${photo.id}`,
          };
        },
      }),
    };
  },
});
//step 5 end

//step 6 start
export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;
export { photosApi };
//step 6 end
