const Card = ({ card, onCardClick }) => {
    return (
        <article className='element'>
            <img onClick={() => { onCardClick(card) }} className='element__image' alt={card.name} src={card.link} />
            <button type='submit' className='element__delete'></button>
            <div className='element__description'>
                <h2 className='element__name'>{card.name}</h2>
                <div className='element__likes-area'>
                    <button onClick={(ev) => { ev.target.classList.toggle('element__reaction_like') }} type='button' className='element__reaction'></button>
                    <p className='element__reaction-amount'>{card.likes.length}</p>
                </div>
            </div>
        </article>)
}

export default Card;