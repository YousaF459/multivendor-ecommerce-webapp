import { useContext ,createContext, useState, useEffect} from "react";

import useUserData from "../Plugin/UserData"
import CartID from "../Plugin/CartID"
import axiosAPI from "../../Axios/axiossetup";



export const CartContext=createContext()


export function CartProvider({ children }) {

  const [count,setCount]=useState(0)
  const [cartCount, setCartCount] = useState();
  const userID=useUserData()
  const cartID=CartID()


  useEffect(()=>{
    const url=userID ? `cart-list/${cartID}/${userID}/` : `cart-list/${cartID}/`

      axiosAPI.get(url)
      .then(res =>
        { 
          setCartCount(res.data.length)
        })
  },[])



  return (
    <CartContext.Provider value={{ count, setCount, cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
}