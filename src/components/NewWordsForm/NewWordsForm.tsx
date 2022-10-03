import React, { useEffect, useState } from 'react';
import { Vocabular } from '../../types/Vocabular';
import listWords from './ReadyListWords.json';

import '../NewWordsForm/NewWordsForm.css';
import { addWords, addListWords } from '../../store/wordsSlice';
import { useAppDispatch, useAppSelector } from '../../hook';

export const NewWordsForm: React.FC = () => {
  const [word, setWord] = useState('');
  const [isWordUa, setIsWordUa] = useState<boolean>(false);

  const [translation, setTranslation] = useState('');
  const [isWordEng, setIsWordEng] = useState<boolean>(false);

  const [isOnTheList, setIsOnTheList] = useState<boolean>(false);

  const [id, setId] = useState<number>(() => {
    const idFromStor = localStorage.getItem('initialId');

    try {
      return idFromStor ? JSON.parse(idFromStor) : 11;
    } catch (error) {
      return 11;
    }
  });

  useEffect(() => {
    localStorage.setItem('initialId', JSON.stringify(id));
  }, [id]);

  const handleEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = e.target;

    switch (name) {
    case 'UAword':
      setWord(value);
      setIsWordUa(false);
      break;

    case 'ENGword':
      setTranslation(value);
      setIsWordEng(false);
      break;

    default:
      break;
    }
  };

  const addListWord = () => {
    if (words.length === 0) {
      dispatch(addListWords(listWords));

      return;
    }

    const arr = listWords.filter(el => words.every(item => item.id !== el.id));

    dispatch(addListWords(arr));
  };

  const words: Vocabular[] = useAppSelector(state => state.words.words);
  const dispatch = useAppDispatch();
  const addWord = () => {
    if (words
      .some(w => w.word === word) || words
      .some(w => w.translation === translation)) {
      setIsOnTheList(true);
      setWord('');
      setTranslation('');

      return;
    }
    setIsWordUa(true);
    setIsWordEng(true);

    if (word && translation) {
      dispatch(addWords({ id, word, translation }));
      setIsWordUa(false);
      setIsWordEng(false);
      setWord('');
      setTranslation('');
      setId(id + 1);
      setIsOnTheList(false);
    }
  };

  return (
    <div className="box is-background">
      <div className="box">
        <form onSubmit={(e) => {
          e.preventDefault();
          addWord();
        }}>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                name="UAword"
                value={word}
                onChange={handleEvent}
                placeholder="Введіть нове слово"
                // eslint-disable-next-line max-len
                title="Сюди потрібно ввести слово яке ви хочете додати до словника"
              />
              <span className="icon is-small is-left">
                <i className="icon-flag icon-UAH"></i>
              </span>
            </p>
            {isWordUa && (
              <p className="has-text-danger">Слово українською відсутнє</p>
            )}
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                name="ENGword"
                value={translation}
                onChange={handleEvent}
                placeholder="Введіть переклад"
                // eslint-disable-next-line max-len
                title="Сюди потрібно ввести коректний переклад слова написаного вище в полі вводу"
              />
              <span className="icon is-small is-left">
                <i className="icon-flag icon-USD"></i>
              </span>
            </p>
            {isWordEng && (
              <p className="has-text-danger">Слово англійською відсутнє</p>
            )}
            {isOnTheList && (
              <p className="has-text-danger">Не додано! Слово вже є у списку</p>
            )}
          </div>
          <div className="footer-form">
            <div>
              <button
                className="button is-info"
                type="submit"
              >
                Додати слово
              </button>
              {words.length < 10 && (
                <div>
                  <p>Додайте мінімум 10 слів, для кращого проходження тесту.</p>
                  <p>
                    {`Залишилось
                      ${10 - words.length}
                      ${10 - words.length === 1 ? `слово` : ``}
                      ${(10 - words.length) < 5 && (10 - words.length) !== 1 ? `слова` : ``}
                      ${(10 - words.length) >= 5 ? `слів` : ``}
                    `}
                  </p>
                </div>
              )}
            </div>
            {words.length < 10 && (<div>
              <button
                className="button is-info"
                type="button"
                onClick={() => addListWord()}
              >
                Додати список
              </button>
              <p>Можна скористатись готовою підбіркою слів.</p>
            </div>)}
          </div>
        </form>
      </div>
    </div>
  );
};
