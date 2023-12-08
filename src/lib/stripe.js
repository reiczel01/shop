//napisz mi kod który ma się tu znajdować by płatność dzialała poprawnie

import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2Vudi50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUFzQjtBQUV0QixNQUFNQyxZQUFZRCxrREFBVSxDQUFDO0lBQzN
