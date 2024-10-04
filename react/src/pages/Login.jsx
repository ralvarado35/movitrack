import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';
import { useRef, useState } from 'react';

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null)
    const{ setUser, setToken } = useStateContext();


    const onSubmit = async (e) => {
        e.preventDefault()
        // Crear el payload con los valores del formulario
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            // Llamada a la API con axios
            const { data } = await axiosClient.post('/login', payload);

            setUser(data.user);
            setToken(data.token);

            // Limpiar los errores si la solicitud es exitosa
            setErrors(null);
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                // Manejar los errores de validación y mostrarlos
                setErrors(response.data.errors);
            } else {
                // Manejar otros posibles errores
                console.error("Ocurrió un error inesperado:", err);
            }
        }
    }

  return (
    <div className='login-signup-form animated fadeInDown'>
        <div className='form'>
        <img src="/assets/logo.png" alt="Logo" className="dashboard-logo" style={{ width: '200px', marginBottom: '20px' }} />
            {errors &&
            <div className='alert'>
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}

            </div>

        }
            <form onSubmit={onSubmit}>
                <input ref={emailRef} type="email" placeholder='Email' />
                <input ref={passwordRef} type="password" placeholder='Password' />
                <button className='btn btn-block'>Ingresar </button>
                {/* <p className='message'>
                    Not Registered? <Link to="/signup">Create an account</Link>
                </p> */}

            </form>

        </div>
   </div>
  )
}
