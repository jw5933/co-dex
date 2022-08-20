import { useState } from 'react';

const Toggleable = props => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = {display: visible ? '' : 'none'};
  const hideWhenVisible = {display: visible ? 'none' : ''};

  const handleVisibility = (event) => {
    event.preventDefault();
    setVisible(!visible);
  };

  return (
    <div>
      <div style = {hideWhenVisible}>
        <button onClick={handleVisibility}>{props.showButtonLabel}</button>
      </div>
      <div style = {showWhenVisible}>
        {props.top?
          <>
            <button onClick={handleVisibility}>{props.hideButtonLabel}</button>
            {props.children}
          </>
          :
          <>
            {props.children}
            <button onClick={handleVisibility}>{props.hideButtonLabel}</button>
          </>

        }
      </div>
    </div>
  );
};

export default Toggleable;