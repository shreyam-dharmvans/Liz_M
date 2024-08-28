import axios from 'axios';
import React, { useRef } from 'react'

export const Upload = () => {
    let videoFile = useRef();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post("/video/upload", videoFile.current.value);
            console.log(res);
        } catch (error) {
            console.log(error);
        }



    }
    return (
        <div className='mt-40'>
            <form action="" onSubmit={(e) => handleSubmit(e)}>
                <input type="file" ref={videoFile} />
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}
