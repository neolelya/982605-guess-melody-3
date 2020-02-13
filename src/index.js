import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import questions from './mocks/questions';

const ERROR_COUNT = 3;

ReactDOM.render(
    <App errorsCount={ERROR_COUNT} questions={questions} />,
    document.querySelector(`#root`)
);
