import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Countries from './pages/Countries';
import Borders from './pages/Borders';
import Clients from './pages/Clients';
import Drivers from './pages/Drivers';
import MovementsTable from './pages/MovementsTable';
import { Signup } from './pages/Signup';

function Rutas() {
    return (
      <Router>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/countries" element={<Countries />} />
          <Route path="/borders" element={<Borders />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/drivers" element={<Drivers />} />
          {/* </Routes><Route path="/movements" element={<Movements />} /> */}
          <Route path="/movements" element={<MovementsTable />} />
        </Routes>
      </Router>
    );
  }

  export default Rutas;
