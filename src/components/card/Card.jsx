import React, {useState} from 'react';
import styles from './Card.module.css'
import Colors from '../colors/Colors';

const Card = ({ card, onDelete, onColorChange, onTextChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedText, setUpdatedText] = useState(card.text);

    const handleTextClick = () => setIsEditing(true);

    const handleTextChange = (e) => setUpdatedText(e.target.value);

    const handleBlur = () => {
        setIsEditing(false);
        if (updatedText !== card.text) {
            onTextChange(card.id, updatedText);
        }
    };

    return (
        <div className={styles.card} style={{ backgroundColor: card.color }}>
            {isEditing ? (
                <input 
                    type="text" 
                    value={updatedText} 
                    onChange={handleTextChange} 
                    onBlur={handleBlur} 
                    autoFocus
                    className={styles.textInput}
                />
            ) : (
                <p className={styles.text} onClick={handleTextClick}>{card.text}</p>
            )}
            <div className={styles.cardControls}>
                <Colors 
                   card = {card}
                   onColorChange={onColorChange}
                   />
                <button onClick={() => onDelete(card.id)} className={styles.deleteBtn}>🗑️</button>
            </div>
        </div>
    );
};

export default Card;
