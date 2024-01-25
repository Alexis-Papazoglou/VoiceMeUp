import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css'

const VoiceRequest = ({ setTranscript }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  setTranscript(transcript)

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <div className='btn-container'>
        <button onClick={SpeechRecognition.startListening}>Start mic</button>
        <button onClick={SpeechRecognition.stopListening}>Stop mic</button>
        <button onClick={resetTranscript}>Reset mic text</button>
      </div>
      <p>{transcript}</p>
    </div>
  );
};
export default VoiceRequest;