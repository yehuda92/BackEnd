var config = require('./dbConfig');
const sql = require('mssql');
const bcrypt = require('bcrypt');

const { password } = require('./dbConfig');
const { response } = require('express');


async function signUp (user) {
    try{
        let pool = await sql.connect(config);
        let hashedPassword = await bcrypt.hash(user.password,10)
        const insert = await pool.request()

        .input('firstName',sql.NVarChar,user.firstName)
        .input('lastName',sql.NVarChar,user.lastName)
        .input('email',sql.NVarChar,user.email)
        .input('phoneNumber',sql.NVarChar,user.phoneNumber)
        .input('password',sql.NVarChar,hashedPassword)
        .execute('[dbo].[createUser]')
        return insert.recordset[0].userID;   
     }
    catch (error) {
        console.log(error);
    }
}

async function login (userLogin) {

    try{
        let pool = await sql.connect(config);
        let password = userLogin.password;
        const insert = await pool.request()

        .input('email',sql.NVarChar,userLogin.email)
        .execute('[dbo].[checkUser]');
    
        console.log(insert.recordset)
        userLogin.userID = insert.recordset[0].userID;
        userLogin.password = insert.recordset[0].password;
        
        const isMatch = await bcrypt.compare(password,userLogin.password)
        if(isMatch) {
           return userLogin.userID; 
        }
        else
            return -1;  
     }
    catch (error) {
        console.log(error);
    }
}

async function updateUser (user) {
    try{
        let pool = await sql.connect(config);
        let hashedPassword = await bcrypt.hash(user.password,10)

        const insert = await pool.request()
        .input('userID',sql.NVarChar,user.userID)
        .input('firstName',sql.NVarChar,user.firstName)
        .input('lastName',sql.NVarChar,user.lastName)
        .input('phoneNumber',sql.NVarChar,user.phoneNumber)
        .input('password',sql.NVarChar,hashedPassword)
        .execute('[dbo].[updateUser]')
        return insert.recordset[0].userID;   
     }
    catch (error) {
        console.log(error);
    }
}

async function deleteUser (user) {

    try{

        let pool = await sql.connect(config);
        let password = user.password;
        const insert = await pool.request()

        .input('userID',sql.NVarChar,user.userID)
        .execute('[dbo].[getUserPassword]');
        const isMatch = await bcrypt.compare(password,insert.recordset[0].password)
        if(isMatch) {
            let pool = await sql.connect(config);
            const insert = await pool.request()
    
            .input('userID',sql.NVarChar,user.userID)
            .execute('[dbo].[deleteUser]');
            return insert.recordset[0].userID; 
        }
        else
            console.log(isMatch)
            return 0;  
     }
    catch (error) {
        console.log(error);
    }
}

async function getUser (userID) {
    try{
        let pool = await sql.connect(config);
        const insert = await pool.request()
        .input('userID',sql.NVarChar, parseInt(userID.userID))
        .execute('[dbo].[getUserByID]')
        console.log(insert.recordset)
        return insert.recordset;   
     }
    catch (error) {
        console.log(error);
    }
}


async function forgotPassword (email) {

    try{
        let pool = await sql.connect(config);
        const insert = await pool.request()

        .input('email',sql.NVarChar,email.email)
        .execute('[dbo].[forgotPassword]');
        return insert.recordset;  
     }
    catch (error) {
        console.log(error);
       } 
}

module.exports = {
  
    signUp: signUp,
    login: login,
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    forgotPassword: forgotPassword
}