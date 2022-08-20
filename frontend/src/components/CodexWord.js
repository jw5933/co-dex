import { useState } from 'react';
import Toggleable from './Toggleable';

const Definitions = ({definitions, removeDefinition, editDefinition}) => {
  return (
    <>
      {definitions.map(definition =>
        <div key = {definition.id}>
          <dd>
            <Meaning meaning = {definition} editDefinition = {editDefinition}/>
          </dd>
          <dd>
            <button onClick={removeDefinition(definition)}>remove definition</button>
          </dd>
        </div>
      )}
    </>
  );
};

const Meaning = ({meaning, editDefinition}) => {
  const meaningStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5
  };
  const [def, setDef] = useState('');
  const [example, setExample] = useState('');
  const {definition, partOfSpeech, examples} = meaning;

  const openEditor = () => {
    setDef(definition);
  };
  const closeEditor = event => {
    event.preventDefault();
    setDef('');
  };

  const saveEdits = async event => {
    event.preventDefault();
    if (def !== definition) await editDefinition({...meaning, definition: def});
    else console.log('same def');
    closeEditor(event);
  };

  const createExample = () => {
    return (
      <>
        <form onSubmit={saveExample}>
          <textarea
            value = {example}
            onChange = {({target}) => setExample(target.value)}
          />
          <button type='submit'>save</button>
        </form>
      </>
    );
  };
  const saveExample = async (event) => {
    event.preventDefault();
    console.log('example', example);
    const newExamples = examples.concat(example);
    console.log(newExamples);
    await editDefinition({...meaning, examples: newExamples});
    setExample('');
  };

  const deleteExample = (example) => { //for button
    return async () => {
      const index = examples.indexOf(example);
      if (index < 0) return;
      const newExamples = examples.slice(0, index).concat(examples.slice(index+1));
      await editDefinition({...meaning, examples: newExamples});
    };
  };

  return (
    <div style={meaningStyle}>
      {
        def === '' ?
          <>
            <Definition definition = {definition} partOfSpeech = {partOfSpeech}/>
            <button onClick={openEditor}>edit definition</button>
          </>
          : <>
            <form>
              <textarea
                type={'text'}
                rows = '5'
                cols = '60'
                value = {def}
                onChange = {({target}) => setDef(target.value)}
              />
              <button onClick={saveEdits}>save changes</button>
              <button onClick={closeEditor}>cancel</button>
            </form>
          </>
      }
      <Examples examples = {examples} deleteExample = {deleteExample}/>
      <Toggleable showButtonLabel = 'create example' hideButtonLabel = 'cancel' top = {false}>
        {createExample()}
      </Toggleable>
    </div>
  );
};

const Definition = ({definition, partOfSpeech}) => {
  return(
    <div>
        ({partOfSpeech}) {definition}
    </div>
  );
};

const Examples = ({examples, deleteExample}) => {
  if (examples && examples.length > 0) {
    return (
      <div>
          examples
        <ul>
          {examples.map((example, index) =>
            <li key = {index}>
              {example}
              <button onClick={deleteExample(example)}>delete</button>
            </li>
          )}
        </ul>
      </div>
    );
  }
};

export {Definitions};