import { useState, useEffect} from 'react';
import GetWordForm from './components/GetWordForm';
import Codex from './components/Codex';
import wordService from './services/word';

const App = () => {
  const [allWords, setAllWords] = useState([]);
  useEffect(() => {
    wordService
      .getAll()
      .then(data => setAllWords(data));
  }, []);

  return (
    <div>
      <GetWordForm words = {allWords} setWords = {setAllWords}/>

      {allWords.length > 0 ?
        <>
          <h2>saved words</h2>
          <Codex words = {allWords} setWords = {setAllWords}/>
        </>
        :
        <h2>no saved words.</h2>
      }
    </div>
  );
};

export default App;
