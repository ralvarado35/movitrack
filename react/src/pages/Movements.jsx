import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import Layout from '../components/Layout';

const Movements = () => {
  const [movements, setMovements] = useState([]);
  const [clients, setClients] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [borders, setBorders] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentMovement, setCurrentMovement] = useState({});
  const [movementId, setMovementId] = useState(null);

  const [clientId, setClientId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [countryId, setCountryId] = useState('');
  const [borderId, setBorderId] = useState('');
  const [date, setDate] = useState('');
  const [departureTimePredio, setDepartureTimePredio] = useState('');
  const [dispatchTimeClient, setDispatchTimeClient] = useState('');
  const [arrivalTimeBorder, setArrivalTimeBorder] = useState('');
  const [exitTimeBorder, setExitTimeBorder] = useState('');
  const [arrivalTimeWarehouse, setArrivalTimeWarehouse] = useState('');
  const [unloadingTimeWarehouse, setUnloadingTimeWarehouse] = useState('');
  const [observations, setObservations] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchMovements();
    fetchClients();
    fetchDrivers();
    fetchCountries();
    fetchBorders();
  }, []);

  const fetchMovements = async () => {
    const response = await axios.get('http://localhost:8000/api/movements', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMovements(response.data);
  };

  const fetchClients = async () => {
    const response = await axios.get('http://localhost:8000/api/clients', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setClients(response.data);
  };

  const fetchDrivers = async () => {
    const response = await axios.get('http://localhost:8000/api/drivers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDrivers(response.data);
  };

  const fetchCountries = async () => {
    const response = await axios.get('http://localhost:8000/api/countries', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCountries(response.data);
  };

  const fetchBorders = async () => {
    const response = await axios.get('http://localhost:8000/api/borders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setBorders(response.data);
  };

  const handleShowModal = (movement = {}) => {
    setCurrentMovement(movement);
    setMovementId(movement.movement_id || null);
    setClientId(movement.client_id || '');
    setDriverId(movement.driver_id || '');
    setCountryId(movement.country_id || '');
    setBorderId(movement.border_id || '');
    setDate(movement.date || '');
    setDepartureTimePredio(movement.departure_time_predio || '');
    setDispatchTimeClient(movement.dispatch_time_client || '');
    setArrivalTimeBorder(movement.arrival_time_border || '');
    setExitTimeBorder(movement.exit_time_border || '');
    setArrivalTimeWarehouse(movement.arrival_time_warehouse || '');
    setUnloadingTimeWarehouse(movement.unloading_time_warehouse || '');
    setObservations(movement.observations || '');

    setEditMode(!!movement.movement_id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      client_id: clientId,
      driver_id: driverId,
      country_id: countryId,
      border_id: borderId,
      date: date,
      departure_time_predio: departureTimePredio,
      dispatch_time_client: dispatchTimeClient,
      arrival_time_border: arrivalTimeBorder,
      exit_time_border: exitTimeBorder,
      arrival_time_warehouse: arrivalTimeWarehouse,
      unloading_time_warehouse: unloadingTimeWarehouse,
      observations: observations,
    };

    if (editMode) {
      await axios.put(`http://localhost:8000/api/movements/${movementId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      await axios.post('http://localhost:8000/api/movements', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    setShowModal(false);
    fetchMovements(); // Refresca la lista después de crear o editar
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/movements/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchMovements();
  };

  return (
    <>
      <div className="container">
        <h2>Movimientos</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>
          Agregar Movimiento
        </Button>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Conductor</th>
              <th>País</th>
              <th>Frontera</th>
              <th>Fecha</th>
              <th>Hora Salida Predio</th>
              <th>Hora Despacho Cliente</th>
              <th>Hora Llegada Frontera</th>
              <th>Hora Salida Frontera</th>
              <th>Hora Llegada Almacén</th>
              <th>Hora Descarga Almacén</th>
              <th>Observaciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <tr key={movement.movement_id}>
                <td>{movement.movement_id}</td>
                <td>{movement.client?.name}</td>
                <td>{movement.driver?.name}</td>
                <td>{movement.country?.name}</td>
                <td>{movement.border?.name}</td>
                <td>{movement.date}</td>
                <td>{movement.departure_time_predio}</td>
                <td>{movement.dispatch_time_client}</td>
                <td>{movement.arrival_time_border}</td>
                <td>{movement.exit_time_border}</td>
                <td>{movement.arrival_time_warehouse}</td>
                <td>{movement.unloading_time_warehouse}</td>
                <td>{movement.observations}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleShowModal(movement)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(movement.movement_id)}
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
            <Modal.Title>{editMode ? 'Editar Movimiento' : 'Agregar Movimiento'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Cliente</Form.Label>
                <Form.Select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  required
                >
                  <option value="">Seleccionar Cliente</option>
                  {clients.map((client) => (
                    <option key={client.client_id} value={client.client_id}>
                      {client.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Conductor</Form.Label>
                <Form.Select
                  value={driverId}
                  onChange={(e) => setDriverId(e.target.value)}
                  required
                >
                  <option value="">Seleccionar Conductor</option>
                  {drivers.map((driver) => (
                    <option key={driver.driver_id} value={driver.driver_id}>
                      {driver.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>País</Form.Label>
                <Form.Select
                  value={countryId}
                  onChange={(e) => setCountryId(e.target.value)}
                  required
                >
                  <option value="">Seleccionar País</option>
                  {countries.map((country) => (
                    <option key={country.country_id} value={country.country_id}>
                      {country.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Frontera</Form.Label>
                <Form.Select
                  value={borderId}
                  onChange={(e) => setBorderId(e.target.value)}
                  required
                >
                  <option value="">Seleccionar Frontera</option>
                  {borders.map((border) => (
                    <option key={border.border_id} value={border.border_id}>
                      {border.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Hora de Salida del Predio</Form.Label>
                <Form.Control
                  type="time"
                  value={departureTimePredio}
                  onChange={(e) => setDepartureTimePredio(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Hora de Despacho del Cliente</Form.Label>
                <Form.Control
                  type="time"
                  value={dispatchTimeClient}
                  onChange={(e) => setDispatchTimeClient(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Hora de Llegada a la Frontera</Form.Label>
                <Form.Control
                  type="time"
                  value={arrivalTimeBorder}
                  onChange={(e) => setArrivalTimeBorder(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Hora de Salida de la Frontera</Form.Label>
                <Form.Control
                  type="time"
                  value={exitTimeBorder}
                  onChange={(e) => setExitTimeBorder(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Hora de Llegada al Almacén</Form.Label>
                <Form.Control
                  type="time"
                  value={arrivalTimeWarehouse}
                  onChange={(e) => setArrivalTimeWarehouse(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Hora de Descarga en el Almacén</Form.Label>
                <Form.Control
                  type="time"
                  value={unloadingTimeWarehouse}
                  onChange={(e) => setUnloadingTimeWarehouse(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Observaciones</Form.Label>
                <Form.Control
                  as="textarea"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                {editMode ? 'Guardar Cambios' : 'Agregar Movimiento'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Movements;
