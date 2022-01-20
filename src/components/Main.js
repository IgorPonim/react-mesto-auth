import { useEffect, useState } from 'react';
import { api } from '../utils/Api';
import Profile from './Profile';
import Card from './Card';

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) => {
    const [userName, setUserName] = useState('')
    const [userJob, setuserJob] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [cards, setCards] = useState([])

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then((data) => {
                console.log(data);
                setUserName(data[0].name)//все по классике, первый эелемент массива
                setuserJob(data[0].about)
                setUserAvatar(data[0].avatar)
                setCards(data[1]);//карточки єто второй єлемент массива

            })
            .catch((er) => {
                console.log(er);
            });
    }, []);//а то без конца отправка запроса


    return (
        <main>
            <Profile name={userName} avatar={userAvatar} about={userJob}
                onEditProfile={onEditProfile} onAddClick={onAddPlace}
                onAvatarEditClick={onEditAvatar} />
            <section className='elements'>
                {/*поставил _id в key,а то react ругался*/}
                {cards.map((el) => {
                    return <Card card={el} key={el._id} onCardClick={onCardClick} />
                })}
            </section>

        </main>
    )
}

export default Main;