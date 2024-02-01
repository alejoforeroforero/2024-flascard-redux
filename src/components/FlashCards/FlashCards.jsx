import React from 'react'
import { useSelector } from 'react-redux';

import './FlashCards.css'
import FlashCard from './FlashCard';

const FlashCards = () => {
    const flashCards = useSelector(state => state.categoryReducer.flashCards);
    const categoryName = useSelector(state => state.categoryReducer.categoryName);
    return (
        <>
            <div className='flash-cards-section'>
                {categoryName != '' ?
                    <>
                        <h1>{categoryName}</h1>
                        <div className='card-grid'>
                            {flashCards.map(question => {
                                return <FlashCard key={question.question} question={question} />
                            })}
                        </div>
                    </>
                    :
                    <div className='intro'>
                        <p>This serves as a demonstration site designed for honing skills in Redux Toolkit, proficiently managing data API calls, and mastering responsive design with CSS Grid
                            <br></br>
                            <br></br>
                            This demo is built upon the excellent tutorial created by Kayle at Web Dev Simplified
                            Youtube channel:
                            <a target='_blank' href='https://youtu.be/hEtZ040fsD8?si=fJsjKvKxdw7ahFIF'>Watch the video</a>
                            <br></br>
                            <br></br>
                            Choose a category from the header to generate flashcard questions and answers.
                        </p>
                    </div>
                }
            </div>
        </>
    )
}

export default FlashCards