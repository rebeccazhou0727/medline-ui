import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { Annotator } from "image-labeler-react";
import onRequest from "../apis/RequestTemplate";
import { useLocation } from "react-router-dom";

import './ImageUpload.css'

const ImageUploader = () => {
    const [images, setImages] = useState([]);
    // only allowing 1 image upload
    const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {
        //data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    }

    const location = useLocation();
    const pipelineId = location.state.id;
    const labels = location.state.labels ?? [];

    return (
        <ImageUploading
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={["jpg"]}
        >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps
            }) => (
                <div className="upload__image-wrapper">
                    <button 
                        onClick={onImageUpload}
                        {...dragProps}
                    >
                        Click or Drop A Photo
                    </button>
                    {imageList.map((image, index) => (
                        <div>
                            <div key={index} className="image-item">
                                <img src={image.data_url} alt="" width="400" />
                                <div className="image-item__btn-wrapper">
                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                            </div>
                            <Annotator
                                height={600}
                                width={600}
                                imageUrl={image.data_url}
                                asyncUpload={ async (labeledData) => {
                                    if (labeledData.boxes[0]) {
                                        const base64jpeg = labeledData.image.split(",")[1];
                                        const url = 'https://fydp-coordinator.fly.dev/services.pipeline.v1.PipelineService/UploadTrainingData';
                                        const token = JSON.parse(window.localStorage.getItem("token")).token.id;
                                        
                                        const response = await onRequest(
                                            url, 
                                            {pipeline_id: pipelineId, classificationData:{data: [{image_jpg: base64jpeg, label: labeledData.annotation}]}},
                                            {'X-Auth-Token':token}
                                        );
                                        
                                        // response is current null
                                        console.log(response)
                                    }
                                }}
                                types={labels}
                                defaultType={labels[0]}
                            />
                        </div>

                        
                    ))}
                </div>
            )}

        </ImageUploading>
    );

}

export default ImageUploader;

