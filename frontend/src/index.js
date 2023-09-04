import ReactDOM from 'react-dom/client';
import init from './init';

const start = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(init());
};

start();
