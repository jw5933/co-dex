import { useState } from 'react';

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
    if (def !== definition) await editDefinition({...meaning, definition: def})();
    else console.log('same def');
    closeEditor(event);
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
      <Example examples = {examples}/>
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

const Example = ({examples}) => {
  if (examples && examples.length > 0) {
    return (
      <div>
          examples
        <ul>
          {examples.map((ex, i) => <li key = {i}>{ex}</li>)}
        </ul>
      </div>
    );
  }
};

export {Definitions};