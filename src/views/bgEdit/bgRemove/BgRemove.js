import React, { useState } from 'react';
import { CButton, CCard, CCardHeader, CCardBody, CFormLabel, CFormInput, CImage } from '@coreui/react';

function BgRemove() {
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ finalUrl, setFinalUrl ] = useState(null);
    const [ isUpload, setIsUpload ] = useState(false);

    const handleFileInputChange = (e) => {
        let image = e.target.files[ 0 ]; // it will return only first selected file
        console.log(image);
        setSelectedFile(image);
    };

    const handleFileUpload = async () => {
        setIsUpload(true);
        const formData = new FormData();
        formData.append("image_file", selectedFile);
        formData.append("size", "auto");

        const api_key = "vmRfYG1M3tbkMZfmCpcpJanN";

        // send to the server
        await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: {
                "X-Api-Key": api_key,
            },
            body: formData,
        })
            .then((response) => {
                return response.blob();
            })
            .then((blob) => {
                console.log(blob);
                const url = URL.createObjectURL(blob);
                setFinalUrl(url);
                setIsUpload(false);
            })
            .catch();
        setIsUpload(false);
    };


    return (
        <>
            <CCard className="mb-4">
                <CCardHeader>
                    <h1>Image background Remove</h1>
                </CCardHeader>
                <CCardBody>
                    <div className="mb-3">
                        <CFormLabel htmlFor="formFile">Select image from Local File</CFormLabel>
                        <CFormInput
                            type="file"
                            id="formFile"
                            onChange={handleFileInputChange}
                            required
                        />
                    </div>
                    {!isUpload ? (
                        <CButton color="primary" onClick={() => handleFileUpload()}>
                            Upload
                        </CButton>
                    ) : (
                        <CButton color="primary" onClick={() => handleFileUpload()}>
                            Uploading...
                        </CButton>
                    )}
                    <div className="mb-3">
                        {finalUrl && (
                            <a href={finalUrl} download="no-back.png">
                                <button className="btn btn_download">Download</button>
                            </a>
                        )}
                        {finalUrl && (
                            <div className="final_img_area">
                                <img src={finalUrl} alt="final_img" className="final_img" />
                            </div>
                        )}

                    </div>

                </CCardBody>
            </CCard>
        </>
    );
}

export default BgRemove;
