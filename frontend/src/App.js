import { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import VoiceRequest from './VoiceRequest';
import Autocomplete from './Autocomplete';
import './App.css'

function App() {
  const [model, setModel] = useState('');
  const [text, setText] = useState('');
  const [audioURL, setAudioURL] = useState([]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [transcript, setTranscript] = useState(null)
  const [autoPlay, setAutoPlay] = useState(false)
  const [requestProgress, setRequestProgress] = useState('no request')
  const [modelList, setModelList] = useState([])
  const [isVoiceUsed, setIsVoiceUsed] = useState(false);
  const [isTextUsed, setIsTextUsed] = useState(false);

  const API = `https://voicemeapi.onrender.com` || 'http://localhost:3001'

  useEffect(() => {
    async function getModelList() {
      try {

        const res = await fetch(`${API}/list`)
        const data = await res.json()
        setModelList(data.models)
        console.log('Got the models')
      } catch (error) {
        throw error
      }
    }

    getModelList()
  }, [])

  useEffect(() => {
    if (transcript) {
      setIsVoiceUsed(true);
      setIsTextUsed(false);
    }
  }, [transcript])

  const handleTextInputChange = (e) => {
    setText(e.target.value);
    if (e.target.value.trim() !== '') {
      setIsTextUsed(true);
      setIsVoiceUsed(false);
    }
  };

  const handleAudioEnded = () => {
    // Check if there are more audio URLs to play
    if (currentAudioIndex < audioURL.length - 1) {
      setCurrentAudioIndex(currentAudioIndex + 1);
      setAutoPlay(true)
    } else {
      setCurrentAudioIndex(0)
      setAutoPlay(false)
    }
  };

  const generateTTS = async () => {
    setRequestProgress('in progress')
    try {
      const res = await fetch(`${API}/generate-tts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          text: text
        })
      })
      const data = await res.json()
      setAudioURL(data.buffers)
      setRequestProgress('finished')
    } catch (error) {
      throw error
    }
  }

  const generateTTSfromVoice = async () => {
    setRequestProgress('in progress')
    console.log(transcript)
    try {
      const res = await fetch(`${API}/generate-tts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          transcript: transcript
        })
      })
      const data = await res.json()
      setAudioURL(data.buffers)
      setRequestProgress('finished')
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="App">
      <h1>Voice me Up or just voice me App!</h1>
      <h4>Ask a question and get a response from a famous person of your choice</h4>
      <p>Use the input box to see the available models that can answer to you. </p>
      <div className='form-input'>
        {modelList.length === 0 ? (
          <p>Waiting to fetch the whole model list, until then you can try the default model: Elon Musk (Version 3.0)</p>
        ) : (
          <Autocomplete models={modelList} setModel={setModel}></Autocomplete>
        )}
      </div>
      <div>
        <label className='form-input'>
          <textarea placeholder='Ask a question!' value={text} onChange={handleTextInputChange} />
        </label>
        <VoiceRequest setTranscript={setTranscript}></VoiceRequest>
      </div>
      <div>
        <div className='btn-container'>
          <button
            onClick={generateTTS}
            disabled={isVoiceUsed}
            style={isTextUsed ? { backgroundColor: 'lightblue' } : {}}
          >
            Generate TTS
          </button>
          <button
            onClick={generateTTSfromVoice}
            disabled={isTextUsed}
            style={isVoiceUsed ? { backgroundColor: 'lightblue' } : {}}
          >
            Generate voice TTS
          </button>
        </div>
        <div>
          <div>
            {requestProgress === 'finished' ? (
              <ReactAudioPlayer
                className='audio-player'
                src={audioURL[currentAudioIndex]}
                controls
                onEnded={handleAudioEnded}
                autoPlay={autoPlay}
              />
            ) : requestProgress === 'in progress' ? (
              <p>Loading...</p>
            ) : requestProgress === 'no request' ? (
              <p>No request</p>
            ) : null /* Optional: Handle other values as needed */
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
