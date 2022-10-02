import React, { useEffect, useState } from 'react';
import { Vocabular } from '../../types/Vocabular';
import listWords from './ReadyListWords.json';

import '../NewWordsForm/NewWordsForm.css';

type Props = {
    words: Vocabular[],
    setWords: (word: any) => void,
};

export const NewWordsForm: React.FC<Props> = ({ words, setWords }) => {
  const [wordUA, setWordUA] = useState('');
  const [isWordUa, setIsWordUa] = useState<boolean>(false);

  const [wordENG, setWordENG] = useState('');
  const [isWordEng, setIsWordEng] = useState<boolean>(false);

  const [isOnTheList, setIsOnTheList] = useState<boolean>(false);

  const [initialId, setInitialId] = useState<number>(() => {
    const idFromStor = localStorage.getItem('initialId');

    try {
      return idFromStor ? JSON.parse(idFromStor) : 11;
    } catch (error) {
      return 11;
    }
  });

  useEffect(() => {
    localStorage.setItem('initialId', JSON.stringify(initialId));
  }, [initialId]);

  const addNewWord = () => {
    if (words
      .some(word => word.word === wordUA) || words
      .some(word => word.translation === wordENG)) {
      setIsOnTheList(true);
      setWordUA('');
      setWordENG('');

      return;
    }
    setIsWordUa(true);
    setIsWordEng(true);

    const newWord: Vocabular = {
      id: initialId,
      word: wordUA,
      translation: wordENG,
    };

    if (wordUA && wordENG) {
      setWords([...words, newWord]);
      setIsWordUa(false);
      setIsWordEng(false);
      setWordUA('');
      setWordENG('');
      setInitialId(initialId + 1);
      setIsOnTheList(false);
    }
  };

  const handleEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = e.target;

    switch (name) {
    case 'UAword':
      setWordUA(value);
      setIsWordUa(false);
      break;

    case 'ENGword':
      setWordENG(value);
      setIsWordEng(false);
      break;

    default:
      break;
    }
  };

  const addListWords = () => {
    if (words.length === 0) {
      setWords([...listWords]);

      return;
    }

    const arr = listWords.filter(el => words.every(item => item.id !== el.id));

    setWords([...words, ...arr]);
  };

  return (
    <div className="box is-background">
      <div className="box">
        <form onSubmit={(e) => {
          e.preventDefault();
          addNewWord();
        }}>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                name="UAword"
                value={wordUA}
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
                value={wordENG}
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
                onClick={() => addListWords()}
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
