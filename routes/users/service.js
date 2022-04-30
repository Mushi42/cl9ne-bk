const {
  USER_MODEL,
  TRANSACTION_MODEL,
  CONTACT_MODEL,
} = require('../../models');
const {
  hashPassword,
  generarteToken,
  comparewPassword,
} = require('../../helpers/user');

module.exports = {
  CREATE: async ({ body }) => {
    try {
      const reqData = body;

      if (reqData.password) {
        reqData.password = await hashPassword(reqData.password);
      }
      const user = await USER_MODEL.findOne({ email: reqData.email });

      if (!user) {
        const data = await USER_MODEL.create(reqData);
        return {
          type: 'success',
          message: `Account created successfully`,
          data,
        };
      }

      return { type: 'bad', message: `email already exist!` };
    } catch (error) {
      throw error;
    }
  },
  LOGIN: async ({ body }) => {
    try {
      const reqData = body;
      const user = await USER_MODEL.findOne({ email: reqData.email });

      if (!user) {
        return { type: 'bad', message: `Invalid email or password!` };
      }

      const isPaswordCompared = comparewPassword(
        reqData.password,
        user.password
      );

      if (!isPaswordCompared) {
        return { type: 'bad', message: `Invalid email or password!` };
      }

      user.password = undefined;
      const account = JSON.parse(JSON.stringify(user));

      return {
        type: 'success',
        message: `Account created successfully`,
        data: { ...account, access_token: generarteToken(user) },
      };
    } catch (error) {
      throw error;
    }
  },

  FIND_ALL: async () => {
    try {
      const users = await USER_MODEL.find({});

      if (users.length >= 1)
        return { type: 'success', message: `users found`, data: users };

      return { type: 'bad', message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },

  DASHBOARD: async () => {
    try {
      const [
        usersCount,
        pendingItemsCount,
        approvedItemsCount,
        supportCount,
      ] = await Promise.all([
        USER_MODEL.find({}).count(),
        TRANSACTION_MODEL.find({ status: 'pending' }).count(),
        TRANSACTION_MODEL.find({ status: 'approved' }).count(),
        CONTACT_MODEL.find({}).count(),
      ]);

      return {
        type: 'success',
        message: `dashbord`,
        data: {
          usersCount,
          pendingItemsCount,
          approvedItemsCount,
          supportCount,
        },
      };
    } catch (error) {
      throw error;
    }
  },

  FIND_ONE: async ({ params }) => {
    try {
      const { id } = params;
      const user = await USER_MODEL.findOne({ _id: id });

      if (user) return { type: 'success', message: `user found`, data: user };

      return { type: 'bad', message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },

  UPDATE_BY_ID: async ({ params, body }) => {
    try {
      const { id } = params;
      const user = await USER_MODEL.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });

      if (user) return { type: 'success', message: `user update`, data: user };

      return { type: 'bad', message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },

  DELETE_BY_ID: async ({ params }) => {
    try {
      const { id } = params;
      const user = await USER_MODEL.findByIdAndDelete({ _id: id });

      if (user) return { type: 'success', message: `user deleted`, data: user };

      return { type: 'bad', message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },
};
