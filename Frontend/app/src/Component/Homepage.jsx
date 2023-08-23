import React, { useState, useRef } from 'react';
import '../Component/Style.css';

const Homepage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [showStartRecordingButton, setShowStartRecordingButton] = useState(true);
  const [recordingURL, setRecordingURL] = useState(null);

  const videoRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });

    
      videoRef.current.srcObject = stream;

      const recorder = new MediaRecorder(stream);
      const recordingpart = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordingpart.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordingpart, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);

    
        localStorage.setItem('recordedVideo', url);
        setRecordingURL(url);

        recordingpart.length = 0; // 

        setIsRecording(false);
        setShowStartRecordingButton(true);
      };

      setMediaRecorder(recorder);
      setIsRecording(true);
      setShowStartRecordingButton(false);

      recorder.start();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
    }
  };

  return (
    <div className="video-container-wrapper">
      <video id="video" ref={videoRef} className="video-container" autoPlay playsInline></video>
      
      <div className="recording-controls">
        {showStartRecordingButton ? (
          <button onClick={startRecording} className="recording-button" disabled={isRecording}>
            Start Recording
          </button>
        ) : (
          <button onClick={stopRecording} className="recording-button" disabled={!isRecording}>
            Stop Recording
          </button>
        )}
      </div>
    </div>
  );
};

export default Homepage;
