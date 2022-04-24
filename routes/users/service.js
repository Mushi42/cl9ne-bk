const { USER_MODEL } = require('../../models');
const { hashPassword, generarteToken , comparewPassword} = require('../../helpers/user');

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
                return { type: 'success', message: `Account created successfully`, data }
            }

            return { type: 'bad', message: `email already exist!` }

        } catch (error) {
            return { type: 'Exception', message: error }
        }
    },
    LOGIN: async ({ body }) => {
        try {

            const reqData = body;
            const user = await USER_MODEL.findOne({ email: reqData.email });
            
            
            if (!user) {
              return { type: 'bad', message: `Invalid email or password!` };
            }
            
          
            const isPaswordCompared = await comparewPassword(reqData.password, user.password);

            if (!isPaswordCompared) {
              return { type: 'bad', message: `Invalid email or password!` };
            }
                        
            user.password = undefined;
            const account = JSON.parse(JSON.stringify(user))

            return {
              type: 'success',
              message: `Account created successfully`,
              data: { ...account, access_token: generarteToken(user) },
            };

            

        } catch (error) {
            return { type: 'Exception', message: error }
        }
    }

    , FIND_ALL: async () => {
        try {

            const users = await USER_MODEL.find({})

            if (users.length >= 1)
                return { type: 'success', message: `users found`, data: users }

            return { type: 'bad', message: `No Data Available` }

        } catch (error) {
            return { type: 'Exception', message: error }
        }
    }

    , FIND_ONE: async ({ params }) => {
        try {

            const { id } = params
            const user = await USER_MODEL.findOne({ _id: id })

            if (user)
                return { type: 'success', message: `user found`, data: user }

            return { type: 'bad', message: `No Data Available` }

        } catch (error) {
            return { type: 'Exception', message: error }
        }
    }

    , UPDATE_BY_ID: async ({ params, body }) => {
        try {

            const { id } = params
            const user = await USER_MODEL.findOneAndUpdate({ _id: id }, body, { new: true })

            if (user)
                return { type: 'success', message: `user update`, data: user }

            return { type: 'bad', message: `No Data Available` }

        } catch (error) {
            return { type: 'Exception', message: error }
        }
    }

    , DELETE_BY_ID: async ({ params }) => {
        try {
            const { id } = params
            const user = await USER_MODEL.findByIdAndDelete({ _id: id })

            if (user)
                return { type: 'success', message: `user deleted`, data: user }

            return { type: 'bad', message: `No Data Available` }

        } catch (error) {
            return { type: 'Exception', message: error }
        }
    }
}