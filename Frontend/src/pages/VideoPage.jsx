import React, { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const VideoPage = ({ user, setUser }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const location = useLocation();
    const [maxWatchedTime, setMaxWatchedTime] = useState(0);
    let navigate = useNavigate();

    const video = location.state.video;

    useEffect(() => {

        const playVideo = async () => {
            // if (videoRef.current) {
            const vjsPlayer = videojs(videoRef.current, {
                controls: true,
                autoplay: false,
                preload: 'auto',
            });

            playerRef.current = vjsPlayer;


            vjsPlayer.currentTime(user.lastWatchedVideoTimestamp);
            vjsPlayer.on('timeupdate', async () => {
                const currentTime = vjsPlayer.currentTime();
                await axios.put("/user/timestamp", currentTime);
                if (currentTime > maxWatchedTime) {
                    setMaxWatchedTime(currentTime);
                }

                setUser({ ...user, lastWatchedVideoTimestamp: currentTime });
            });

            player.on('seeking', () => {
                const currentTime = player.currentTime();
                if (currentTime > maxWatchedTime) {
                    player.currentTime(maxWatchedTime);
                }
            });

            player.current.on('ended', async () => {
                console.log('Video has ended');
                await axios.post('/user/last-watched-video');
                navigate("/home");
            });



            // }

            await playVideo();
        }

    },);


    return (
        <div className='mt-40'>
            <div className='flex justify-around'>
                <div className='text-white w-96 bg-slate-600'>
                    <h2 className='text-white text-center mb-4'>{video.topic}</h2>
                    {video.videoInfo}
                </div>
                <video ref={videoRef} className="video-js" controls preload="auto" style={{ width: '70%', height: '500px' }} >
                    <source src={video.videoPath} type="video/mp4" />
                </video>
            </div>
        </div >
    );
}




