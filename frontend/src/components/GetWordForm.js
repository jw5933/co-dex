
import { useState } from 'react';
import {Word} from './Word';
import wordService from '../services/word';

const GetWordForm = () => {
  const [search, setSearch] = useState('');
  const [wordObj, setWordObj] = useState(null);

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
      {wordObj ? <Word wordObj = {wordObj}/> : <p>{'submit a word to see it\'s definition.'}</p>}
    </>
  );
};

export default GetWordForm;