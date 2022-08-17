import wordService from '../services/word';
import { useEffect } from 'react';
import { Meaning } from './Word';

const Codex = ({words, setWords}) => {
  useEffect(() => {
    wordService
      .getAll()
      .then(data => setWords(data));
  }, []);

  return (
    <>
      {words.map(word =>
        <div key = {word.id}>
          {word.word}
          <Definitions definitions = {word.definitions}/>
        </div>
      )}
    </>
  );
};

const Definitions = ({definitions}) => {
  return (
    <>
      {definitions.map(definition => <Meaning key = {definition.id} meaning = {definition}/>)}
    </>
  );
};

export default Codex;