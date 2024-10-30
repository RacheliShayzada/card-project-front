import React, { useState } from 'react'
import styles from './Colors.module.css'

function Colors({ onColorChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const hundleChangeColor = (color) => {
        onColorChange(color);
        setIsOpen(false);
    }

    return (
        <div className={styles.colorPicker}>
            {isOpen ? ['lightcoral', '#FFA500', '#00BFFF', '#9370DB', 'khaki', 'pink', 'lightseagreen'].map(color => (
                <span
                    key={color}
                    className={styles.colorOption}
                    style={{ backgroundColor: color }}
                    onClick={() => hundleChangeColor(color)}
                ></span>
            )) : <span
                className={styles.colorOption}
                onClick={() => setIsOpen(true)}
            ></span>}
        </div>
    )
}

export default Colors