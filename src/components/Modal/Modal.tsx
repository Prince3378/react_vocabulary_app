import classNames from 'classnames';
import React from 'react';
import { Results } from '../../types/Results';

type Props = {
  setIsModal: (state: boolean) => void,
  selectedUser: Results,
};

export const Modal: React.FC<Props> = ({ setIsModal, selectedUser }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{`Ім'я - ${selectedUser.userName}`}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => setIsModal(false)}
          ></button>
        </header>
        <section className="modal-card-body">
          <ul>
            {selectedUser.list.map((word, index) => (
              <li
                key={word.id}
                className={classNames({ 'has-text-danger': !word.correct,
                  'has-text-success': word.correct })}
              >
                {`${index + 1}. ${word.word}`}
              </li>
            ))}
          </ul>
        </section>
        <footer className="modal-card-foot is-justify-content-space-around">
          <div>{`Дата - ${selectedUser.date}`}</div>
          <div>{`Час - ${selectedUser.time} хв.`}</div>
          <div>{`Відсоток - ${selectedUser.rate} %`}</div>
        </footer>
      </div>
    </div>
  );
};
