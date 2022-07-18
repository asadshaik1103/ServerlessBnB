import logo from './logo.svg';
import './App.css';
import SignUp from './components/register/register';
import { QnA } from './components/qna/qna';
import Home from './components/Home';
import { Feedback } from './components/Feedback/feedback';
import { Analysis } from './components/analysis/analysis';

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
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/qna" element={<QnA />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/analysis' element={<Analysis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
