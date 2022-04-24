const { TRANSACTION_MODEL } = require('../../models');

module.exports = {
    CREATE: async ({ body }) => {
        try {

            const reqData = body;
            const data = await TRANSACTION_MODEL.create(reqData);
            return { type: 'success', message: `Account created successfully`, data }

        } catch (error) {
            return { type: 'Exception', message: error }
        }
    }
    , FIND_ALL: async () => {
        try {

            const transactions = await TRANSACTION_MODEL.find({})

            if (transactions.length >= 1)
                return { type: 'success', message: `transactions found`, data: transactions }

            return { type: 'bad', message: `No Data Available` }

        } catch (error) {
            return { type: 'Exception', message: error }
        }
    }

    , FIND_ONE: async ({ params }) => {
        try {

            const { id } = params
            const transaction = await TRANSACTION_MODEL.findOne({ _id: id })

            if (transaction)
                return { type: 'success', message: `transaction found`, data: transaction }

            return { type: 'bad', message: `No Data Available` }

        } catch (error) {
            return { type: 'Exception', message: error }
        }
    }

    , UPDATE_BY_ID: async ({ params, body }) => {
        try {

            const { id } = params
            const transaction = await TRANSACTION_MODEL.findOneAndUpdate({ _id: id }, body, { new: true })

            if (transaction)
                return { type: 'success', message: `transaction update`, data: transaction }

            return { type: 'bad', message: `No Data Available` }

        } catch (error) {
            return { type: 'Exception', message: error }
        }
    }

    , DELETE_BY_ID: async ({ params }) => {
        try {
            const { id } = params
            const transaction = await TRANSACTION_MODEL.findByIdAndDelete({ _id: id })

            if (transaction)
                return { type: 'success', message: `transaction deleted`, data: transaction }

            return { type: 'bad', message: `No Data Available` }

        } catch (error) {
            return { type: 'Exception', message: error }
        }
    }
}