import database from '../database.js'

class DB1679327508 {
    async up () {
        await database.query(
            `CREATE TABLE clocks 
                (
                    id SERIAL PRIMARY KEY, 
                    size VARCHAR(255) NOT NULL, 
                    "timeToFix" INT NOT NULL
                )`
        )
        await database.query(
            `CREATE TABLE customers 
                (
                    id SERIAL PRIMARY KEY, 
                    name VARCHAR(255) NOT NULL, 
                    email VARCHAR(255) NOT NULL
                )`
        )
        await database.query(
            `CREATE TABLE cities 
                (
                    id SERIAL PRIMARY KEY, 
                    name VARCHAR(255) NOT NULL
                )`
        )
        await database.query(
            `CREATE TABLE masters 
                (
                    id SERIAL PRIMARY KEY, 
                    name VARCHAR(255) NOT NULL, 
                    rating INT NOT NULL
                )`
        )
        await database.query(
            `CREATE TABLE "citiesMasters" 
                (
                    "cityId" INT REFERENCES cities (id), 
                    "masterId" INT REFERENCES masters (id), 
                    CONSTRAINT cityMasterPK PRIMARY KEY ("cityId", "masterId")
                )`
        ) 
        await database.query(
            `CREATE TABLE orders 
                (
                    id SERIAL PRIMARY KEY, 
                    "customerId" INT REFERENCES customers (id), 
                    "clockId" INT REFERENCES clocks (id), 
                    "masterId" INT REFERENCES masters (id), 
                    "cityId" INT REFERENCES cities (id), 
                    "startTime" TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
                    "endTime" TIMESTAMP WITHOUT TIME ZONE NOT NULL
                )`
        )
    }
    async down () {
        await database.query(`DROP TABLE orders`)
        await database.query(`DROP TABLE "citiesMasters"`) 
        await database.query(`DROP TABLE masters`)
        await database.query(`DROP TABLE cities`)
        await database.query(`DROP TABLE customers`)
        await database.query(`DROP TABLE clocks`)
    }
}

export default new DB1679327508()