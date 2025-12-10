import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
  id: number;
  name: string;
  email: string;
}

export type NewUser = Omit<User, 'id'>;

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    
    addUser: builder.mutation<User, NewUser>({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
      async onQueryStarted(newUser, { dispatch, queryFulfilled }) {
        try {
          const { data: createdUser } = await queryFulfilled;
          
          const patchedUser = { ...createdUser, id: Date.now() };

          dispatch(
            usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
              draft.push(patchedUser); 
            })
          );
        } catch {}
      },
    }),

    updateUser: builder.mutation<User, User>({
      query: (data) => ({
        url: `users/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
            const user = draft.find((u) => u.id === arg.id);
            if (user) {
              user.name = arg.name;
              user.email = arg.email;
            }
          })
        );
        
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation } = usersApi;