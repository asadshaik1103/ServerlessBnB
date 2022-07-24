import './App.css';
import SignUp from './components/register/register';
import { QnA } from './components/qna/qna';
import { CipherComponent } from './components/caesarCipher/CipherComponent';
import { SignIn } from './components/authentication/login';
import { QnAAuthentication } from './components/authentication/qna-authentication';
import { CipherComponentAuthentication } from './components/authentication/caesarCipher-authentication';
import Home from './components/Home';
import { Feedback } from './components/Feedback/feedback';
import { Analysis } from './components/analysis/analysis';
import { BookTour } from './components/TourManager/bookTour';
import { OrderFood } from './components/kitchen/foodOrder';
import { ConfirmOrder } from './components/kitchen/confirmOrder';
import Lexbot  from './components/lexbot/Lexbot';
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import axios from "axios";
import OrderOutput from './components/kitchen/orderOutput'
import UserLogs from './components/userLogs/userLogs';
import Visualisation from './components/visualisation/visualisation';
import { Rooms } from './components/rooms/rooms';
import React from 'react';

function App() {

  const [cognitoUser, setCognitoUser] = React.useState(null);
  const logout = () => {
    cognitoUser.signOut();
  }
  return (
    // <SignUp />
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home logout={logout} />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/qna" element={<QnA />} />
        <Route path="/cipher" element={<CipherComponent />} />
        <Route path="/login" element={<SignIn setCognitoUser={setCognitoUser} />} />
        <Route path="/qna-authenticate" element={<QnAAuthentication />} />
        <Route path="/cipher-authenticate" element={<CipherComponentAuthentication />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/analysis' element={<Analysis />} />
        <Route path='/booktour' element={<BookTour />} />
        <Route path='/foodorder' element={<OrderFood />} />
        <Route path='/orderid' element={<OrderOutput />} />
        <Route path='/confirmorder' element={<ConfirmOrder />} />
        <Route path='/admin' element={<UserLogs />} />
        <Route path='/visualisation' element={<Visualisation />} />
        <Route path='/lexbot' element={<Lexbot />} />
        <Route path='/rooms' element={<Rooms />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
