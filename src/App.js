import logo from './logo.svg';
import './App.css';
import SignUp from './components/register/register';
import { QnA } from './components/qna/qna';
import { CipherComponent } from './components/caesarCipher/CipherComponent';
import { SignIn } from './components/authentication/login';
import { QnAAuthentication } from './components/authentication/qna-authentication';
import { CipherComponentAuthentication } from './components/authentication/caesarCipher-authentication';
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
      <Route path="/cipher" element={<CipherComponent />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/qna-authenticate" element={<QnAAuthentication />} />
      <Route path="/cipher-authenticate" element={<CipherComponentAuthentication />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
