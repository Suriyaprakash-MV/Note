import React, {useRef} from 'react'
import { FaPlus } from 'react-icons/fa'

const AddItem = ({newItem, setNewItem, handleSubmit}) => {
  const inputRef = useRef(null);

  const onSubmit = (e) => {
    handleSubmit(e);
    inputRef.current.focus();
  };



  return (
    <form className='addForm' onSubmit = {onSubmit}>  
        <label htmlFor="addItem">Add Item</label>
        <input
            autoFocus
            ref={inputRef}
            id='addItem'
            type="text"
            placeholder='Add Your To do list Item'
            required
            value = {newItem}
            onChange={(e) => setNewItem(e.target.value)}
        />
        <button
            type='submit'
            aria-label='Add Item'
        >
            <FaPlus />
        </button>
    </form>
  );
}

export default AddItem
