const { TRANSACTION_MODEL } = require('../../models');

module.exports = {
  CREATE: async ({ body }) => {
    try {
      const reqData = body;
      const data = await TRANSACTION_MODEL.create(reqData);
      console.log('Created', data);
      return { type: 'success', message: `Account created successfully`, data };
    } catch (error) {
      throw error;
    }
  },
  FIND_ALL: async (req) => {
    try {
      const { query } = req;
      const transactions = await TRANSACTION_MODEL.find(query);
      return { type: 'success', message: `transactions found`, data: transactions };
    } catch (error) {
      throw error;
    }
  },

  FIND_ONE: async ({ params }) => {
    try {
      const { id } = params;
      const transaction = await TRANSACTION_MODEL.findOne({ _id: id });

      if (transaction)
        return {
          type: 'success',
          message: `transaction found`,
          data: transaction,
        };

      return { type: 'bad', message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },

  UPDATE_BY_ID: async ({ params, body }) => {
    try {
      const { id } = params;
      const transaction = await TRANSACTION_MODEL.findOneAndUpdate(
        { _id: id },
        body,
        { new: true }
      );

      if (transaction)
        return {
          type: 'success',
          message: `transaction update`,
          data: transaction,
        };

      return { type: 'bad', message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },

  DELETE_BY_ID: async ({ params }) => {
    try {
      const { id } = params;
      const transaction = await TRANSACTION_MODEL.findByIdAndDelete({
        _id: id,
      });

      if (transaction)
        return {
          type: 'success',
          message: `transaction deleted`,
          data: transaction,
        };

      return { type: 'bad', message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },
};
