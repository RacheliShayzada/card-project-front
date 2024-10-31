import React, { useEffect, useState } from 'react';
import { getCards, createCard, updateCard, deleteCard } from '../../services/cardsService.js';
import Card from '../card/Card.jsx';
import styles from './CardList.module.css';

function CardList() {
    const [cards, setCards] = useState([]);
    const [pinnedCardIds, setPinnedCardIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedCards = await getCards();
                setCards(fetchedCards);
            } catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const sortCardsByPinned = (cardsToSort) => [
            ...cardsToSort.filter(card => pinnedCardIds.includes(card.id)),
            ...cardsToSort.filter(card => !pinnedCardIds.includes(card.id))
        ];
        setCards(prevCards => sortCardsByPinned(prevCards));
    }, [pinnedCardIds]);


    const handleDelete = async (id) => {
        try {
            await deleteCard(id);
            setCards(prevCards => prevCards.filter(card => card.id !== id));
            setPinnedCardIds(prevPinned => prevPinned.filter(pinnedId => pinnedId !== id));
            console.log('Card deleted successfully:', id);
        } catch (err) {
            console.log('Error deleting card:', err);
        }
    };

    const handleAddCard = async () => {
        try {
            const cardToAdd = { color: 'khaki', text: 'New Card' };
            const newCard = await createCard(cardToAdd);
            setCards(prevCards => [...prevCards, newCard]);
            console.log('Card added successfully:', newCard);
        } catch (err) {
            console.log('Error adding card:', err);
        }
    };

    const updateCardField = async (id, updates) => {
        try {
            await updateCard(id, updates);
            setCards(prevCards =>
                prevCards.map(card => (card.id === id ? { ...card, ...updates } : card))
            );
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

    return (
        <div className={styles.cardContainer}>
            {cards.map(card => (
                <Card
                    key={card.id}
                    card={card}
                    onDelete={handleDelete}
                    onCardFiledChange={updateCardField}
                    onPin={() => handlePinCard(card.id)}
                    onUnpin={() => handleUnpinCard(card.id)}
                    isPinned={pinnedCardIds.includes(card.id)}
                />
            ))}
            <button onClick={handleAddCard} className={styles.addCardBtn}>+</button>
        </div>
    );
}

export default CardList;
