import { useReducer, useState, useEffect } from 'react';
import './App.css';

const reducer = (state, action) => {
  console.log(action)
  switch(action.type){
    case "ADD_TO_CART":
      return [ ...state, action.mahsulot]
    case "REMOVE_FROM_CART":
        return state.filter(product => product.id !== action.id)
    default:
        return state
  }
}

function App() {

  const initialState = [];

  const [state, dispatch] = useReducer(reducer, initialState);

  const [products, setProducts] = useState([]);

  useEffect(() => {
      try{
        fetch(`https://dummyjson.com/products`)
          .then(response => response.json())
          .then(data => setProducts(data.products))
      }
      catch(error){
        console.log(error)
      }
  }, [])


  const handleAddToCart = (mahsulot) => {
    dispatch({type: "ADD_TO_CART", mahsulot})
  }

  const handleRemoveFromCart = (id) => {
    dispatch({type: "REMOVE_FROM_CART", id})
  }

  return (
    <div className='app' style={{display: "flex", justifyContent: "space-between"}}>
      <div>
        <h2>Products</h2>
      {
        products.map(product => 
          <div className='box1' key={product.id}>
            <img width={250} src={product.images[0]} alt="" />
            <p className='money'>${product.price}</p>
            <h3>{product.title}</h3>
            <button className='btn' onClick={() => handleAddToCart(product)}>Add to cart</button>
          </div>
        )
      }
      </div>
      <div>
        <h2 className='card1'>Cart {state.length}</h2>
        {
        state.map(product => 
          <div className='box2' key={product.id}>
            <img width={250} src={product.images[0]} alt="" />
            <p className='money2'>${product.price}</p>
            <h3>{product.title}</h3>
            <button className='btn2' onClick={() => handleRemoveFromCart(product.id)}>Remove from cart</button>
          </div>
        )
      }
      </div>
    </div>
  )
}

export default App
