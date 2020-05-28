import React, { Fragment , useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { Header, Loading } from "../components";
import { CartItem, BookTrips } from "../containers";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

const Cart = () => {
  const { data, loading, error } = useQuery(GET_CART_ITEMS);

const stripePromise = loadStripe("pk_test_W9joSZ2WvUG87p9KVEGf5fZc00KSA2lq4X");

  let state = {
    name: 'Бумеранг не запущен'
  };

  function updateData (value) {
    this.setState({ name: value })
 }

 const [count, setCount] = useState("sddsfsfd");

  // По принципу componentDidMount и componentDidUpdate:
  useEffect(() => {
    // Обновляем заголовок документа, используя API браузера
    document.title = `Вы нажали ${count} раз`;
  });

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  const ThemeContext = React.createContext('name');
  return (
    
    <Fragment>
      <Header>My Cart</Header>
      {!data || (!!data && data.cartItems.length === 0) ? (
        <p data-testid="empty-message">No items in your cart</p>
      ) : (
        <Fragment>
          {!!data &&
            data.cartItems.map(launchId => (
              <CartItem key={launchId} launchId={launchId} />
            ))}
             <Elements stripe={stripePromise}>
          <BookTrips cartItems={!!data ? data.cartItems : []}  />
          </Elements>
        </Fragment>
      )}
    </Fragment>
  );
};

// <CheckoutForm updateData={this.updateData}/>
export default Cart;

