import React, { useEffect, useState } from 'react';
import { getCards, createCard, updateCard, deleteCard } from '../../services/cardsService.js';
import Card from '../card/Card.jsx';
import styles from './CardList.module.css'

function CardList() {

    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCards();
                setCards(data);
                console.log('Data fetched successfully:', data);
            } catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteCard(id);
            const updatedCards = cards.filter(card => card.id!== id);
            setCards(updatedCards);
            console.log('Card deleted successfully:', id);
        } catch (err) {
            console.log('Error deleting card:', err);
        }
    };

    const handleAddCard = async () => {
        try {
            const cardToAdd = {color: 'khaki', text: 'New Card'}
            const newCard = await createCard(cardToAdd );
            setCards([...cards, newCard]);
            console.log('Card added successfully:', newCard);
        } catch (err) {
            console.log('Error adding card:', err);
        }
    };

    const updateCardField = async (id, updates) => {
        try {
            await updateCard(id, updates);
            const updatedCards = cards.map(card => 
                card.id === id ? { ...card, ...updates } : card
            );
            setCards(updatedCards);
            console.log('Card updated successfully:', id, updates);
        } catch (err) {
            console.log('Error updating card:', err);
        }
    };
    
    const handleColorChange = (id, newColor) => {
        updateCardField(id, { color: newColor });
    };
    
    const handleTextChange = (id, newText) => {
        updateCardField(id, { text: newText });
    };
    

    return (
        <div className={styles.cardContainer}>
            {cards.map(card => (
                <Card 
                    key={card.id} 
                    card={card} 
                    onDelete={handleDelete} 
                    onColorChange={handleColorChange} 
                    onTextChange={handleTextChange}
                />
            ))}
            <button onClick={handleAddCard} className={styles.addCardBtn}>+</button>
        </div>
    )
}

export default CardList