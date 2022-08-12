import { useState, useEffect } from 'react';
import wordService from './services/word';

const App = () => {
  const [allWords, setAllWords] = useState('');
  const [newWord, setNewWord] = useState([]);

  useEffect(() => {
    wordService
      .getAll()
      .then(data => setAllWords(data));
  }, []);

  useEffect(() => {
    wordService
      .getWord('word')
      .then (data => setNewWord(data));
  }, []);

  if (newWord.length === 0){
    <div>
      <p>no word yet</p>
    </div>
  }
  else{
    return (
      <div >
        <h2>{allWords}</h2>
        <Word word = {newWord}/>
      </div>
    );
  }
  
}

const Word = ({word}) => {
  console.log(word)
  return(
    <>
      {word.map((result, index) => 
          <Meanings key = {`${result.word}${index}`} meanings = {result.meanings} newKey= {`${result.word}${index}`}/>
      )}
    </>
  )
}

const Meanings = ({meanings, newKey}) => {
  console.log(meanings)
  return(
    <>
      {meanings.map( 
        meaning => {
          return (
            <div key = {meaning.partOfSpeech}>
              <h2>type: {meaning.partOfSpeech}</h2>
              {meaning.definitions.map((definition, index) => 
                <Definition key = {`${newKey}${meaning.partOfSpeech}${index}`} defObj = {definition}/>
              )}
            </div>
          )
        }
      )}
    </>
  )
}

const Definition = ({defObj}) => {
  return(
    <div>
    <li>
      {defObj.definition}
    </li>
    <Example example = {defObj.example}/>
    </div>
  )
}

const Example = ({example}) => {
  if (example) {
    return(
      <>
        <li>example: {example}</li>
      </>
    )
  }
}

export default App;
