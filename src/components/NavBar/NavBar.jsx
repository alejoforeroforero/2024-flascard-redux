import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFlashCards } from '../../Redux/states/categorySlice';

import './NavBar.css'

const NavBar = () => {
    const categories = useSelector(state => state.categoryReducer.categories);
    const categoryId = useSelector(state => state.categoryReducer.categoryId);
    const amount = useSelector(state => state.categoryReducer.amount);
    const dispatch = useDispatch();

    const categoryEl = useRef()

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const categoryName = categories.filter(category => category.id == categoryEl.current.value)[0].name;

        const payLoadObj = {
            categoryId: categoryEl.current.value,
            categoryName,
            amount: 10
        };
        dispatch(getFlashCards(payLoadObj))
    }

    return (
        <>
            <nav>
                <form className='flash-form' onSubmit={handleOnSubmit}>
                    <div className='form-group'>
                        <label htmlFor='category'>Category</label>
                        <select name='' id='category' ref={categoryEl}>
                            {categories.map(category => {
                                return <option
                                    value={category.id}
                                    key={category.id}>
                                    {category.name}
                                </option>
                            })}
                        </select>
                    </div>

                    <button>Generate</button>
                </form>
            </nav>
        </>
    )
}

export default NavBar