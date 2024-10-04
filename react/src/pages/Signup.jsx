import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

export const Signup = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState(null)
    const{ setUser, setToken } = useStateContext();

    const onSubmit = async (e) => {
        e.preventDefault();

        // Crear el payload con los valores del formulario
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        try {
            // Llamada a la API con axios
            const { data } = await axiosClient.post('/signup', payload);

             console.log(data);

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
    };



  return (
    <div className='login-signup-form animated fadeInDown'>
    <div className='form'>
        <h1 className='title'>Sign up for free</h1>
        {errors &&
            <div className='alert'>
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}

            </div>

        }
        <form onSubmit={onSubmit}>
            <input ref={nameRef} type="text" placeholder='Full Name' />
            <input ref={emailRef} type="email" placeholder='Email' />
            <input ref={passwordRef} type="password" placeholder='Password' />
            <input ref={passwordConfirmationRef} type="password" placeholder='Password Confirmation' />
            <button className='btn btn-block'>Signup </button>
            <p className='message'>
                Already Registered? <Link to="/login">Sign in</Link>
            </p>

        </form>

    </div>
</div>
  )
}
