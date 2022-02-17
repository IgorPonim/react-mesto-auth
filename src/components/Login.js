import { useState } from "react";
import { Link } from "react-router-dom"


const Login = ({ loggedIn }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    function handleChange(ev) {
        if (ev.target.name === 'email') {
            setEmail(ev.target.value)
        }
        else if (ev.target.name === 'password') {
            setPassword(ev.target.value)
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        loggedIn(email, password)
    }


    return (
        <form className='register__form' onSubmit={handleSubmit}>
            <h2 className="register__title">Вход</h2>
            <input onChange={handleChange} value={email || ''} id='input-email' name='email' type='email' placeholder='Введите Email'
                className='register__input' />
            <input onChange={handleChange} value={password || ''} id='input-password' name='password' type='password' placeholder='Введите Пароль'
                className='register__input' />
            <button type='submit' className='register__button'>Войти</button>
            <Link className="register__link" to=""></Link>
        </form>
    )
}
export default Login