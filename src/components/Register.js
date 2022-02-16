import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useState } from "react/cjs/react.development"
import * as auth from '../auth'
import { Link } from "react-router-dom"
import RegisterCss from '../styles/RegisterCss.css'

const Register = ({ error, result }) => {
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const history = useHistory()

    function cnahgeEmail(ev) {
        if (ev.target.name === 'email') {
            setEmail(ev.target.value)
        }
        else if (ev.target.name === 'password') {
            setpassword(ev.target.value)
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        auth.register(email, password)

            .then(() => {
                history.push('/sign-in')
                result()
            })
            .catch((err) => {
                error()
                console.log(err)
            })
    }

    return (
        <form className='register__form' onSubmit={handleSubmit}>
            <h2 className="register__title">Регистрация</h2>
            <input onChange={cnahgeEmail} value={email || ''} id='input-email' name='email' type='email' placeholder='Введите Email'
                className='register__input' />
            <input onChange={cnahgeEmail} value={password || ''} id='input-password' name='password'  type='password'  placeholder='Введите Пароль'
                className='register__input' />
            <button type='submit' className='register__button'>Зарегистрироваться</button>
            <Link className="register__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
        </form>
    )


}

export default Register