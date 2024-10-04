import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './Layout.css';

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true); // Estado para mostrar/ocultar sidebar

  const toggleSidebar = () => setShowSidebar(!showSidebar); // Cambia el estado del sidebar

  return (
    <div className="layout">
      {/* Navbar (Header) */}
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar fixed-top">
        <Container fluid>
          {/* Botón de toggle para ocultar/mostrar el sidebar */}
          <Button variant="outline-light" onClick={toggleSidebar}>
            {showSidebar ? 'Ocultar' : 'Mostrar'} Menú
          </Button>
          <Navbar.Brand href="#">Admin Panel</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {/* <Nav.Link href="#">Perfil</Nav.Link> */}
              <Nav.Link href="#">Salir</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sidebar (Toggle) */}
      <div className={`sidebar ${showSidebar ? '' : 'hide'}`}>
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/countries">Países</Link></li>
            <li><Link to="/borders">Fronteras</Link></li>
            <li><Link to="/clients">Clientes</Link></li>
            <li><Link to="/drivers">Conductores</Link></li>
            <li><Link to="/movements">Movimientos</Link></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`content-wrapper ${showSidebar ? '' : 'expanded'}`}>
        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
