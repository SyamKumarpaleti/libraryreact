
import React from "react";

function CartItem({ book, removeFromCart }) {
  return (
    <div>
      <p>{book.title} - ${book.price}</p>
      <button onClick={() => removeFromCart(book)}>Remove from Cart</button>
    </div>
  );
}

export default CartItem;