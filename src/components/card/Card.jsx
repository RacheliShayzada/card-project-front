import React, { useState } from 'react';
import styles from './Card.module.css';
import Colors from '../colors/Colors';

const Card = ({ card, onDelete, onCardFiledChange, onPin, onUnpin, isPinned }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedText, setUpdatedText] = useState(card.text);

    const handleTextClick = () => setIsEditing(true);

    const handleTextInputChange = (e) => setUpdatedText(e.target.value);

    const handleBlur = () => {
        setIsEditing(false);
        if (updatedText !== card.text) {
            onCardFiledChange(card.id, { text: updatedText });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    const handleColorChange = (newColor) => {
        onCardFiledChange(card.id, { color: newColor });
    };

    return (
        <div className={styles.card} style={{ backgroundColor: card.color }}>
            {isEditing ? (
                <input
                    type="text"
                    value={updatedText}
                    onChange={handleTextInputChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className={styles.textInput}
                />
            ) : (
                <p className={styles.text} onClick={handleTextClick}>{card.text}</p>
            )}
            <div className={styles.cardControls}>
                <Colors
                    card={card}
                    onColorChange={handleColorChange}
                />
                <div>
                <button onClick={isPinned ? onUnpin : onPin} className={styles.pinBtn}>
                    {isPinned ? '🔓' : '📌'}
                </button>
                <button onClick={() => onDelete(card.id)} className={styles.deleteBtn}>🗑️</button>
                </div>
            </div>
        </div>
    );
};

export default Card;

