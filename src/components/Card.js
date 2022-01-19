const Card = ({ name, link, likes }) => {
    return (
        <article className='element'>
            <img className='element__image' alt={name} src={link} />
            <button type='submit' className='element__delete'></button>
            <div className='element__description'>
                <h2 className='element__name'>{name}</h2>
                <div className='element__likes-area'>
                    <button type='button' className='element__reaction'></button>
                    <p className='element__reaction-amount'>{likes}</p>
                </div>
            </div>
        </article>)
}

export default Card;


