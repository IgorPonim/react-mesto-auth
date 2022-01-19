const ImagePopup = ({name, link, isOpen, onClose}) => {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_open' : '' }`}>
            <div className='image-container'><img className='image-container__img' src={link} alt='Красивая картинка'/>
            <button type='button' onClick={onClose} className={`popup__close popup__close_type_${name}`}></button>
                <p className='image-container__info'>{name}</p>
            </div>
        </div>
    )
}

export default ImagePopup