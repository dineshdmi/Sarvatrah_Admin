import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import ChangePassword from './Components/Pages/ChangPassword';
import User from './Components/User';
import Notifications from './Components/Pages/Notifications';
import './index.css';
import SideBar from './Components/SideBar';
import TopNavbar from './Components/Topnavbar';
import SubAdmin from './Components/Sub_Admin';
import NewBooking from './Components/BookingHistory/NewBooking';
import Accept from './Components/BookingHistory/AcceptBooking'
import Pending from './Components/BookingHistory/PendingPage'
import CancelPage from './Components/BookingHistory/CancelPage';

import ActivityPackage from './Components/Packages/ActivityPackage';
import AdventurePackage from './Components/Packages/AdventurePackage';
import HolidayPackage from './Components/Packages/HolidayPackage';
import PilgrimagePackage from './Components/Packages/PilgrimagePackage';


import PartialPayment from './Components/PartialPayment';
import Footer from './Components/Footer';
// import ProfilePage from './Components/Pages/Profile';

const App = () => {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
    <Router>
      <div className="flex min-h-max min-w-max lg:h-[132vh] md:h-[143vh] sm:h-[154vh] xs:h-[250dvh] xxs:h-[332dvh] bg-gray-200">
        <SideBar sidebar={sidebar} toggleSidebar={toggleSidebar} />
        <div className="flex-1">
          <TopNavbar sidebar={sidebar} />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<div>Dashboard</div>} />
              <Route path="/user" element={<User />} />
              <Route path="/subadmin" element={<SubAdmin />} />
              <Route path="/new" element={<NewBooking/>}/>
              <Route path="/accept" element={<Accept />} />
              <Route path="/pending" element={<Pending />} />
              <Route path="/activity" element={<ActivityPackage />} />
              <Route path="/adventure" element={<AdventurePackage />} />
              <Route path="/holiday" element={<HolidayPackage />} />
              <Route path="/pilgrimage" element={<PilgrimagePackage />} />

              <Route path="/payment" element={<PartialPayment />} />
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/notification" element={<Notifications />} />
              <Route path="/cancelPage" element={<CancelPage />} />

              <Route path="/logout" element={<div>Logout</div>} />
              {/* <Route path="/profilePage" element={<ProfilePage />} /> */}
            </Routes>
          </div>
        </div>        
      </div>
    </Router>
    
    </>
  );
};

export default App;
