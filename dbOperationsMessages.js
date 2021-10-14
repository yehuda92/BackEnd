var config = require('./dbConfig');
const sql = require('mssql');
const bcrypt = require('bcrypt');

const { password } = require('./dbConfig');
const { response } = require('express');

async function createMessage (message) {
    console.log(message);
    try{
        let pool = await sql.connect(config);
        const insert = await pool.request()

        .input('first_name',sql.NVarChar,message.firstName)
        .input('last_name',sql.NVarChar,message.lastName)
        .input('email',sql.NVarChar,message.email)
        .input('userID',sql.NVarChar,message.destination)
        .input('subject',sql.NVarChar,message.subject)
        .input('message',sql.NVarChar,message.message)
        .execute('[dbo].[createMessage]')
        return insert.recordset;   
     }
    catch (error) {
        console.log(error);
    }
}

async function getUserMessages (userID) {
    console.log(userID)
    try{
        let pool = await sql.connect(config);
        const insert = await pool.request()

        .input('userID',sql.NVarChar,parseInt(userID.userID))
        .execute('[dbo].[getUserMessages]');
        console.log(insert.recordset)
        return insert.recordset;  
     }
    catch (error) {
        console.log(error);
       } 
}

async function markAsRead (info) {

    console.log("mark", info);
    try{
        let pool = await sql.connect(config);
        const insert = await pool.request()

        .input('userID',sql.NVarChar,info.userID)
        .input('messageID',sql.NVarChar,info.messageID)
        .execute('[dbo].[updateMessage]');
        return insert.recordset;  
     }
    catch (error) {
        console.log(error);
       } 
}

async function deleteMessage (info) {

    try{
        let pool = await sql.connect(config);
        const insert = await pool.request()

        .input('userID',sql.NVarChar,info.userID)
        .input('messageID',sql.NVarChar,info.messageID)
        .execute('[dbo].[deleteMessage]');
        return insert.recordset;  
     }
    catch (error) {
        console.log(error);
       } 
}

module.exports = {
    
    createMessage: createMessage,
    getUserMessages: getUserMessages,
    markAsRead: markAsRead,
    deleteMessage: deleteMessage,
}