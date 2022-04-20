import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <Router>
    <App/>
  </Router>
);