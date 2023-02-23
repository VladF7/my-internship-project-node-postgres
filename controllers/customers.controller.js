const customersModel = require('../models/customers.model')

module.exports = {
    getCustomers: async (req,res)=>{
        try {
            const customers = await customersModel.getCustomers()
            return res.json(customers)
        } catch (error) {
            console.log(error);
        }
    },
    getCustomerById: async (req,res)=>{
        try {
            const id = req.params.id
        const customer = await customersModel.getCustomerById(id)
        return res.json(customer)
        } catch (error) {
            console.log(error);
        }
    },
    editCustomer: async (req,res)=>{
        try {
            const id = req.params.id
            const {name,email} = req.body
            const editedCustomer = await customersModel.editCustomer(id,name,email)
            return res.json(editedCustomer)
        } catch (error) {
            console.log(error);
        }
    },
    delCustomer: async (req,res)=>{
        try {
            const id = req.params.id
            const delCustomerId = await customersModel.delCustomer(id)
            return res.json(delCustomerId)
        } catch (error) {
            console.log(error);
        }
    },
}