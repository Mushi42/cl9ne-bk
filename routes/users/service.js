const { USER_MODEL } = require('../../models')

module.exports = {
    CREATE: async ({ body }) => {
        try {

            const reqData = body;

            const user = await USER_MODEL.findOne({ name: reqData.name });

            if (!user) {
                const data = await USER_MODEL.create(reqData);
                return { type: 'success', message: `${data.name.toUpperCase()} is created successfully`, data }
            }

            return { type: 'bad', message: `${reqData.name} already exist!` }

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