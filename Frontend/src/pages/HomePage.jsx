import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const [allVideos, setAllVideos] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        const getAllVideos = async () => {
            try {
                toast.loading("fetching data", { id: "fetch" });
                let res = await axios.get("/video/all-videos");


                if (res.status == 200) {
                    setAllVideos(res.data.allVideos);
                    toast.success("data fetched", { id: "fetch" });
                }

            } catch (err) {
                toast.error(err.message, { id: "fetch" });
            }

        }

        getAllVideos();
    }, [])



    const viewVideo = async (video) => {

        // try {
        //     toast.loading("fetching video", { id: "single video" });
        //     let res = await axios.get("/video/single-video", { id: video._id });

        //     if (res.status == 200) {
        //         toast.success("video fetched", { id: "single video" });
        navigate("/video", { state: { video } })
        //     }

        // } catch (err) {
        //     toast.error(err.message, { id: "single video" });
        // }

    }


    return (
        <div className=' mr-40 mt-40'>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg student-list">
                <table class=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-white uppercase bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Video Index
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Video Topic
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Watch Video
                            </th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {allVideos.map((video) => {
                            return <tr>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {video.index}
                                </th>
                                <td class="px-6 py-4">
                                    {video.topic}
                                </td>
                                <td class="px-6 py-4 text-blue-600">
                                    <button onClick={() => viewVideo(video)}>Watch Video</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
