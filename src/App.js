import logo from './logo.svg';
import './App.css';
import SignUp from './components/register/register';
import { QnA } from './components/qna/qna';
import Home from './components/Home';

// import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    // <SignUp />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/qna" element={<QnA />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
