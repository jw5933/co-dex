import wordService from '../services/word';
import definitionService from '../services/definition';
import { useEffect, useState } from 'react';
import { Definitions } from './CodexWord';
import Toggleable from './Toggleable';

const Codex = ({words, setWords}) => {
  console.log('refreshing codex');
  const [filter, setFilter] = useState('');
  const re = new RegExp(filter, 'i');
  const filteredWords = words.filter(word => word.word.match(re));

  const removeWord = word => {
    return async () => {
      try{
        const removedWord = await wordService.removeWord(word);
        const newWords = words.filter(word => word.id !== removedWord.id);
        setWords(newWords);
      }
      catch(exception){
        console.log(exception);
      }
    };
  };

  const removeDefinition = word => {
    return definition => {
      return async () => {
        try {
          const removedDefintion = await definitionService.removeDefinition(definition);
          const newDefinitions = word.definitions.filter(def => def.id !== removedDefintion.id);
          const newWord = {...word, definitions: newDefinitions};
          setWords(words.map(word => word.id === newWord.id? newWord : word));
        }
        catch (exception){
          console.log(exception);
        }
      };
    };
  };

  const editDefinition = word => {
    return newDefinition => {
      return async () => {
        try {
          const updatedDef = await definitionService.updateDefinition(newDefinition);
          const newDefinitions = word.definitions.map(def => def.id === updatedDef.id ? updatedDef : def);
          const newWord = {...word, definitions: newDefinitions};
          setWords(words.map(word => word.id === newWord.id? newWord : word));
        }
        catch (exception){
          console.log(exception);
        }
      };
    };
  };

  useEffect(() => {
    wordService
      .getAll()
      .then(data => setWords(data));
  }, []);

  return (
    <Toggleable showButtonLabel = 'show codex' hideButtonLabel = 'hide codex'>
      <div>
        filter:
        <input
          value = {filter}
          onChange = {({target}) => setFilter(target.value)}
        />
      </div>

      {filteredWords.map(word =>
        <div key = {word.id}>
          <dl>
            <dt>{word.word}</dt>
            <dt>
              <button onClick={removeWord(word)}>remove word</button>
            </dt>
            <Definitions
              definitions = {word.definitions}
              removeDefinition = {removeDefinition(word)}
              editDefinition = {editDefinition(word)}
            />
          </dl>
        </div>
      )}
    </Toggleable>
  );
};



export default Codex;