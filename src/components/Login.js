import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useState } from "react/cjs/react.development"
import * as auth from '../auth'
import PopupWithForm from "./PopupWithForm"
import RegisterCss from '../styles/RegisterCss.css'
import { Link } from "react-router-dom"
const Login = ({ loggedIn, onError }) => {
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
        auth.authorize(email, password)
            .then((res) => {
                if (res.token) {
                    setEmail('')
                    setpassword('')
                    loggedIn()
                    history.push('/')
                }
            })
            .catch((err) => {
                onError()
                console.log(err)
            })
    }


    return (
        <form className='register__form' onSubmit={handleSubmit}>
            <h2 className="register__title">Вход</h2>
            <input onChange={cnahgeEmail} value={email || ''} id='input-email' name='email' type='email' placeholder='Введите Email'
                className='register__input' />
            <input onChange={cnahgeEmail} value={password || ''} id='input-password' name='password' type='password' placeholder='Введите Пароль'
                className='register__input' />
                 <button type='submit' className='register__button'>Войти</button>
                 <Link className="register__link" to=""></Link>
        </form>
    )
}
export default Login