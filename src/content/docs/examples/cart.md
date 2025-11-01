---
title: Shopping Cart
description: Build an e-commerce shopping cart with Vibe State
---

A shopping cart demonstrates real-world e-commerce patterns including products, quantities, pricing, and checkout flows.

## The Store

Create a comprehensive cart store:

```jsx
// stores/cart.js
import { createStore } from 'vibestate';

export const useCart = createStore({
  items: [], // { id, product, quantity }
  isOpen: false,
  lastAdded: null
})
.actions({
  addItem: (state, product, quantity = 1) => {
    const existingItem = state.items.find(item => item.id === product.id);

    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
        lastAdded: product.id
      };
    }

    return {
      items: [...state.items, { id: product.id, product, quantity }],
      lastAdded: product.id
    };
  },

  removeItem: (state, productId) => ({
    items: state.items.filter(item => item.id !== productId)
  }),

  updateQuantity: (state, productId, quantity) => {
    if (quantity <= 0) {
      return {
        items: state.items.filter(item => item.id !== productId)
      };
    }

    return {
      items: state.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    };
  },

  incrementQuantity: (state, productId) => ({
    items: state.items.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  }),

  decrementQuantity: (state, productId) => {
    const item = state.items.find(item => item.id === productId);
    if (item && item.quantity <= 1) {
      return {
        items: state.items.filter(item => item.id !== productId)
      };
    }

    return {
      items: state.items.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      )
    };
  },

  clearCart: () => ({
    items: [],
    lastAdded: null
  }),

  openCart: () => ({ isOpen: true }),
  closeCart: () => ({ isOpen: false }),
  toggleCart: (state) => ({ isOpen: !state.isOpen }),
})
.computed({
  itemCount: (state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),

  subtotal: (state) =>
    state.items.reduce((sum, item) =>
      sum + (item.product.price * item.quantity), 0
    ),

  tax: (state, computed) =>
    computed.subtotal * 0.08, // 8% tax

  shipping: (state, computed) =>
    computed.subtotal > 50 ? 0 : 5.99, // Free shipping over $50

  total: (state, computed) =>
    computed.subtotal + computed.tax + computed.shipping,

  isEmpty: (state) =>
    state.items.length === 0,

  hasItem: (state) => (productId) =>
    state.items.some(item => item.id === productId),

  getQuantity: (state) => (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }
})
.persist({
  key: 'shopping-cart',
  storage: localStorage,
  exclude: ['isOpen', 'lastAdded']
});
```

## Product Card

Add products to cart:

```jsx
// ProductCard.jsx
import { useCart } from './stores/cart';

function ProductCard({ product }) {
  const [{ hasItem, getQuantity }, { addItem, incrementQuantity, openCart }] = useCart();

  const inCart = hasItem(product.id);
  const quantity = getQuantity(product.id);

  const handleAddToCart = () => {
    addItem(product);
    openCart();
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <p className="description">{product.description}</p>

      {inCart ? (
        <div className="in-cart">
          <span>In cart: {quantity}</span>
          <button onClick={() => incrementQuantity(product.id)}>
            Add More
          </button>
        </div>
      ) : (
        <button onClick={handleAddToCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;
```

## Cart Item

Display items in cart with controls:

```jsx
// CartItem.jsx
import { useCart } from './stores/cart';

function CartItem({ item }) {
  const [, { incrementQuantity, decrementQuantity, removeItem }] = useCart();

  const itemTotal = item.product.price * item.quantity;

  return (
    <div className="cart-item">
      <img src={item.product.image} alt={item.product.name} />

      <div className="details">
        <h4>{item.product.name}</h4>
        <p className="price">${item.product.price.toFixed(2)}</p>
      </div>

      <div className="quantity-controls">
        <button onClick={() => decrementQuantity(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => incrementQuantity(item.id)}>+</button>
      </div>

      <div className="item-total">
        ${itemTotal.toFixed(2)}
      </div>

      <button
        className="remove"
        onClick={() => removeItem(item.id)}
        aria-label="Remove item"
      >
        ×
      </button>
    </div>
  );
}

export default CartItem;
```

## Cart Sidebar

Sliding cart panel:

```jsx
// CartSidebar.jsx
import { useCart } from './stores/cart';
import CartItem from './CartItem';

function CartSidebar() {
  const [state, actions] = useCart();

  if (!state.isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={actions.closeCart} />

      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Shopping Cart ({state.itemCount})</h2>
          <button onClick={actions.closeCart}>×</button>
        </div>

        <div className="cart-items">
          {state.isEmpty ? (
            <p className="empty">Your cart is empty</p>
          ) : (
            state.items.map(item => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </div>

        {!state.isEmpty && (
          <div className="cart-footer">
            <div className="summary">
              <div className="row">
                <span>Subtotal:</span>
                <span>${state.subtotal.toFixed(2)}</span>
              </div>
              <div className="row">
                <span>Tax:</span>
                <span>${state.tax.toFixed(2)}</span>
              </div>
              <div className="row">
                <span>Shipping:</span>
                <span>
                  {state.shipping === 0 ? (
                    <span className="free">FREE</span>
                  ) : (
                    `$${state.shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="row total">
                <strong>Total:</strong>
                <strong>${state.total.toFixed(2)}</strong>
              </div>
            </div>

            <button className="checkout-button">
              Proceed to Checkout
            </button>

            <button className="clear-button" onClick={actions.clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;
```

## Cart Button

Header button with item count:

```jsx
// CartButton.jsx
import { useCart } from './stores/cart';

function CartButton() {
  const [{ itemCount }, { openCart }] = useCart();

  return (
    <button className="cart-button" onClick={openCart}>
      🛒 Cart
      {itemCount > 0 && (
        <span className="badge">{itemCount}</span>
      )}
    </button>
  );
}

export default CartButton;
```

## Product List

Display products:

```jsx
// ProductList.jsx
import ProductCard from './ProductCard';

const PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    image: '/images/headphones.jpg',
    description: 'Premium wireless headphones with noise cancellation'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    image: '/images/watch.jpg',
    description: 'Fitness tracker with heart rate monitor'
  },
  {
    id: 3,
    name: 'Laptop Stand',
    price: 49.99,
    image: '/images/stand.jpg',
    description: 'Ergonomic aluminum laptop stand'
  },
  // ... more products
];

function ProductList() {
  return (
    <div className="product-list">
      {PRODUCTS.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
```

## Full App

Combine everything:

```jsx
// App.jsx
import CartButton from './CartButton';
import CartSidebar from './CartSidebar';
import ProductList from './ProductList';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Vibe Shop</h1>
        <CartButton />
      </header>

      <main>
        <ProductList />
      </main>

      <CartSidebar />
    </div>
  );
}

export default App;
```

## Advanced: Discounts

Add discount codes:

```jsx
export const useCart = createStore({
  items: [],
  discountCode: null,
  discountAmount: 0
})
.actions({
  applyDiscount: async (state, code) => {
    // Validate discount code (API call in real app)
    const discounts = {
      'SAVE10': 0.10,
      'SAVE20': 0.20,
      'FREESHIP': 0
    };

    if (discounts[code] !== undefined) {
      return {
        discountCode: code,
        discountAmount: discounts[code]
      };
    }

    throw new Error('Invalid discount code');
  },

  removeDiscount: () => ({
    discountCode: null,
    discountAmount: 0
  })
})
.computed({
  discount: (state, computed) =>
    computed.subtotal * state.discountAmount,

  shipping: (state, computed) => {
    // Free shipping with FREESHIP code
    if (state.discountCode === 'FREESHIP') return 0;

    return computed.subtotal > 50 ? 0 : 5.99;
  },

  total: (state, computed) =>
    computed.subtotal - computed.discount + computed.tax + computed.shipping
});
```

## Advanced: Stock Management

Track product stock:

```jsx
export const useProducts = createStore({
  products: PRODUCTS,
  stock: {
    1: 10,
    2: 5,
    3: 20
  }
})
.actions({
  decrementStock: (state, productId, quantity = 1) => ({
    stock: {
      ...state.stock,
      [productId]: Math.max(0, state.stock[productId] - quantity)
    }
  }),

  incrementStock: (state, productId, quantity = 1) => ({
    stock: {
      ...state.stock,
      [productId]: state.stock[productId] + quantity
    }
  })
})
.computed({
  inStock: (state) => (productId) =>
    (state.stock[productId] || 0) > 0,

  availableQuantity: (state) => (productId) =>
    state.stock[productId] || 0
});
```

Integrate with cart:

```jsx
// Check stock before adding
const handleAddToCart = () => {
  const [{ inStock }] = useProducts();

  if (!inStock(product.id)) {
    alert('Out of stock!');
    return;
  }

  addItem(product);
  decrementStock(product.id);
};
```

## Advanced: Wishlist

Add wishlist feature:

```jsx
export const useWishlist = createStore({ items: [] })
  .actions({
    addToWishlist: (state, product) => ({
      items: [...state.items, product]
    }),

    removeFromWishlist: (state, productId) => ({
      items: state.items.filter(p => p.id !== productId)
    }),

    moveToCart: (state, actions, productId) => {
      const product = state.items.find(p => p.id === productId);
      if (product) {
        useCart.getState().addItem(product);
        actions.removeFromWishlist(productId);
      }
    }
  })
  .computed({
    hasItem: (state) => (productId) =>
      state.items.some(p => p.id === productId)
  })
  .persist({
    key: 'wishlist',
    storage: localStorage
  });
```

## Try It Yourself

Enhance this example:

1. Add product reviews and ratings
2. Add recently viewed products
3. Add saved for later
4. Add gift wrapping option
5. Add shipping address selection
6. Add payment method selection
7. Add order history
8. Add product recommendations

## Next Steps

- [Creating Stores](/guides/creating-stores) - Advanced patterns
- [Using State](/guides/using-state) - Best practices
- [TypeScript Guide](/guides/typescript) - Type-safe cart
- [DevTools](/guides/devtools) - Debug your cart
