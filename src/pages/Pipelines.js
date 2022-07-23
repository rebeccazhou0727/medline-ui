import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import onRequest from "../apis/RequestTemplate";


const PipelinePage = () => {
    const [pipelines, setPipelines] = useState([]);
    
    useEffect(() => {
        const fetchPipelines = async () => {
            const url = "https://fydp-coordinator.fly.dev/services.pipeline.v1.PipelineService/ListPipelines"
            const token = JSON.parse(window.localStorage.getItem("token")).token.id;
            
            const response = await onRequest(url, {offset:0, limit:100}, {'X-Auth-Token':token})

            setPipelines(response.pipeline);
        }

        fetchPipelines();
        
    },[])

    const pipelineDisplay = ({name, createdAt, id, metadata}) => {  
        return (
            <div style={{display:"flex"}}>
                <p>{name}, created at: {(new Date(Number(createdAt) * 1000)).toDateString()} </p>
                <Link to="/pipeline/upload" state={{"id": id, "labels": metadata.classification?.classNames}}>
                    <button >upload a photo</button>
                </Link>
            </div>
        )
    }

    return (
        <div>
            <h2>List of Pipelines</h2>

            {pipelines?.map(pipeline => {
                return pipelineDisplay(pipeline);
            })}

            <br></br>

            <Link to="/pipelines/create">
                <button>Create a new Pipeline</button>
            </Link>
            
        </div>
    )
}

export default PipelinePage;