import { useEffect, useState, useContext } from 'react';
import { api } from '../utils/Api.js';
import Profile from './Profile';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) => {

    const [cards, setCards] = useState([])
    const { name, about, avatar } = useContext(CurrentUserContext) //деструктуризация рулит

    // useEffect(() => {
    //     Promise.all([api.getUserInfo(), api.getInitialCards()])
    //         .then((data) => {
    //             console.log(data);
    //             setUserName(data[0].name)//все по классике, первый эелемент массива
    //             setuserJob(data[0].about)
    //             setUserAvatar(data[0].avatar)
    //             setCards(data[1]);//карточки єто второй єлемент массива
    //         })
    //         .catch((er) => {console.log(er)});
    // }, []);//а то без конца отправка запроса


    //оставил только карточки
    useEffect(() => {
        api.getInitialCards()
            .then((cards) => {

                setCards(cards)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    return (
        <main>
            <Profile
                name={name}
                avatar={avatar}
                about={about}
                onEditProfile={onEditProfile}
                onAddClick={onAddPlace}
                onAvatarEditClick={onEditAvatar} />
            <section className='elements'>
                {/*поставил _id в key,а то react ругался*/}
                {cards.map((card) => {
                    return <Card card={card} key={card._id} onCardClick={onCardClick} />
                })}
            </section>

        </main>
    )
}

export default Main;