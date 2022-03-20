'use strict';

const API_VESION_V1 = 'v1';
const SUCCESS = 'Success';
const FAILED = 'Failed';
const SAVE = 'Saved';
const UPDATE = 'Updated';
const DELETE = 'Deleted';
const NOT_FOUND = 'Record not exist in database';
const INVALID = 'Invalid';
const VALID = 'Valid';
const INTERNAL_SERVER_ERROR = 'Something went wrong';
const VALIDATION_MSG = {
    BASE_STRING: 'should be a type of text',
    BASE_NUMBER: 'should be a type of number',
    EMPTY_STRING: 'cannot be an empty field',
    MIN_STRING: 'should have a minimum length of {#limit}',
    MAX_STRING: 'should have a maximum length of {#limit}',
    MIN_NUMBER: 'should have a minimum value of {#limit}',
    MAX_NUMBER: 'should have a maximum value of {#limit}',
    REQUIRED: 'is a required field'
}

module.exports = {
    API_VESION_V1,
    SUCCESS,
    FAILED,
    SAVE,
    UPDATE,
    DELETE,
    NOT_FOUND,
    INVALID,
    VALID,
    INTERNAL_SERVER_ERROR,
    VALIDATION_MSG
}