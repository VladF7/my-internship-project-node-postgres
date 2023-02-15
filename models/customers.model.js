const database = require('../database')

module.exports = {
    addCustomer: async(name,email)=>{
        const newCustomer = await database.query('INSERT INTO customers (name,email) VALUES ($1,$2) RETURNING *',[name,email])
        return newCustomer.rows
    },  
    getCustomerId: async (email) => {
        const customerId = await database.query('SELECT id FROM customers WHERE email = $1',[email])
        return customerId.rows[0].id
    },
    getCustomers: async ()=>{
        const masters = await database.query("SELECT * FROM customers ORDER BY id DESC") 
        return masters.rows
    },
    getCustomerById: async (id)=>{
        const master = await database.query('SELECT * FROM customers WHERE id = $1',[id])
        return master.rows[0]
    }, 
     editCustomer: async (id,name,email)=>{
        const editedCustomer = await database.query('UPDATE customers SET name=$1, email=$2 WHERE id = $3 RETURNING *', [name,email,id])
        return editedCustomer.rows
    },
    delCustomer: async (id)=>{
        return await database.query('DELETE FROM customers WHERE id = $1',[id])
    }, 
}