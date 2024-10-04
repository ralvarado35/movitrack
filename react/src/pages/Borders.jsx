import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import axiosClient from '../axios-client'; // Asegúrate de configurar axios correctamente

const Borders = () => {
  const [borders, setBorders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState(false);
  const [editingBorder, setEditingBorder] = useState(null);
  const [borderName, setBorderName] = useState('');
  const [countryId, setCountryId] = useState('');
  const [errors, setErrors] = useState(null);

  // Cargar fronteras y países cuando el componente se monte
  useEffect(() => {
    fetchBorders();
    fetchCountries();
  }, []);

  // Obtener fronteras desde la API
  const fetchBorders = async () => {
    try {
      const { data } = await axiosClient.get('/borders');
      setBorders(data);
    } catch (error) {
      console.error('Error al obtener fronteras:', error);
    }
  };

  // Obtener países desde la API
  const fetchCountries = async () => {
    try {
      const { data } = await axiosClient.get('/countries');
      console.log(data)
      setCountries(data);
    } catch (error) {
      console.error('Error al obtener países:', error);
    }
  };

  // Mostrar el modal para agregar o editar
  const handleShow = () => setShow(true);

  // Cerrar el modal y resetear el formulario
  const handleClose = () => {
    setShow(false);
    setEditingBorder(null);
    setBorderName('');
    setCountryId('');
    setErrors(null);
  };

  // Guardar o actualizar una frontera
  const handleSave = async () => {
    if (!borderName || !countryId) {
      setErrors('Por favor complete todos los campos.');
      return;
    }

    const payload = {
      name: borderName,
      country_id: Number(countryId),  // Convertir a número por si el backend lo necesita como ID numérico
    };

    console.log(payload)

    try {
      if (editingBorder) {
        await axiosClient.put(`/borders/${editingBorder.id}`, payload);
      } else {
        await axiosClient.post('/borders', payload);  // Crear nueva frontera
      }
      fetchBorders();  // Refrescar la lista de fronteras después de crear/editar
      handleClose();   // Cerrar el modal
    } catch (error) {
      console.error('Error al guardar la frontera:', error);
      setErrors('Error al guardar la frontera. Intente nuevamente.');
    }
  };

  // Preparar la frontera para editar
  const handleEdit = (border) => {
    setEditingBorder(border);
    setBorderName(border.name);
    setCountryId(border.country_id);
    handleShow();
  };

  // Eliminar una frontera
  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/borders/${id}`);
      fetchBorders();  // Refrescar la lista de fronteras después de eliminar
    } catch (error) {
      console.error('Error al eliminar frontera:', error);
    }
  };

  return (
    <div>
      <h1>Fronteras</h1>
      <Button variant="primary" onClick={handleShow}>Agregar Frontera</Button>

      {/* Listado de fronteras */}
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {borders.map((border) => (
            <tr key={border.id}>
              <td>{border.name}</td>
              <td>{border.country?.name}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(border)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(border.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para agregar o editar una frontera */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingBorder ? 'Editar Frontera' : 'Agregar Frontera'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errors && <Alert variant="danger">{errors}</Alert>}
          <Form>
            <Form.Group>
              <Form.Label>Nombre de la frontera</Form.Label>
              <Form.Control
                type="text"
                value={borderName}
                onChange={(e) => setBorderName(e.target.value)}
                placeholder="Nombre de la frontera"
              />
            </Form.Group>
            <Form.Group>
  <Form.Label>País</Form.Label>
  <Form.Select
    value={countryId}
    onChange={(e) => {
        console.log(e)
      const selectedCountryId = e.target.value;  // El valor por defecto es un string
      console.log(selectedCountryId)
                 // Verifica si no es un valor NaN
        setCountryId((selectedCountryId)); // Convierte el valor a número

    }}
  >
    <option value="">Seleccionar País</option>
    {countries.map((country) => (
      <option key={country.id} value={country.id}>
        {country.id} - {country.name}
      </option>
    ))}
  </Form.Select>
</Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleSave}>
            {editingBorder ? 'Guardar Cambios' : 'Agregar Frontera'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Borders;
