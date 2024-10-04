import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosClient from '../axios-client';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [driverData, setDriverData] = useState({ name: '', license: '', phone: '' });
  const [driverId, setDriverId] = useState(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Fetch drivers from the API
  const fetchDrivers = async () => {
    try {
      const response = await axiosClient.get('/drivers');
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  // Open modal for creating or editing a driver
  const handleShowModal = (driver = { name: '', license: '', phone: '' }) => {
    setDriverData(driver);
    setDriverId(driver.id || null);
    setEditMode(!!driver.id);
    setShowModal(true);
  };

  // Handle form submission for creating or editing
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await axiosClient.put(`/drivers/${driverId}`, driverData);
      } else {
        await axiosClient.post('/drivers', driverData);
      }
      setShowModal(false);
      fetchDrivers(); // Refresh the list of drivers after submission
    } catch (error) {
      console.error('Error saving driver:', error);
    }
  };

  // Delete a driver
  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/drivers/${id}`);
      fetchDrivers();
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  // Handle form input changes dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDriverData({ ...driverData, [name]: value });
  };

  return (
    <>
      <div className="container">
        <h2>Conductores</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>
          Agregar Conductor
        </Button>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Licencia</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.id}</td>
                <td>{driver.name}</td>
                <td>{driver.license}</td>
                <td>{driver.phone}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleShowModal(driver)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(driver.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal para Crear/Editar */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editMode ? 'Editar Conductor' : 'Agregar Conductor'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del Conductor</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={driverData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Licencia</Form.Label>
                <Form.Control
                  type="text"
                  name="license"
                  value={driverData.license}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={driverData.phone}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {editMode ? 'Guardar Cambios' : 'Agregar Conductor'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Drivers;
