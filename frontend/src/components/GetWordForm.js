
import { useState } from 'react';
import {Word} from './Word';
import wordService from '../services/word';

const GetWordForm = ({words, setWords}) => {
  //console.log('refreshing form');
  const [search, setSearch] = useState('');
  const [wordObj, setWordObj] = useState(null);
  const [prompt, setPrompt] = useState('submit a word to see it\'s definition.');

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    await findWord(search);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setWordObj(null);
  };

  const findWord = async (word) => {
    try{
      const foundWord = await wordService.getWordFromAPI(word);
      setWordObj(foundWord);
      setSearch('');
    }
    catch(exception){
      setPrompt('no word found.');
      setTimeout(() => setPrompt('submit a word to see it\'s definition.'), 2000);
      console.log(exception);
    }
  };

  return (
    <>
      <form onSubmit = {handleOnSubmit} >
        <input
          value= {search}
          onChange = {handleSearch}
        />
        <button type = 'submit'>search</button>
      </form>
      {wordObj ?
        <Word wordObj = {wordObj}
          words = {words}
          setWords = {setWords}/>
        : <p>{prompt}</p>}
    </>
  );
};

export default GetWordForm;