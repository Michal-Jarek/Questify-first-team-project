import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const questifyApi = createApi({
    reducerPath: "questifyApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "", //adres serwera z  backendem
        prepareHeaders: (headers, { getState }) => {
            const token = getState().token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (newUserData) => ({
                url: "/auth/register",
                method: "POST",
                body: newUserData,
            }),
            invalidatesTags: ["Auth"],
        }),
        login: builder.mutation({
            query: (userData) => ({
                url: "/auth/login",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["Auth"],
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["Auth"],
        }),
        deleteCard: builder.mutation({
            query: (id) => ({
              url: `/card/${id}`,
              method: "DELETE",
            }),
            invalidatesTags: ["Card"],
          }),
        
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useDeleteCardMutation,
} = questifyApi;
