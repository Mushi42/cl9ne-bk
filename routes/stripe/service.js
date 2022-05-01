const {
  USER_MODEL,
  TRANSACTION_MODEL,
  CONTACT_MODEL,
} = require('../../models');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const amountConverstion = (currency, amount) => {
  let stripeAmount = 0;
  switch (currency) {
    case 'USD':
       stripeAmount = amount * 100;
      return { stripeCurrency: 'usd', stripeAmount };
    case 'EUR':
       stripeAmount = amount * 100;
      return { stripeCurrency: 'eur', stripeAmount };
    case 'GBP':
       stripeAmount = amount * 100;
      return { stripeCurrency: 'gbp', stripeAmount };
    default:
      return false;
  }
};

module.exports = {
  CHARGE: async ({ body }) => {
    try {
      const { token, transaction } = body;
      const convertedData = amountConverstion(transaction.currency, transaction.amount);
      if (!convertedData) {
        return { type: 'bad', message: `Please select valid currency`, data: {} };
      }

      const chargPayload = {
        amount: convertedData.stripeAmount,
        currency: convertedData.stripeCurrency,
        description: 'Example charge',
        source: token,
      };
      
      const charge = await stripe.charges.create(chargPayload);
      
      if (charge.status === 'succeeded') {
        transaction.stripeTransactionId = charge.id;
        const trsactionCreated = await TRANSACTION_MODEL.create(transaction);
        return {
          type: 'success',
          message: `transaction succeeded`,
          data: trsactionCreated,
        };
      } else {
        return { type: 'bad', message: `transaction failed!`, data: {} };
      }
    } catch (error) {
      throw error;
    }
  },
};
