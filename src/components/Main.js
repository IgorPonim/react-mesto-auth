import { useEffect, useState } from 'react';
import { api } from '../utils/Api';
import Profile from './Profile';
import Card from './Card';

const Main = ({ onEditProfile, onAddPlace, onEditAvatar }) => {
    const [userName, setUserName] = useState('')
    const [userJob, setuserJob] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [cards, setCards] = useState([])
    const [selectedCard, setSelectedCard] = useState(undefined);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then((data) => {
                console.log(data);
                setUserName(data[0].name)//все по классике, первый эелемент массива
                setuserJob(data[0].about)
                setUserAvatar(data[0].avatar)
                setCards(data[1]);//карточки єто второй єлемент массива который отправил сервер

            })
            .catch((er) => {
                console.log(er);
            });
    }, []);//а то будет бесконечный запрос!!!

    return (
        <main>
            <Profile name={userName} about={userJob} avatar={userAvatar} onEditProfile={onEditProfile} onAddClick={onAddPlace} onAvatarEditClick={onEditAvatar} />
            <section className='elements'>
                {cards.map((el) => {
                    return <Card key={el._id} name={el.name} link={el.link} likes={el.likes.length} />
                })}
            </section>

        </main>
    )
}

export default Main;