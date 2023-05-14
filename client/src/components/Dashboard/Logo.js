import React, { useState } from 'react'
import logo from "../../assets/images/logo/logo.jpg";
import axios from 'axios';

// const urlUploadLogo = "http://localhost:3001/server/upload/logo";
const urlUploadLogo = "/server/upload/logo";
const Logo = () => {
    const [file, setFile] = useState(null);
    // const [fileName, setFileName] = useState("");

    const [image, setImage] = useState({ preview: '', data: '' })
    const [status, setStatus] = useState('')

    const saveImage = async (e) => {
        // e.preventDefault();
        // if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0]);
        // setFileName(e.target.files[0].name);

        //     let img = e.target.files[0];
        //     setLogo(URL.createObjectURL(img));
        //     console.log(img);
        //     console.log("image name", e.target.files[0].name.split('.')[0]);
        //     console.log("image extension", e.target.files[0].name.split('.')[1]);
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img);
    }

    const uploadImage = async () => {
        
    }

    return (
        <div>
            <img src={logo} alt="logo" />
            <form onSubmit={uploadImage}>

                <input type='file' onChange={(e) => saveImage(e)} />
                <button type='submit'>Upload</button>
            </form>
        </div>
    )
}

export default Logo