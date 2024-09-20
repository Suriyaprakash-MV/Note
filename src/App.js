import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useEffect, useState } from 'react';
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";


function App() {
  // Initialize items with a fallback to an empty array if localStorage has no value
  const API_URL = 'http://localhost:3500/itemss';
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error ("Data not received")
        const listItems = await response.json();
        console.log(listItems);
        setItems(listItems);
        setFetchError(null)
      } catch(err){
        setFetchError(err)
      } finally  {
        setIsLoading(false)
      }
    }  
    setTimeout(() => {
      (async () => await fetchItems())()
    },3000)
  },[])
    // const savedItems = {The comment statement are the statement used to save the data even the page is refreshed}
    // JSON.parse(localStorage.getItem('todo_list'));
    // if(savedItems){
    //   setItems(savedItems);
    // }
  // },[])

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item };
    const listItems = [...items, addNewItem];
    setItems(listItems);
  };

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
  };

  const handleDelete = (id) => {
    const updateItems = items.filter((item) => item.id !== id);
    setItems(updateItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  };

  return (
    <div className="App">
      <Header />
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem 
        search={search}
        setSearch={setSearch}
      />
      {/* Safeguard against null and undefined in items and item.item */}
      <main>
        {isLoading && <p>Loading..</p>}
        {fetchError && <p>{`${fetchError}`}</p>}
        {!isLoading && !fetchError &&
        <Content 
          items={(items || []).filter(item => item.item && item.item.toLowerCase().includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      }
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
