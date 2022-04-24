const { CURRENCY_MODEL } = require('../../models');

module.exports = {
  CREATE: async ({ body }) => {
    try {
      const reqData = body;
      const data = await CURRENCY_MODEL.create(reqData);
      return { type: 'success', message: `Account created successfully`, data };
    } catch (error) {
      throw error;
    }
  },
  FIND_ALL: async () => {
    try {
      const currency = await CURRENCY_MODEL.find({});
      return { type: 'success', message: `currency found`, data: currency };
    } catch (error) {
      throw error;
    }
  },

  FIND_ONE: async ({ params }) => {
    try {
      const { id } = params;
      const currency = await CURRENCY_MODEL.findOne({ _id: id });

      if (currency)
        return { type: 'success', message: `currency found`, data: currency };

      return { type: 'bad', message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },

  UPDATE_BY_ID: async ({ params, body }) => {
    try {
      const { id } = params;
      const currency = await CURRENCY_MODEL.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });

      if (currency)
        return { type: 'success', message: `currency update`, data: currency };

      return { type: 'bad', message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },

  DELETE_BY_ID: async ({ params }) => {
    try {
      const { id } = params;
      const currency = await CURRENCY_MODEL.findByIdAndDelete({ _id: id });

      if (currency)
        return { type: 'success', message: `currency deleted`, data: currency };

      return { type: 'bad', message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },
};
