import React from 'react';
import Layout from '../components/Layout';

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-container" style={{ textAlign: 'center' }}>
        {/* Logo */}
        <img src="/assets/logo.png" alt="Logo" className="dashboard-logo" style={{ width: '', marginBottom: '20px' }} />

        {/* Texto del dashboard */}
        {/* <h1>Transporte Reyes Flores</h1> */}
        <p>Bienvenido al panel de administración. Aquí puedes gestionar tus datos.</p>
      </div>
    </>
  );
};

export default Dashboard;
