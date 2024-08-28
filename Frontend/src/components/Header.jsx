import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


export const Header = () => {
    let navigate = useNavigate()

    const handleAllVideos = () => {
        navigate("/home");
    }



    const handleLogout = async () => {
        try {
            toast.loading("Logging out", { id: "logout" });
            let res = await axios.post("/user/logout");
            if (res.status == 200) {
                toast.success("Logged out", { id: "logout" });
                navigate("/");
            }
        }
        catch (err) {
            toast.error(err.message, { id: "logout" });
        }
    }


    return (
        <nav class="bg-blue-950 dark:bg-gray-900 fixed w-full top-0 start-0 border-b border-gray-200 dark:border-gray-600 header-style z-20">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <button onClick={handleAllVideos} href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                    <span class="self-center text-2xl text-white font-semibold whitespace-nowrap dark:text-white">VTrain</span>
                </button>
                <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button onClick={handleLogout} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
                </div>
            </div>
        </nav>
    )
}
