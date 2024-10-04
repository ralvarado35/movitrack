import { useState, useEffect } from 'react';
import { Form, Button, Pagination, Modal } from 'react-bootstrap';
import axiosClient from '../axios-client';
import Loader from '../components/Loader';
import moment from 'moment'; // Importar moment.js

const MovementsTable = () => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [clients, setClients] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [borders, setBorders] = useState([]);
  const [editingMovementId, setEditingMovementId] = useState(null); // ID del movimiento en edición
  const [newMovementData, setNewMovementData] = useState({}); // Datos para el nuevo movimiento
  const [movementData, setMovementData] = useState({}); // Datos del movimiento que está siendo editado
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal de agregar
  const [searchQuery, setSearchQuery] = useState(''); // Estado para controlar la búsqueda
  const itemsPerPage = 10; // Movimientos por página

  useEffect(() => {
    fetchMovements();
    fetchClients();
    fetchDrivers();
    fetchCountries();
    fetchBorders();
  }, [currentPage]);

  // Fetch movements from the API with pagination
  const fetchMovements = async () => {
    setLoading(true); // Mostrar el Loader
    try {
      const response = await axiosClient.get(`/movements?page=${currentPage}&limit=${itemsPerPage}`);
      const formattedMovements = response.data.data.map(movement => ({
        ...movement,
        date: moment(movement.date).format('DD/MM/YYYY'), // Formatear fecha a DD/MM/YYYY
        departure_time_predio: movement.departure_time_predio ? moment(movement.departure_time_predio, 'HH:mm:ss').format('hh:mm A') : '',
        dispatch_time_client: movement.dispatch_time_client ? moment(movement.dispatch_time_client, 'HH:mm:ss').format('hh:mm A') : '',
        arrival_time_border: movement.arrival_time_border ? moment(movement.arrival_time_border, 'HH:mm:ss').format('hh:mm A') : '',
        exit_time_border: movement.exit_time_border ? moment(movement.exit_time_border, 'HH:mm:ss').format('hh:mm A') : '',
        arrival_time_warehouse: movement.arrival_time_warehouse ? moment(movement.arrival_time_warehouse, 'HH:mm A').format('hh:mm A') : '',
        unloading_time_warehouse: movement.unloading_time_warehouse ? moment(movement.unloading_time_warehouse, 'HH:mm:ss').format('hh:mm A') : ''
      }));
      setMovements(formattedMovements);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error('Error fetching movements:', error);
    }
    setLoading(false); // Ocultar el Loader cuando se complete la solicitud
  };

  // Fetch clients from the API
  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/clients');
      setClients(response.data); // Guardar la lista de clientes
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
    setLoading(false);
  };

  // Fetch drivers from the API
  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/drivers');
      setDrivers(response.data); // Guardar la lista de conductores
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
    setLoading(false);
  };

  // Fetch countries from the API
  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/countries');
      setCountries(response.data); // Guardar la lista de países
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
    setLoading(false);
  };

  // Fetch borders from the API
  const fetchBorders = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/borders');
      setBorders(response.data); // Guardar la lista de fronteras
    } catch (error) {
      console.error('Error fetching borders:', error);
    }
    setLoading(false);
  };

  // Guardar cambios al hacer la edición en la tabla
  const handleSaveEdit = async (id) => {
    setLoading(true); // Mostrar Loader durante la actualización

    // Convertir fecha y horas a formato de backend antes de enviar
    const updatedData = {
      ...movementData,
      date: moment(movementData.date, 'DD/MM/YYYY').format('YYYY-MM-DD'), // Convertir a formato del backend
      departure_time_predio: moment(movementData.departure_time_predio, 'hh:mm A').format('HH:mm:ss'),
      dispatch_time_client: moment(movementData.dispatch_time_client, 'hh:mm A').format('HH:mm:ss'),
      arrival_time_border: moment(movementData.arrival_time_border, 'hh:mm A').format('HH:mm:ss'),
      exit_time_border: moment(movementData.exit_time_border, 'hh:mm A').format('HH:mm:ss'),
      arrival_time_warehouse: moment(movementData.arrival_time_warehouse, 'hh:mm A').format('HH:mm:ss'),
      unloading_time_warehouse: moment(movementData.unloading_time_warehouse, 'hh:mm A').format('HH:mm:ss')
    };

    try {
      await axiosClient.put(`/movements/${id}`, updatedData);
      fetchMovements(); // Refrescar la lista de movimientos
    } catch (error) {
      console.error('Error saving movement:', error);
    }
    setLoading(false);
    setEditingMovementId(null); // Salir del modo de edición
  };

  // Eliminar un movimiento
  const handleDelete = async (id) => {
    setLoading(true); // Mostrar Loader durante la eliminación
    try {
      await axiosClient.delete(`/movements/${id}`);
      fetchMovements(); // Refrescar la lista de movimientos
    } catch (error) {
      console.error('Error deleting movement:', error);
    }
    setLoading(false);
  };

  // Agregar nuevo movimiento
  const handleAddNewMovement = async () => {
    setLoading(true); // Mostrar Loader durante la creación
    try {
      await axiosClient.post('/movements', newMovementData);
      fetchMovements(); // Refrescar la lista de movimientos
      setNewMovementData({}); // Limpiar los datos del nuevo movimiento
      setShowModal(false); // Cerrar el modal
    } catch (error) {
      console.error('Error adding new movement:', error);
    }
    setLoading(false);
  };

  // Manejar cambios en los campos directamente en la tabla para edición
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovementData({
      ...movementData,
      [name]: value,
    });
  };

  // Manejar el inicio del modo de edición para una fila específica
  const handleEditClick = (movement) => {
    setEditingMovementId(movement.id); // Establecer la fila en modo edición
    setMovementData(movement); // Cargar los datos del movimiento en el estado
  };

  // Manejar cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {/* Mostrar el Loader mientras se realiza la carga */}
      {loading ? (
        <Loader visible={loading} />
      ) : (
        <div className="container">
          <h2>Movimientos</h2>

          {/* Campo de búsqueda */}
          <Form.Control
            type="text"
            placeholder="Buscar por cliente, conductor, país, frontera o fecha"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-3"
          />

          <Button variant="primary" onClick={() => setShowModal(true)}>
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
              {/* Movimientos existentes */}
              {movements.map((movement) => (
                <tr key={movement.id}>
                  <td>{movement.id}</td>

                  {/* Cliente */}
                  <td>{editingMovementId === movement.id ? (
                      <Form.Select name="client_id" value={movementData.client_id} onChange={handleInputChange}>
                        <option value="">Seleccione un cliente</option>
                        {clients.map(client => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      movement.client?.name
                    )}
                  </td>

                  {/* Conductor */}
                  <td>{editingMovementId === movement.id ? (
                      <Form.Select name="driver_id" value={movementData.driver_id} onChange={handleInputChange}>
                        <option value="">Seleccione un conductor</option>
                        {drivers.map(driver => (
                          <option key={driver.id} value={driver.id}>
                            {driver.name}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      movement.driver?.name
                    )}
                  </td>

                  {/* País */}
                  <td>{editingMovementId === movement.id ? (
                      <Form.Select name="country_id" value={movementData.country_id} onChange={handleInputChange}>
                        <option value="">Seleccione un país</option>
                        {countries.map(country => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      movement.country?.name
                    )}
                  </td>

                  {/* Frontera */}
                  <td>{editingMovementId === movement.id ? (
                      <Form.Select name="border_id" value={movementData.border_id} onChange={handleInputChange}>
                        <option value="">Seleccione una frontera</option>
                        {borders.map(border => (
                          <option key={border.id} value={border.id}>
                            {border.name}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      movement.border?.name
                    )}
                  </td>

                  {/* Fecha */}
                  <td>{editingMovementId === movement.id ? (
                      <Form.Control type="date" name="date" value={movementData.date} onChange={handleInputChange} />
                    ) : (
                      movement.date // Mostrar fecha en formato DD/MM/YYYY
                    )}
                  </td>

                  {/* Hora Salida Predio */}
                  <td>{editingMovementId === movement.id ? (
                      <Form.Control
                        type="time"
                        name="departure_time_predio"
                        value={movementData.departure_time_predio}
                        onChange={handleInputChange}
                      />
                    ) : (
                      movement.departure_time_predio // Mostrar hora en formato AM/PM
                    )}
                  </td>

                  {/* Hora Despacho Cliente */}
                  <td>{editingMovementId === movement.id ? (
                      <Form.Control
                        type="time"
                        name="dispatch_time_client"
                        value={movementData.dispatch_time_client}
                        onChange={handleInputChange}
                      />
                    ) : (
                      movement.dispatch_time_client // Mostrar hora en formato AM/PM
                    )}
                  </td>

                  {/* Hora Llegada Frontera */}
                  <td>{editingMovementId === movement.id ? (
                      <Form.Control
                        type="time"
                        name="arrival_time_border"
                        value={movementData.arrival_time_border}
                        onChange={handleInputChange}
                      />
                    ) : (
                      movement.arrival_time_border // Mostrar hora en formato AM/PM
                    )}
                  </td>

                  {/* Hora Salida Frontera */}
                  <td>{editingMovementId === movement.id ? (
                      <Form.Control
                        type="time"
                        name="exit_time_border"
                        value={movementData.exit_time_border}
                        onChange={handleInputChange}
                      />
                    ) : (
                      movement.exit_time_border // Mostrar hora en formato AM/PM
                    )}
                  </td>

                  {/* Hora Llegada Almacén */}
                  <td>{editingMovementId === movement.id ? (
                      <Form.Control
                        type="time"
                        name="arrival_time_warehouse"
                        value={movementData.arrival_time_warehouse}
                        onChange={handleInputChange}
                      />
                    ) : (
                      movement.arrival_time_warehouse // Mostrar hora en formato AM/PM
                    )}
                  </td>

                  {/* Hora Descarga Almacén */}
                  <td>{editingMovementId === movement.id ? (
                      <Form.Control
                        type="time"
                        name="unloading_time_warehouse"
                        value={movementData.unloading_time_warehouse}
                        onChange={handleInputChange}
                      />
                    ) : (
                      movement.unloading_time_warehouse // Mostrar hora en formato AM/PM
                    )}
                  </td>

                  {/* Observaciones */}
                  <td>{editingMovementId === movement.id ? (
                      <Form.Control
                        as="textarea"
                        name="observations"
                        value={movementData.observations}
                        onChange={handleInputChange}
                      />
                    ) : (
                      movement.observations
                    )}
                  </td>

                  {/* Botones de acción */}
                  <td>
                    {editingMovementId === movement.id ? (
                      <Button variant="success" onClick={() => handleSaveEdit(movement.id)}>
                        Guardar
                      </Button>
                    ) : (
                      <Button variant="warning" onClick={() => handleEditClick(movement)}>
                        Editar
                      </Button>
                    )}
                    <Button variant="danger" onClick={() => handleDelete(movement.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <Pagination>
            {[...Array(totalPages).keys()].map(page => (
              <Pagination.Item
                key={page + 1}
                active={page + 1 === currentPage}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </Pagination.Item>
            ))}
          </Pagination>

          {/* Modal para agregar un nuevo movimiento */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Agregar Nuevo Movimiento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {/* Cliente */}
                <Form.Group>
                  <Form.Label>Cliente</Form.Label>
                  <Form.Select
                    name="client_id"
                    value={newMovementData.client_id || ''}
                    onChange={(e) => setNewMovementData({ ...newMovementData, client_id: e.target.value })}
                  >
                    <option value="">Seleccione un cliente</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Conductor */}
                <Form.Group>
                  <Form.Label>Conductor</Form.Label>
                  <Form.Select
                    name="driver_id"
                    value={newMovementData.driver_id || ''}
                    onChange={(e) => setNewMovementData({ ...newMovementData, driver_id: e.target.value })}
                  >
                    <option value="">Seleccione un conductor</option>
                    {drivers.map(driver => (
                      <option key={driver.id} value={driver.id}>
                        {driver.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* País */}
                <Form.Group>
                  <Form.Label>País</Form.Label>
                  <Form.Select
                    name="country_id"
                    value={newMovementData.country_id || ''}
                    onChange={(e) => setNewMovementData({ ...newMovementData, country_id: e.target.value })}
                  >
                    <option value="">Seleccione un país</option>
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Frontera */}
                <Form.Group>
                  <Form.Label>Frontera</Form.Label>
                  <Form.Select
                    name="border_id"
                    value={newMovementData.border_id || ''}
                    onChange={(e) => setNewMovementData({ ...newMovementData, border_id: e.target.value })}
                  >
                    <option value="">Seleccione una frontera</option>
                    {borders.map(border => (
                      <option key={border.id} value={border.id}>
                        {border.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Input de fecha */}
                <Form.Group>
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={newMovementData.date || ''}
                    onChange={(e) => setNewMovementData({ ...newMovementData, date: e.target.value })}
                  />
                </Form.Group>

                {/* Input de hora */}
                <Form.Group>
                  <Form.Label>Hora Salida Predio</Form.Label>
                  <Form.Control
                    type="time"
                    name="departure_time_predio"
                    value={newMovementData.departure_time_predio || ''}
                    onChange={(e) => setNewMovementData({ ...newMovementData, departure_time_predio: e.target.value })}
                  />
                </Form.Group>
{/*
                <Form.Group>
                  <Form.Label>Hora Despacho Cliente</Form.Label>
                  <Form.Control
                    type="time"
                    name="dispatch_time_client"
                    value={newMovementData.dispatch_time_client || ''}
                    onChange={(e) => setNewMovementData({ ...newMovementData, dispatch_time_client: e.target.value })}
                  />
                </Form.Group> */}

                {/* Observaciones */}
                <Form.Group>
                  <Form.Label>Observaciones</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="observations"
                    value={newMovementData.observations || ''}
                    onChange={(e) => setNewMovementData({ ...newMovementData, observations: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleAddNewMovement}>
                Guardar Movimiento
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
};

export default MovementsTable;
