import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';


const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCountry, setCurrentCountry] = useState({ name: '' });
  const [name, setName] = useState('');
  const [countryId, setCountryId] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCountries();
  }, []);

  // Fetch countries from the API
  const fetchCountries = async () => {

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/countries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data)
    setCountries(response.data);
  };

  // Open modal for creating or editing a country
  const handleShowModal = (country = { name: '' }) => {
    setCurrentCountry(country);
    setName(country.name || '');
    setCountryId(country.id || null);
    setEditMode(!!country.id);
    setShowModal(true);
  };

  // Handle form submission for creating or editing
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/countries/${countryId}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/countries`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    setShowModal(false);
    fetchCountries(); // Refresh the list of countries after submission
  };

  // Delete a country
  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/countries/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchCountries();
  };

  return (
    <>
      <div className="container">
        <h2>Países</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>
          Agregar País
        </Button>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country.id}>
                <td>{country.id}</td>
                <td>{country.name}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleShowModal(country)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(country.id)}
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
            <Modal.Title>{editMode ? 'Editar País' : 'Agregar País'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del País</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {editMode ? 'Guardar Cambios' : 'Agregar País'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Countries;
