import customersModel from '../models/customers.model.js'

export default {
    async addCustomer(name,email) {
        return await customersModel.addCustomer(name,email)
    },  
    async getCustomerId (email) {
        try {
            return await customersModel.getCustomerId(email)
        } catch (error) {
            return undefined
        }
    },
    async getCustomers (){
        return await customersModel.getCustomers()
    },
    async getCustomerById (id){
        return await customersModel.getCustomerById(id)
    }, 
    async editCustomer (id,name,email){
        return await customersModel.editCustomer(id, name, email)
    },
    async delCustomer (id){
        try {
            return await customersModel.delCustomer(id)
        } catch (error) {
            return undefined
        }
    }, 
}
