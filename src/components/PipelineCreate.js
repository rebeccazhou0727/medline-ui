import React, {useState} from "react";
import onRequest from "../apis/RequestTemplate";
import { Link } from "react-router-dom";

const PipelineCreate = () => {
    const [name, setName]= useState("")
    const [label, setLabel] = useState("");
    const [labels, setLabels] = useState([]);
    const [kind, setKind] = useState("");
    const [baseModel, setBaseModel] = useState("");

    const addLabel = () => {
        setLabels(arr => [...arr, label]);
        setLabel('');
    }

    const displayLabel = (label) => {
        return (
            <div>
                <p>{label}</p>
                <button onClick={()=> {deleteLabel(label)}}>Delete</button>
            </div>
        )
    }

    const deleteLabel = (label) => {
        setLabels(labels.filter(item => item !== label));
    }

    const onCreatePipeline = async () => {
        const url = 'https://fydp-coordinator.fly.dev/services.pipeline.v1.PipelineService/CreatePipeline';
        const token = JSON.parse(window.localStorage.getItem("token")).token.id;

        const metadata = btoa(JSON.stringify(labels));

        const response = await onRequest(url, {name, kind, base_model:baseModel, metadata}, {'X-Auth-Token':token});

        console.log(response);
    }

    return (
        <div>
            <h2>Create a pipeline</h2>
            <h3>Name</h3>
            <input styles="width: 200px" type="text" onChange={(e) => setName(e.target.value)}></input>
            <h3>Base Model</h3>
            <form>
                <input styles="width: 200px" type="radio" id="b7" name="base_model" value="efficientnet_b7" onClick={(e) => {setBaseModel(e.target.value)}}></input>
                <label htmlFor="b7">efficientnet_b7</label>
                <input styles="width: 200px" type="radio" id="v2_50" name="base_model" value="resnet_v2_50" onClick={(e) => {setBaseModel(e.target.value)}}></input>
                <label htmlFor="v2_50">resnet_v2_50</label>
            </form>
            <h3>Kind</h3>
            <form>
                <input styles="width: 200px" type="radio" id="unspecified" name="kind" value="KIND_UNSPECIFIED" disabled></input>
                <label htmlFor="unspecified">KIND_UNSPECIFIED</label>
                <input styles="width: 200px" type="radio" id="classification" name="kind" value="KIND_CLASSIFICATION" onClick={(e) => {setKind(e.target.value)}}></input>
                <label htmlFor="classification">KIND_CLASSIFICATION</label>
            </form>
            <h3>Labels</h3>
            <input styles="width: 200px" type="text" id="label_id" onChange={(e) => setLabel(e.target.value)} value={label}></input>
            <button onClick={addLabel}>Add</button>
            {labels.map(label => {
                return displayLabel(label);
            })}
            <br></br>

            <Link to="/pipelines" onClick={onCreatePipeline}>
                <button >Create the Pipeline</button>
            </Link>
            

            
        </div>
    )
}

export default PipelineCreate;