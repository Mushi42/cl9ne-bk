const {
  USER_MODEL,
  TRANSACTION_MODEL,
  CONTACT_MODEL,
} = require('../../models');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
  CHARGE: async ({ body }) => {
    try {
      const { token } = body;

      const charge = await stripe.charges.create({
        amount: 999 * 1000,
        currency: 'usd',
        description: 'Example charge',
        source: token,
      });

      if (charge.status === 'succeeded') {
        return { type: 'success', message: `email already exist!`, data: {} };
      } else {
        return { type: 'bad', message: `email already exist!`, data: {} };
      }
    } catch (error) {
      throw error;
    }
  },
};
