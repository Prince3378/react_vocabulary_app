import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hook';
import { Result } from '../../types/Result';
import { Results } from '../../types/Results';
import { Vocabular } from '../../types/Vocabular';
import './Testing.css';

type Props = {
    setResults: (res: Results[]) => void,
    results: Results[],
    setWinner: (state: boolean) => void,
    setSelectedId: (num: number) => void,
};

export const Testing: React.FC<Props> = ({
  setResults, results, setWinner, setSelectedId,
}) => {
  const [user, setUser] = useState('');
  const [isName, setIsName] = useState<boolean>(true);

  const [isGame, setIsGame] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const words: Vocabular[] = useAppSelector(state => state.words.words);

  const random = useCallback((min: number, max: number, count: number) => {
    const arr: Vocabular[] = [];

    if (words.length < 10) {
      return arr;
    }

    while (arr.length < count) {
      const randomNumber = Math.floor(Math.random() * (max - min)) + min;

      if (arr.indexOf(words[randomNumber]) === -1) {
        arr.push(words[randomNumber]);
      }
    }

    return arr;
  }, [Math.floor]);

  const [visible, setVisible] = useState([...words]);
  const [timer, setTimer] = useState<number>(0);

  const [selectedWord, setSelectedWord] = useState(visible[words.length - 3]);

  const [wordsBtn, setWordsBtn] = useState<Vocabular[]>([
    selectedWord,
    ...random(0, words.length, 4)
      .filter(el => el.id !== selectedWord.id).slice(0, 3),
  ].sort((a, b) => a.translation.localeCompare(b.translation)));

  const [result, setResult] = useState<Result[]>([]);

  const firstStart = useCallback(() => {
    if (user.length === 0) {
      setIsName(false);

      return;
    }
    setIsGame(true);
    setTimer(Date.now());
  }, [user]);

  const getNewWord = (id: number, wi: number) => {
    const lastWord = {
      id: step,
      word: selectedWord.word,
      correct: selectedWord.id === wi,
    };

    setResult([...result, lastWord]);

    if (step === 10) {
      const currentUser = {
        id: results.length,
        userName: user,
        date: new Date().toLocaleDateString(),
        time: +((Date.now() - timer) / 60000).toFixed(2),
        list: [...result, lastWord],
        rate: [...result, lastWord]
          .filter(el => el.correct === true).length * 10,
      };

      setResults([...results, currentUser]);
      setWinner(true);
      setIsGame(false);
      setStep(1);
      setVisible([...words]);
      setSelectedId(3);

      return;
    }
    setStep(step + 1);

    const visibleArr = visible
      .filter(el => el.id !== id)
      .sort((a, b) => a.word.localeCompare(b.word));

    setVisible(visibleArr);
    setSelectedWord(visibleArr[0]);

    setWordsBtn([
      visibleArr[0],
      ...random(0, words.length, 4)
        .filter(el => el.id !== visibleArr[0].id).slice(0, 3),
    ].sort((a, b) => a.translation.localeCompare(b.translation)));
  };

  return (
    <div className="box is-background">
      {words.length < 10
        ? (<div className="box">
          <p className="title is-1 has-text-centered">
            {`${words.length === 0 ? 'Список слів порожній.' : 'Слів замало для тесту.'}`}
          </p>
          <button
            className="new-word-btn"
            onClick={() => setSelectedId(1)}
          >
            <Link
              className="test-link"
              to="/new-words"
            >
              Додати нові слова
            </Link>
          </button>
        </div>)
        : (<div>
          {!isGame && (
            <div className="first-step">
              <div className="field">
                <input
                  type="text"
                  className="input"
                  placeholder="Введіть ваше ім'я"
                  onChange={(e) => {
                    e.preventDefault();
                    setUser(e.target.value);
                  }}
                />
              </div>
              {!isName && <p className="has-text-danger">
                Потрібно ввести ім'я
              </p>}
              <button
                className="button is-info"
                onClick={() => {
                  firstStart();
                }}
              >
                Повторити слова
              </button>
            </div>
          )}
          {isGame && (
            <div className="box second-step">
              <div className="field">
                <p className="title is-2 has-text-centered">
                  Привіт, {user}!
                </p>
                <p className="title is-4 has-text-centered">Крок {step}</p>
                <p className="subtitle is-5 has-text-centered">
                  Оберіть вірний переклад
                </p>
              </div>
              <h1 className="title is-1 has-text-centered">
                {selectedWord.translation}
              </h1>

              <div className="field-btn">
                {wordsBtn.map(word => (
                  <button
                    key={word.id}
                    className="test-btn"
                    onClick={() => getNewWord(selectedWord.id, word.id)}
                  >
                    {step !== 10
                      ? `${word.word}`
                      : <Link
                        to="/results"
                        className="test-link"
                      >
                        <p className="link-text">{word.word}</p>
                      </Link>
                    }
                  </button>
                ))}
              </div>

              <progress
                className="progress is-info"
                value={step}
                max="10"
              ></progress>
            </div>
          )}
        </div>)}
    </div>
  );
};
