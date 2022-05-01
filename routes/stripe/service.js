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
       stripeAmount = amount ;
      return { stripeCurrency: 'eur', stripeAmount };
    case 'GBP':
       stripeAmount = amount ;
      return { stripeCurrency: 'gbp', stripeAmount };
    default:
      return false;
  }
};

module.exports = {
  CHARGE: async ({ body }) => {
    try {
      const { token, transaction } = body;

      console.log('----token', body);
      const convertedData = amountConverstion('EUR', 100);
      // const convertedData = amountConverstion(transaction.currency, transaction.amount);
      console.log('----convertedData', convertedData);

      if (!convertedData) {
        return { type: 'bad', message: `Please select valid currency`, data: {} };
      }

      const chargPayload = {
        amount: convertedData.stripeAmount,
        currency: convertedData.stripeCurrency,
        description: 'Example charge',
        source: token,
      };
      console.log('----chargPayload', chargPayload);
      
      // return { type: 'success', message: `email already exist!`, data: {} };
      
      const charge = await stripe.charges.create(chargPayload);
      console.log('----charge.status', charge.status);
      
      if (charge.status === 'succeeded') {
        await TRANSACTION_MODEL.create(transaction);
        return { type: 'success', message: `transaction succeeded`, data: {} };
      } else {
        return { type: 'bad', message: `transaction failed!`, data: {} };
      }
    } catch (error) {
      throw error;
    }
  },
};
