import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn, userLoggedOut } from '../authSlice';

const USER_API = "http://localhost:8080/api/v1/user/"

export const authApi = createApi({
    reducerPath:"authApi", //Any name but generally same as function
    baseQuery:fetchBaseQuery({
        baseUrl:USER_API,
        credentials:'include'
    }),
    endpoints:(builder)=>({ //callback
        registerUser:builder.mutation({
            query:(inputData)=>({
                url:"register",
                method:"POST",
                body:inputData
            })
        }),
        loginUser:builder.mutation({
            query:(inputData)=>({
                url:"login",
                method:"POST",
                body:inputData
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}){ //_ inplace of arg,bc no use as of now
                try{
                    const result = await queryFulfilled;//it return whole response
                    dispatch(userLoggedIn({user:result.data.user}));//action dispatch
                }catch(error){
                    console.log(error);
                }
            }
        }),
        logoutUser: builder.mutation({
            query: ()=>({
                url:"logout",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}){ //_ inplace of arg,bc no use as of now
                try{
                    dispatch(userLoggedOut());//action dispatch
                }catch(error){
                    console.log(error);
                }
            }
        }),
        loadUser:builder.query({
            query:()=>({
                url:"profile",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}){ //_ inplace of arg,bc no use as of now
                try{
                    const result = await queryFulfilled;//it return whole response
                    dispatch(userLoggedIn({user:result.data.user}));//action dispatch
                }catch(error){
                    console.log(error);
                }
            }
        }),
        updateUser: builder.mutation({
            query: (formData)=>({
                url:"profile/update",
                method:"PUT",
                body:formData,
                credentials:"include"
            })
        })
    })
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation,
    useLogoutUserMutation
} = authApi;