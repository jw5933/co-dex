import definitionService from '../services/definition';
import wordService from '../services/word';

const Word = ({wordObj}) => {
  const addDefinition = async definition => {
    const word = wordObj.word;
    const findWord = async () => {
      try {
        const foundWord = await wordService.getWord(word);
        return foundWord;
      }
      catch(exception){
        console.log(exception);
      }
    };
    const addDefTo = async word => {
      try{
        const wordWithDef = await wordService.addDefinitionToWord({definition, word});
        //remove definition from word
        console.log(wordWithDef);
      }
      catch(exception){
        console.log(exception);
      }
    };
    /*
    see if word exists
    if exists: add definition to definitions array and make a put request
    otherwise: create word with new definitions array w/ post
    */
    try{
      const foundWord = await findWord();
      if (foundWord.length > 0){
        console.log('word exists, adding');
        //add definition
        addDefTo(foundWord[0]);
      }
      else{
        console.log('word dne, creating');
        //create word
        const createdWord = await wordService.addWord(word);
        //add definition
        addDefTo(createdWord);
      }
    }
    catch(exception){
      console.log(exception);
    }

  };

  if (!wordObj || wordObj.length === 0) {
    return (
      <div>
        <p>no word found.</p>
      </div>
    );
  }
  else {
    return(
      <div>
        <h2>{wordObj.word}</h2>
        <Meanings meanings = {wordObj.results} addDefinition = {addDefinition}/>
      </div>
    );
  }
};

const Meanings = ({meanings, addDefinition}) => {
  return(
    <>
      {meanings.map(
        (meaning, index) => {
          return (
            <div key = {index}>
              <Meaning meaning = {meaning} addDefinition = {addDefinition}/>
            </div>
          );
        }
      )}
    </>
  );
};

const Meaning = ({meaning, addDefinition}) => {
  const {definition, partOfSpeech, examples} = meaning;
  const meaningStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const createDefinition = async () => {
    const newDef = await definitionService.addDefinition({definition, partOfSpeech, examples});
    addDefinition(newDef);
  };

  return (
    <div style={meaningStyle}>
      <Definition definition = {definition} partOfSpeech = {partOfSpeech}/>
      <Example examples = {examples}/>
      {addDefinition ? <button onClick={createDefinition}>save definition</button> : null}
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
        {examples.map((ex, i) => <li key = {i}>{ex}</li>)}
      </div>
    );
  }
};

export {Word, Meaning};