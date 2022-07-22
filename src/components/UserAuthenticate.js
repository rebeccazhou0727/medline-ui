import React, {useState} from "react";
import PipelinePage from "../pages/Pipelines";
import onRequest from "../apis/RequestTemplate";

const Authenticator = () => {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [isValid, setIsValid] = useState(false);

    const onSubmitEmail = async () => {
        const url = 'https://fydp-coordinator.fly.dev/services.user.v1.UserService/NewChallenge';
        const data = await onRequest(url, {email});
        console.log(data);
    }

    const onSubmitCode = async () => {
        const url = 'https://fydp-coordinator.fly.dev/services.user.v1.UserService/Authenticate';
        const token = await onRequest(url, {code});
        window.localStorage.setItem("token", JSON.stringify(token));
        setIsValid(true);
    }

    return (
        <div>
            {isValid ? (
                <PipelinePage />
            ) : (
                <div>
                    <h2>User Authentication</h2>

                    <div>Enter your email</div>
                    <input styles="width: 200px" type="text" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                    <button onClick={onSubmitEmail}>Submit</button>

                    <div>Enter the email confirmation code</div>
                    <input styles="width: 200px" type="text" onChange={(e) => setCode(e.target.value)} value={code}></input>
                    <button onClick={onSubmitCode}>Authenticate</button>
                </div>
            )}
        </div>
        
    )
}

export default Authenticator;