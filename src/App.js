import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';
import Sidebar from "./components/Sidebar";
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';

export const AppContext = createContext();

function App() {
  const [userData, setUserData] = useState({
    userInfo: {
      name: '',
      email: '',
      phone: ''
    },
    plan: {
      planTitle: 'Arcade',
      paymentPlan: 'monthly',
      price: 9
    },
    addOns: []
  });


  return (
    <Router>
      <div className="App">
        <div className="container">
          <Sidebar />

          <AppContext.Provider value={{ userData, setUserData }}>
            <Routes>
              <Route path="/step1" element={<Step1 />} />
              <Route path="/step2" element={<Step2 />} />
              <Route path="/step3" element={<Step3 />} />
              <Route path="/step4" element={<Step4 />} />
              <Route path="/step5" element={<Step5 />} />
            </Routes>
          </AppContext.Provider>
        </div>
      </div>
    </Router>
  );
}

export default App;
