const { CONTACT_MODEL } = require('../../models');

module.exports = {
  CREATE: async ({ body }) => {
    try {
      const reqData = body;
      const data = await CONTACT_MODEL.create(reqData);
      return {
        type: 'success',
        message: `Record created successfully`,
        data,
      };
    } catch (error) {
      return { type: 'Exception', message: error };
    }
  },
  FIND_ALL: async () => {
    try {
      const data = await CONTACT_MODEL.find({});
      return { type: 'success', message: `record found`, data };
    } catch (error) {
      return { type: 'Exception', message: error };
    }
  },

  FIND_ONE: async ({ params }) => {
    try {
      const { id } = params;
      const user = await CONTACT_MODEL.findOne({ _id: id });

      if (user) return { type: 'success', message: `user found`, data: user };

      return { type: 'bad', message: `No Data Available` };
    } catch (error) {
      return { type: 'Exception', message: error };
    }
  },

  UPDATE_BY_ID: async ({ params, body }) => {
    try {
      const { id } = params;
      const user = await CONTACT_MODEL.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });

      if (user) return { type: 'success', message: `record update`, data: user };

      return { type: 'bad', message: `No Data Available` };
    } catch (error) {
      return { type: 'Exception', message: error };
    }
  },

  DELETE_BY_ID: async ({ params }) => {
    try {
      const { id } = params;
      const user = await CONTACT_MODEL.findByIdAndDelete({ _id: id });

      if (user) return { type: 'success', message: `record deleted`, data: user };

      return { type: 'bad', message: `No Data Available` };
    } catch (error) {
      return { type: 'Exception', message: error };
    }
  },
};
