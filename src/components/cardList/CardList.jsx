import React, { useEffect, useState } from 'react';
import { getCards, createCard, updateCard, deleteCard } from '../../services/cardsService.js';
import Card from '../card/Card.jsx';
import styles from './CardList.module.css';

function CardList() {
    const [cards, setCards] = useState([]);
    const [pinnedCardIds, setPinnedCardIds] = useState([]); // סטייט לכרטיסים המוצמדים

    useEffect(() => {
        const fetchData = async () => {
            try {
                setCards(await getCards());
            } catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteCard(id);
            setCards(cards.filter(card => card.id !== id));
            setPinnedCardIds(pinnedCardIds.filter(pinnedId => pinnedId !== id)); // להסיר מהסטייט של ההצמדה אם נמחק
            console.log('Card deleted successfully:', id);
        } catch (err) {
            console.log('Error deleting card:', err);
        }
    };

    const handleAddCard = async () => {
        try {
            const cardToAdd = { color: 'khaki', text: 'New Card' };
            const newCard = await createCard(cardToAdd);
            setCards([...cards, newCard]);
            console.log('Card added successfully:', newCard);
        } catch (err) {
            console.log('Error adding card:', err);
        }
    };

    const updateCardField = async (id, updates) => {
        try {
            await updateCard(id, updates);
            setCards(cards.map(card => card.id === id ? { ...card, ...updates } : card));
            console.log('Card updated successfully:', id, updates);
        } catch (err) {
            console.log('Error updating card:', err);
        }
    };

    const handlePinCard = (id) => {
        setPinnedCardIds(prev => [...prev, id]);
    };

    const handleUnpinCard = (id) => {
        setPinnedCardIds(prev => prev.filter(pinnedId => pinnedId !== id));
    };

    // Sort cards so pinned cards appear at the start
    const sortedCards = [
        ...cards.filter(card => pinnedCardIds.includes(card.id)), // כרטיסים מוצמדים
        ...cards.filter(card => !pinnedCardIds.includes(card.id)) // כרטיסים לא מוצמדים
    ];

    return (
        <div className={styles.cardContainer}>
            {sortedCards.map(card => (
                <Card
                    key={card.id}
                    card={card}
                    onDelete={handleDelete}
                    onCardFiledChange={updateCardField}
                    onPin={() => handlePinCard(card.id)}
                    onUnpin={() => handleUnpinCard(card.id)}
                    isPinned={pinnedCardIds.includes(card.id)} // לשליחת המידע אם הכרטיס מוצמד
                />
            ))}
            <button onClick={handleAddCard} className={styles.addCardBtn}>+</button>
        </div>
    );
}

export default CardList;
