import './App.css';
import SignUp from './components/register/register';
import {QnA} from './components/qna/qna';
import {CipherComponent} from './components/caesarCipher/CipherComponent';
import {SignIn} from './components/authentication/login';
import {QnAAuthentication} from './components/authentication/qna-authentication';
import {CipherComponentAuthentication} from './components/authentication/caesarCipher-authentication';
import Home from './components/Home';
import {Feedback} from './components/Feedback/feedback';
import {Analysis} from './components/analysis/analysis';
import {BookTour} from './components/TourManager/bookTour';
import {OrderFood} from './components/kitchen/foodOrder';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import axios from "axios";
import OrderOutput from './components/kitchen/orderOutput'

function App() {
  axios.post('https://us-central1-csci5410-project-356905.cloudfunctions.net/fetchFoodMenu', {"Content-Type": "application/json"}).then(res => {
                if (res.data) {
                    localStorage.setItem("menu",JSON.stringify(res.data))

                } else {
                    alert("Unable to fetch food menu.");
                }

            }).catch(err => {
                alert(err);
            });
  return (
      // <SignUp />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/" element={<SignUp/>}/>
          <Route path="/qna" element={<QnA/>}/>
          <Route path="/cipher" element={<CipherComponent/>}/>
          <Route path="/login" element={<SignIn/>}/>
          <Route path="/qna-authenticate" element={<QnAAuthentication/>}/>
          <Route path="/cipher-authenticate" element={<CipherComponentAuthentication/>}/>
          <Route path='/feedback' element={<Feedback/>}/>
          <Route path='/analysis' element={<Analysis/>}/>
          <Route path='/booktour' element={<BookTour/>}/>
          <Route path='/foodorder' element={<OrderFood/>}/>
            <Route path='/orderid' element={<OrderOutput/>}/>

        </Routes>
      </BrowserRouter>
  );
}

export default App;
