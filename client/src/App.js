import './App.css';
import { Route, Routes } from 'react-router-dom';
import SharedLayout from './pages/SharedLayout';
import Home from './pages/Home';
import Error from './pages/Error';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Categories from './pages/Dashboard/Categories';
import Regions from './pages/Dashboard/Regions';
import Listing from './pages/Listing';
import Themes from './pages/Dashboard/Themes';

function App() {
  return (
    <Routes>
      <Route path='/' element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/account' element={<Account />} />
        <Route path='/listing/:nomcategorie/:idcategorie' element={<Listing />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/dashboard/*' element={<Dashboard />}>
          <Route path="categories" element={<Categories />} />
          <Route path='regions' element={<Regions />} />
          <Route path='themes' element={<Themes />} />
        </Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
