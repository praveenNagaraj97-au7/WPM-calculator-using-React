import { paragraph } from "../data";
import {
  GET_PARAGRAPH,
  TIMER,
  CALCULATE_WORDS_PER_MINUTE,
  TYPED_WORDS,
  ERROR_COUNTER,
  RETEST,
} from "../constants";

export const getParagraph = () => ({
  type: GET_PARAGRAPH,
  paragraph: paragraph[Math.floor(Math.random() * paragraph.length)],
});

export const timer = () => ({
  type: TIMER,
});

export const calculateWPM = () => ({
  type: CALCULATE_WORDS_PER_MINUTE,
});

export const getTypesWords = (words = []) => ({ type: TYPED_WORDS, words });

export const errorCounter = () => ({ type: ERROR_COUNTER });

export const takeRetest = () => ({ type: RETEST });
