const express = require('express')
const pg = require('pg');
const app = express()
const PORT = 5000
const config = {
    host: 'localhost',
    user: 'postgres',     
    password: 'root',
    database: 'my-internship-db',
    port: 5432,
};

const client = new pg.Client(config);
client.connect(err => {
    if (err) throw err;
}  
)
app.use(express.json())


app.get('/api/cities', async(req,res)=>{
    try {
        const cities = await client.query("SELECT * FROM cities")
        res.json(cities.rows)
    } catch (error) {
        console.error(error);
    }
})
app.post('/api/cities', async(req,res)=>{
    try {
        const {city} = req.body
        const newCity = await client.query('INSERT INTO cities (city) values ($1) RETURNING *', [city])
        res.json(newCity.rows)
    } catch (error) {
        console.error(error);
    }
})
app.delete('/api/cities/:id', async(req,res)=>{
    try {
        const id = req.params.id
        const city = await client.query('DELETE FROM cities WHERE id = $1',[id])
        res.json(city)
    } catch (error) {
        console.error(error); 
    }
})


app.listen(PORT,()=>{
    console.log('Server started on PORT'+ ' ' + PORT );
})

