var config = require('./dbConfig');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const { password } = require('./dbConfig');
//const event = require('./event');

async function getCategory () {
    try{
        let pool = await sql.connect(config);
        let items = await pool.request().query("select * from [dbo].[categories]");
        return items.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getType () {
    try{
        let pool = await sql.connect(config);
        let items = await pool.request().query("select * from [dbo].[types]");
        return items.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getSize () {
    try{
        let pool = await sql.connect(config);
        let items = await pool.request().query("select * from [dbo].[sizes]");
        return items.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getNweItems () {
    try{
        let pool = await sql.connect(config);
        let items = await pool.request().query("[dbo].[topItems]");
        return items.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function addItem (item) {
    try{
        let pool = await sql.connect(config);
        const insert = await pool.request()

        .input('userID',sql.NVarChar,item.userID)
        .input('categoryID',sql.NVarChar,item.categoryID)
        .input('typeID',sql.NVarChar,item.typeID)
        .input('sizeID',sql.NVarChar,item.sizeID)
        .input('image',sql.NVarChar,item.image)
        .input('for',sql.NVarChar,item.for)
        .input('note',sql.NVarChar,item.note)
        .execute('[dbo].[createItem]');
        return insert.recordset[0];  
     }
    catch (error) {
        console.log(error);
       }
    
}

async function getUsersItemsById (user) {
    try{
        let pool = await sql.connect(config);
        const insert = await pool.request()

        .input('userID',sql.NVarChar,user.userID)
        .execute('[dbo].[userItems]');
        return insert.recordset;  
     }
    catch (error) {
        console.log(error);
       }
}

async function searchItems (word) {
    try{
        let pool = await sql.connect(config);
        const insert = await pool.request()

        .input('searchWord',sql.NVarChar,word.word)
        .execute('[dbo].[searchItems]');
        console.log(insert.recordset)
        return insert.recordset;  
     }
    catch (error) {
        console.log(error);
       }
    
}

async function getItemByID (itemID) {
    try{
        let pool = await sql.connect(config);
        const insert = await pool.request()

        .input('itemID',sql.NVarChar,itemID.itemID)
        .execute('[dbo].[getItemByID]');
        console.log(insert.recordset);
        return insert.recordset;  
     }
    catch (error) {
        console.log(error);
       } 
}

async function deleteItemByID (itemID) {
    try{
        let pool = await sql.connect(config);
        const insert = await pool.request()

        .input('itemID',sql.NVarChar,itemID.itemID)
        .execute('[dbo].[deleteitem]');
        console.log(insert.recordset);
        return insert.recordset;  
     }
    catch (error) {
        console.log(error);
       } 
}



module.exports = {

    getCategory: getCategory,
    getType:getType,
    getSize:getSize,
    getNweItems:getNweItems,
    addItem:addItem,
    getUsersItemsById: getUsersItemsById,
    searchItems: searchItems,
    getItemByID: getItemByID,
    deleteItemByID: deleteItemByID,
}
