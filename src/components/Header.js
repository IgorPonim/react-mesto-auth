
import mesto from '../images/mesto.svg'


const Header = () => {
    return (
        <header className='header'>
            <img className='header__logo' src={mesto} alt="Логотип" />
        </header>
    )
}


export default Header