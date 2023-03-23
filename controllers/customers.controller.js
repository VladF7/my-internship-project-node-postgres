import customersService from '../services/customers.service.js'

export default {
  getCustomers: async (req, res) => {
    try {
      const customers = await customersService.getCustomers()
      return res.json(customers)
    } catch (error) {
      console.log(error)
    }
  },
  getCustomerById: async (req, res) => {
    try {
      const id = req.params.id
      const customer = await customersService.getCustomerById(id)
      return res.json(customer)
    } catch (error) {
      console.log(error)
    }
  },
  editCustomer: async (req, res) => {
    try {
      const id = req.params.id
      const { name, email } = req.body
      const editedCustomer = await customersService.editCustomer(id, name, email)
      return res.json(editedCustomer)
    } catch (error) {
      console.log(error)
    }
  },
  delCustomer: async (req, res) => {
    try {
      const id = req.params.id
      const delCustomerId = await customersService.delCustomer(id)
      return res.json(delCustomerId)
    } catch (error) {
      console.log(error)
    }
  }
}
