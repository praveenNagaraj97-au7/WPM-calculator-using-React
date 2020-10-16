import { combineReducers } from "redux";

import {
  GET_PARAGRAPH,
  TIMER,
  CALCULATE_WORDS_PER_MINUTE,
  TYPED_WORDS,
  ERROR_COUNTER,
  RETEST,
} from "../constants";

function wpmCalci(typedWords, seconds, errorCount) {
  let gross = typedWords.length / 5 / ((60 - seconds) / 10 / 60);
  let netWPM = gross - errorCount / (60 - seconds) / 10 / 60;
  return Math.round((netWPM * 100) / 100);
}

const paragraphReducer = (
  state = { time: 60, wpm: 0, typedWords: [], errorCount: 0 },
  action
) => {
  switch (action.type) {
    case GET_PARAGRAPH:
      return { ...state, selected: action.paragraph };

    case TIMER:
      if (state.time === 0) {
        return { ...state };
      }
      return { ...state, time: state.time - 1 };

    case TYPED_WORDS:
      return {
        ...state,
        typedWords: action.words.split(" ").filter((each) => each !== ""),
      };

    case CALCULATE_WORDS_PER_MINUTE:
      return {
        ...state,
        wpm: wpmCalci(state.typedWords, state.time, state.errorCount),
      };

    case ERROR_COUNTER:
      const actualText = state.selected.split(" ");
      let errorCount = 0;
      for (let i = 0; i < state.typedWords.length; i++) {
        if (actualText[i] !== state.typedWords[i]) {
          errorCount++;
        }
      }
      return { ...state, errorCount };

    case RETEST:
      return { ...state, time: 60, wpm: 0, typedWords: [], errorCount: 0 };

    default:
      return state;
  }
};

export default combineReducers({
  wpm: paragraphReducer,
});
