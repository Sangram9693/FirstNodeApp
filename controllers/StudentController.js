'use strict';

const Joi = require('joi');
const studentDAO = require('../dao/StudentDAO');
const constants = require('../constants');

const operations = ['create', 'update', 'forId']

const createStudent = async (req, resp) => {
    let status = 500;
    let result = constants.INTERNAL_SERVER_ERROR;
    try {
        const reqBody = req.body;
        const validResp = validation(reqBody, operations[0]);
        if(validResp && validResp.message !== constants.VALID) {
            resp.status(400);
            resp.send(validResp.message);
            return resp;
        }

        const dbResponse = await studentDAO.saveStudent(reqBody);
        if(dbResponse.message !== constants.FAILED) {
            status = 200;
            result = dbResponse.data ? dbResponse.data : dbResponse.message;
        }

    } catch (error) {
        result = error;
    }

    resp.status(status);
    resp.send(result);
    return resp;
}

const updateStudent = async (req, resp) => {
    let status = 500;
    let result = constants.INTERNAL_SERVER_ERROR;
    try {
        const reqBody = req.body;
        const reqParams = req.params;
        const arg = {...reqBody, ...reqParams };
        const validResp = validation(arg, operations[1]);

        if(validResp && validResp.message !== constants.VALID) {
            resp.status(400);
            resp.send(validResp.message);
            return resp;
        }

        const dbResponse = await studentDAO.updateStudent(arg);
        if(dbResponse.message !== constants.FAILED) {
            status = 200;
            result = dbResponse.data ? dbResponse.data : dbResponse.message;
        }

    } catch (error) {
        result = error;
    }

    resp.status(status);
    resp.send(result);
    return resp;
}

const getAllStudent = async (req, resp) => {
    let status = 500;
    let result = constants.INTERNAL_SERVER_ERROR;
    try {
        const dbResponse = await studentDAO.getStudent('');
        if(dbResponse.message !== constants.FAILED) {
            status = 200;
            result = dbResponse.data ? dbResponse.data : dbResponse.message;
        }

    } catch (error) {
        result = error;
    }

    resp.status(status);
    resp.send(result);
    return resp;
}

const getByStudentId = async (req, resp) => {
    let status = 500;
    let result = constants.INTERNAL_SERVER_ERROR;
    try {
        const arg = req.params;
        const validResp = validation(arg, operations[2]);
        if(validResp && validResp.message !== constants.VALID) {
            resp.status(400);
            resp.send(validResp.message);
            return resp;
        }
        
        const dbResponse = await studentDAO.getStudent(arg);
        if(dbResponse.message !== constants.FAILED) {
            status = 200;
            result = dbResponse.data ? dbResponse.data : dbResponse.message;
        }

    } catch (error) {
        result = error;
    }

    resp.status(status);
    resp.send(result);
    return resp;
}

const deleteStudent = async (req, resp) => {
    let status = 500;
    let result = constants.INTERNAL_SERVER_ERROR;
    try {
        const arg =  req.params;
        const validResp = validation(arg, operations[2]);
        if(validResp && validResp.message !== constants.VALID) {
            resp.status(400);
            resp.send(validResp.message);
            return resp;
        }
        
        const dbResponse = await studentDAO.deleteStudent(arg);
        if(dbResponse.message !== constants.FAILED) {
            status = 200;
            result = dbResponse.data ? dbResponse.data : dbResponse.message;
        }

    } catch (error) {
        result = error;
    }

    resp.status(status);
    resp.send(result);
    return resp;
}

const validation = (data, type) => {
    let response = {
        message: constants.VALID
    };

    try {
        const objCreate = {
            name: Joi.string().min(3).max(20).required().messages({
                "string.base": `"name" ${constants.VALIDATION_MSG.BASE_STRING}`,
                "string.empty": `"name" ${constants.VALIDATION_MSG.EMPTY_STRING}`,
                "string.min": `"name" ${constants.VALIDATION_MSG.MIN_STRING}`,
                "string.max": `"name" ${constants.VALIDATION_MSG.MAX_STRING}`,
                "any.required": `"name" ${constants.VALIDATION_MSG.REQUIRED}`
            }),
            classNo: Joi.string().min(1).max(10).required().messages({
                "string.empty": `"classNo" ${constants.VALIDATION_MSG.EMPTY_STRING}`,
                "string.min": `"classNo" ${constants.VALIDATION_MSG.MIN_STRING}`,
                "string.max": `"classNo" ${constants.VALIDATION_MSG.MAX_STRING}`,
                "any.required": `"classNo" ${constants.VALIDATION_MSG.REQUIRED}`
            }),
            rollNo: Joi.number().min(1).max(100).required().messages({
                "number.base": `"rollNo" ${constants.VALIDATION_MSG.BASE_NUMBER}`,
                "number.empty": `"rollNo" ${constants.VALIDATION_MSG.EMPTY_STRING}`,
                "number.min": `"rollNo" ${constants.VALIDATION_MSG.MIN_NUMBER}`,
                "number.max": `"rollNo" ${constants.VALIDATION_MSG.MAX_NUMBER}`,
                "any.required": `"rollNo" ${constants.VALIDATION_MSG.REQUIRED}`
            }),
            address: Joi.string().min(1).max(30).optional().messages({
                "string.empty": `"address" ${constants.VALIDATION_MSG.EMPTY_STRING}`,
                "string.min": `"address" ${constants.VALIDATION_MSG.MIN_STRING}`,
                "string.max": `"address" ${constants.VALIDATION_MSG.MAX_STRING}`
            })
        }

        const objUpdate = {
            id: Joi.number().required().messages({
                "number.base": `"id" ${constants.VALIDATION_MSG.BASE_NUMBER}`,
                "any.required": `"id" ${constants.VALIDATION_MSG.REQUIRED}`
            }),
            name: Joi.string().min(3).max(20).required().messages({
                "string.base": `"name" ${constants.VALIDATION_MSG.BASE_STRING}`,
                "string.empty": `"name" ${constants.VALIDATION_MSG.EMPTY_STRING}`,
                "string.min": `"name" ${constants.VALIDATION_MSG.MIN_STRING}`,
                "string.max": `"name" ${constants.VALIDATION_MSG.MAX_STRING}`,
                "any.required": `"name" ${constants.VALIDATION_MSG.REQUIRED}`
            }),
            classNo: Joi.string().min(1).max(10).required().messages({
                "string.empty": `"classNo" ${constants.VALIDATION_MSG.EMPTY_STRING}`,
                "string.min": `"classNo" ${constants.VALIDATION_MSG.MIN_STRING}`,
                "string.max": `"classNo" ${constants.VALIDATION_MSG.MAX_STRING}`,
                "any.required": `"classNo" ${constants.VALIDATION_MSG.REQUIRED}`
            }),
            rollNo: Joi.number().min(1).max(100).required().messages({
                "number.base": `"rollNo" ${constants.VALIDATION_MSG.BASE_NUMBER}`,
                "number.empty": `"rollNo" ${constants.VALIDATION_MSG.EMPTY_STRING}`,
                "number.min": `"rollNo" ${constants.VALIDATION_MSG.MIN_NUMBER}`,
                "number.max": `"rollNo" ${constants.VALIDATION_MSG.MAX_NUMBER}`,
                "any.required": `"rollNo" ${constants.VALIDATION_MSG.REQUIRED}`
            }),
            address: Joi.string().min(1).max(30).optional().messages({
                "string.empty": `"address" ${constants.VALIDATION_MSG.EMPTY_STRING}`,
                "string.min": `"address" ${constants.VALIDATION_MSG.MIN_STRING}`,
                "string.max": `"address" ${constants.VALIDATION_MSG.MAX_STRING}`
            })
        }

        const obj = {
            id: Joi.number().required().messages({
                "number.base": `"id" ${constants.VALIDATION_MSG.BASE_NUMBER}`,
                "any.required": `"id" ${constants.VALIDATION_MSG.REQUIRED}`
            })
        }

        let joiSchema = ''
        switch (type) {
            case operations[0]:
                joiSchema = Joi.object(objCreate);
                break;
            case operations[1]:
                joiSchema = Joi.object(objUpdate);
                break;
            default:
                joiSchema = Joi.object(obj);
        }

        const errorTxt = joiSchema.validate(data).error;
        if(errorTxt)
            response.message = errorTxt.message;
    } catch (err) {
        response.message = err.message;
    }

    return response;
}

module.exports = {
    createStudent,
    updateStudent,
    getAllStudent,
    getByStudentId,
    deleteStudent
}