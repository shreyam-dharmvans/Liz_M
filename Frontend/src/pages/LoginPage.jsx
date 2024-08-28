import React, { useRef } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'


export const LoginPage = ({ setUser }) => {

    let email = useRef();
    let password = useRef();
    let navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            toast.loading("Logging in", { id: "login" });
            let res = await axios.post("/user/login", {
                email: email.current.value,
                password: password.current.value,
            })



            if (res.status == 200) {
                toast.success("Logged in", { id: "login" });
                setUser(res.data.user);
                navigate('/home');
            }


        } catch (err) {
            console.log(err);
            toast.error(err.message, { id: "login" });
        }

    }


    return (
        <div className='mt-40'>
            <form class="max-w-sm mx-auto form-style" onSubmit={(e) => submitHandler(e)}>
                <div class="mb-10">
                    <label for="email" class=" mb-2 text-sm font-medium text-white dark:text-white">Your email</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required ref={email} />
                </div>
                <div class="mb-10">
                    <label for="password" class="mb-2 text-sm font-medium text-white dark:text-white">Your password</label>
                    <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required ref={password} />
                </div>
                <button type="submit" class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </div>
    )
}
