'use strict';

const client = require('../db');
const constants = require('../constants');

const saveStudent = async data => {
    let response = {
        message: constants.FAILED
    }

    try {
        const {
            name,
            classNo,
            rollNo,
            address
        } = data;

        const sql = 'INSERT INTO student (name, class_no, roll_no, address) VALUES($1, $2, $3, $4) RETURNING *';
        const values = [name, classNo, rollNo, address];
        const result = await client.query(sql, values);
        await client.query('COMMIT');
        if(result) {
            response.message = constants.SAVE;
            response.data = normalizeData(result.rows[0]);
        }
    } catch (err) {
        await client.query('ROLLBACK');
        response.error = err;
    }

    return response;
}

const updateStudent = async data => {
    let response = {
        message: constants.FAILED
    }
    try {
        const {
            id,
            name,
            classNo,
            rollNo,
            address
        } = data;

        const student = await getStudentById(id);

        if(student) {
            const sql = 'UPDATE student SET name = $1, class_no = $2, roll_no = $3, address = $4 WHERE id = $5 RETURNING *';
            const values = [name, classNo, rollNo, address, id];
            const result = await client.query(sql, values);
            await client.query('COMMIT');
            if(result) {
                response.message = constants.UPDATE;
                response.data = normalizeData(result.rows[0]);
            }
        } else {
            response.message = constants.NOT_FOUND;
        }
    } catch (err) {
        await client.query('ROLLBACK');
        response.error = err;
    }

    return response;
}

const getStudent = async data => {
    let response = {
        message: constants.FAILED
    }

    try {
        if(data?.id) {
            const student = await getStudentById(data.id);
            response.message = constants.SUCCESS;
            response.data = student;

            return response;
        } else {
            const sql = 'SELECT * FROM student ORDER BY created_on ASC';
            const res =  await client.query(sql);
            if(res) {
                response.message = constants.SUCCESS;
                let arr = [];
                res.rows.forEach(rs => {
                    arr.push(normalizeData(rs));
                })
                response.data = arr;

                return response;
            } else {
                response.error = res;
            }
        }
    } catch (err) {
        response.error = err;
        return response;
    }
}

const deleteStudent = async data => {
    let response = {
        message: constants.FAILED
    }

    try {
        const student = await getStudentById(data.id);

        if(student) {
            const sql = 'DELETE FROM student WHERE id = $1';
            const values = [data.id];
            const result = await client.query(sql, values);
            await client.query('COMMIT');
            if(result) {
                response.message = constants.DELETE;
            }
        } else {
            response.message = constants.NOT_FOUND;
        }

    } catch (err) {
        await client.query('ROLLBACK');
        response.error = err;
    }

    return response;
}

const getStudentById = async id => {
    try {
        const sql = 'SELECT * FROM student WHERE id = $1';
        const values = [id];
        const result =  await client.query(sql, values);
        if(result.rowCount > 0) {
            const obj = normalizeData(result.rows[0]);
            return obj;
        } else {
            return '';
        }
    } catch (err) {
        throw new Error(err);
    }
}

const normalizeData = data => {
    const {
        id,
        name,
        class_no,
        roll_no,
        address,
        created_on
    } = data;
    
    return {
        id,
        name,
        classNo: class_no,
        rollNo: roll_no,
        address,
        createdOn: created_on
    };

}

module.exports = {
    saveStudent,
    updateStudent,
    getStudent,
    deleteStudent
}