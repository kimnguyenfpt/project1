import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { store } from './redux/store'; 

import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import ResetPassword from './components/reset/reset';
import Profile from './components/profile/Profile';
import Forgot from './components/forgot/Forgot';
import Devices from './components/devices/Devices';
import Add from './components/add/Add';
import Detail from './components/detail/Detail';
import Edit from './components/edit/Edit';
import Service from './components/dichvu/Service';
import AddService from './components/addService/AddService';
import ServiceDetail from './components/seriviceDetail/ServiceDetail';
import Number from './components/number/Number';
import NumberDetail from './components/numberdetail/NumberDetail';
import AddNumber from './components/addnumber/AddNumber';
import Role from './components/roles/Role';
import UpdateRole from './components/updateRole/UpdateRole';
import AddRole from './components/addRole/AddRole';
import Account from './components/accounts/Account';
import AddAccount from './components/addAccount/AddAccount';
import UpdateAccount from './components/UpdateAccount/UpdateAccount';
import UserLog from './components/userlog/UserLog';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/add-devices" element={<Add />} />
          
          <Route path="/devices/:deviceId" element={<Detail />} />
          <Route path="/devices/update/:deviceId" element={<Edit/>} />

          {/* Service */}
          <Route path="/service" element={<Service />} />
          <Route path="/add-service" element={<AddService />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} /> 

          {/* Number */}
          <Route path="/number" element={<Number />} />
          <Route path="/numbers/:numberId" element={<NumberDetail />} />
          <Route path="/add-number" element={<AddNumber/>} />


          {/* Role */}
          <Route path="/roles" element={<Role />} />
          <Route path="/roles/:documentId" element={<UpdateRole />} /> 
          <Route path="/roles/add" element={<AddRole />} />

          {/* Account */}
          <Route path="/accounts" element={<Account />} />
          <Route path="/add-account" element={<AddAccount />} />
          <Route path="/accounts/:accountId" element={<UpdateAccount />} />

          {/* User Log */}
          <Route path="/user-logs" element={<UserLog />} />



          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
