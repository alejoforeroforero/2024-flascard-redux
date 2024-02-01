import React, { useState, useEffect, useRef } from 'react';

import './Flashcard.css';

const FlashCard = ({ question }) => {
    const [flip, setFlip] = useState(false);

    const frontEl = useRef();
    const backEl = useRef();

    const decodeString = (str) => {
        const textArea = document.createElement('textarea')
        textArea.innerHTML = str
        return textArea.value
    }

    return (
        <>
            <div
                className={`card ${flip ? 'flip' : ''}`}
                onClick={() => setFlip(!flip)}
            >
                <div className='front' ref={frontEl}>{decodeString(question.question)}</div>
                <div className='back' ref={backEl}>{decodeString(question.correct_answer)}</div>
            </div>

        </>

    )
}

export default FlashCard