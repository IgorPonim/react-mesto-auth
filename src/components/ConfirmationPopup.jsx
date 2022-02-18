import { useEffect } from "react";

const ConfirmationPopup = ({ onClose, handleCardDelete, card }) => {

    const text = document.querySelector('.popup__button_type_confirm')
    useEffect(() => {
        if (card) {
            text.textContent = 'Да'
        }
    })


    function handleSubmit(ev) {
        setTimeout(() => {
            handleCardDelete(card)
        }, 600)
        text.textContent = 'Удаление...'
        ev.preventDefault()
    }

    return (
        <div className={`popup  ${card ? 'popup_open' : ''}`}>
            <div className='popup__content'>
                <button type='button' onClick={onClose} className={`popup__close`}></button>
                <h3 className='popup__title'>Вы уверены?</h3>
                <form onSubmit={handleSubmit} name={`confirm`} className='popup__form'>

                    <button type='submit' className='popup__button popup__button_type_confirm'>{ }</button>
                </form>
            </div>

        </div>

    )
}

export default ConfirmationPopup 
