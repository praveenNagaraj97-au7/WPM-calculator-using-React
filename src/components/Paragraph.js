import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  timer,
  calculateWPM,
  getTypesWords,
  errorCounter,
  takeRetest,
  getParagraph,
} from "../actions";

const PreFilledParagraph = () => {
  const { selected, time, wpm, errorCount } = useSelector(({ wpm }) => wpm);
  const [start, setStart] = useState(false);
  const dispatch = useDispatch();

  const handleTimer = () => {
    setInterval(() => {
      dispatch(timer());
      dispatch(calculateWPM());
    }, 1000);
  };

  return (
    <>
      <div className='container-paragraph'>
        {time === 0 ? <h1>Results</h1> : ""}
        <div className='display-result'>
          <div className='show-time-limit'>
            <h4>Time Left</h4>
            <h5>
              {0} : {time}
            </h5>
          </div>
          <div className='show-type-speed'>
            <h4>Typing speed</h4>
            <h5>{wpm} wpm</h5>
          </div>
          <div className='show-type-error'>
            <h4>Typing errors</h4>
            <h5>{errorCount} mistyped words</h5>
          </div>
        </div>

        {time > 0 ? (
          <>
            <div className='paragraph'>{selected}</div>
            {!start ? (
              <button
                onClick={() => {
                  setStart(true);
                  handleTimer();
                }}
                variant='contained'
                color='primary'
              >
                Start Typing Test
              </button>
            ) : (
              <textarea
                onChange={(ev) => {
                  dispatch(getTypesWords(ev.target.value));
                  dispatch(errorCounter());
                }}
                placeholder='type here'
              />
            )}
          </>
        ) : (
          <button
            onClick={() => {
              dispatch(takeRetest());
              dispatch(getParagraph());
            }}
          >
            Take Retest
          </button>
        )}
      </div>
    </>
  );
};

export default PreFilledParagraph;
