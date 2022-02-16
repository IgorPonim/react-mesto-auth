
import { useEffect } from "react";
const PopupWithForm = ({ name, title, isOpen, onClose, children, onSubmit, buttonText }) => {


  useEffect(() => {
    if (!isOpen) return; 
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)//красиво

  }, [isOpen, onClose])

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();

    }
  }


  return (
    <div onClick={handleOverlay} className={`popup popup_type_${name} ${isOpen ? 'popup_open' : ''}`}>
      <div className='popup__content'>
        <button type='button' onClick={onClose} className={`popup__close popup__close_type_${name}`}></button>
        <h3 className='popup__title'>{title}</h3>
        <form onSubmit={onSubmit} name={name} className='popup__form'>
          {children} {/*содержимое форм отличается поэтому сделал children для инпутов */}
          <button type='submit' className='popup__button popup__button_type_save'>{buttonText}</button>
        </form>
      </div>

    </div>

  )

}




export default PopupWithForm;