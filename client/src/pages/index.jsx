import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Launch from './launch';
import Launches from './launches';
import Cart from './cart';
import Profile from './profile';
import { Footer, PageContainer } from '../components';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_W9joSZ2WvUG87p9KVEGf5fZc00KSA2lq4X");
export default function Pages() {
  return (
    <Fragment>
      <Elements stripe={stripePromise}>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Launches path="/" />
          <Launch path="launch/:launchId" />
          <Cart path="cart" />
          <Profile path="profile" />
        </Router>
      </PageContainer>
      <Footer />
      </Elements>
    </Fragment>
  );
}
