import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosClient from '../axios-client';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [clientData, setClientData] = useState({ name: '', email: '', phone: '', address: '' });
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  // Fetch clients from the API
  const fetchClients = async () => {
    try {
      const response = await axiosClient.get('/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  // Open modal for creating or editing a client
  const handleShowModal = (client = { name: '', email: '', phone: '', address: '' }) => {
    setClientData(client);
    setClientId(client.id || null);
    setEditMode(!!client.id);
    setShowModal(true);
  };

  // Handle form submission for creating or editing
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await axiosClient.put(`/clients/${clientId}`, clientData);
      } else {
        await axiosClient.post('/clients', clientData);
      }
      setShowModal(false);
      fetchClients(); // Refresh the list of clients after submission
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  // Delete a client
  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/clients/${id}`);
      fetchClients();
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  // Handle form input changes dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  return (
    <>
      <div className="container">
        <h2>Clientes</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>
          Agregar Cliente
        </Button>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.address}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleShowModal(client)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(client.id)}
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
            <Modal.Title>{editMode ? 'Editar Cliente' : 'Agregar Cliente'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del Cliente</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={clientData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={clientData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={clientData.phone}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={clientData.address}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {editMode ? 'Guardar Cambios' : 'Agregar Cliente'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Clients;
