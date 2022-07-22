import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Authenticator from './UserAuthenticate';
import PipelinePage from '../pages/Pipelines';
import PipelineCreate from './PipelineCreate';
import ImageUploader from './ImageUpload';

function App() {
  // only allows pipelines display if session key is valid
  const checkTokenTimestamp = () => {
    const tokenString = window.localStorage.getItem("token");
    const timestamp = tokenString ? JSON.parse(tokenString).expiresAt : 0;

    console.log( Number(timestamp) < (Date.now() / 1000));

    return Number(timestamp) < (Date.now() / 1000);
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Authenticator />} />
        <Route exact path="/pipelines" element={checkTokenTimestamp ? <PipelinePage /> : <Navigate to="/" />} />
        <Route exact path="/pipelines/create" element={<PipelineCreate />} />
        <Route exact path="/pipeline/upload" element={<ImageUploader />} />
      </Routes>
    
    </div>
  );
}

export default App;
