const { CURRENCY } = require('../../models');

module.exports = {
    CREATE: async ({ body }) => {
        try {

            const reqData = body;
            const data = await CURRENCY.create(reqData);
            return { type: 'success', message: `Account created successfully`, data }

        } catch (error) {
            return { type: 'Exception', message: error }
        }
    }
    , FIND_ALL: async () => {
        try {

            const currency = await CURRENCY.find({})

            if (currency.length >= 1)
                return { type: 'success', message: `currency found`, data: currency }

            return { type: 'bad', message: `No Data Available` }

        } catch (error) {
            return { type: 'Exception', message: error }
        }
    }

    , FIND_ONE: async ({ params }) => {
        try {

            const { id } = params
            const currency = await CURRENCY.findOne({ _id: id })

            if (currency)
                return { type: 'success', message: `currency found`, data: currency }

            return { type: 'bad', message: `No Data Available` }

        } catch (error) {
            return { type: 'Exception', message: error }
        }
    }

    , UPDATE_BY_ID: async ({ params, body }) => {
        try {

            const { id } = params
            const currency = await CURRENCY.findOneAndUpdate({ _id: id }, body, { new: true })

            if (currency)
                return { type: 'success', message: `currency update`, data: currency }

            return { type: 'bad', message: `No Data Available` }

        } catch (error) {
            return { type: 'Exception', message: error }
        }
    }

    , DELETE_BY_ID: async ({ params }) => {
        try {
            const { id } = params
            const currency = await CURRENCY.findByIdAndDelete({ _id: id })

            if (currency)
                return { type: 'success', message: `currency deleted`, data: currency }

            return { type: 'bad', message: `No Data Available` }

        } catch (error) {
            return { type: 'Exception', message: error }
        }
    }
}