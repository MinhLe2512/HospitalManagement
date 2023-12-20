require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection;

module.exports.add_doctor = async function (
    first_name,
    last_name,
    email,
    dob,
    gender,
    address,
    phone,
    image,
    department,
    biography
  ) {
    var query =
    "INSERT INTO `doctor`(`first_name`,`last_name`,`email`,`dob`,"
    + "`gender`,`address`,`phone`,`image`,`department`,`biography`)"
    + " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let isSuccessful = false;
    await new Promise((resolve, reject) => {connection.query(query, 
        [first_name, last_name, email, dob, gender, address, phone, image, department, biography],
        function(err, res) {
            if (err) {
                reject();
                throw err;
            }
            isSuccessful = true;
            resolve();
        });
    });
    return isSuccessful;
}
module.exports.edit_doctor = async function(
    id,
    first_name,
    last_name,
    email,
    dob,
    gender,
    address,
    phone,
    image,
    department,
    biography) {
    var query = `UPDATE doctor SET first_name = '${first_name}', last_name = '${last_name}', email = '${email}', dob ='${dob}', gender = '${gender}', address = '${address}', phone = '${phone}', image = '${image}', department = '${department}', biography = '${biography}' WHERE id = ${id}`;
    let isSuccessful = false;
    await new Promise((resolve, reject) => { 
        connection.query(query,
        function(err, res) {
            if (err) {
                reject();
                throw err;
            }
            isSuccessful = true;
            resolve();
        });
    });
    return isSuccessful;
}

module.exports.add_appointment = async function(
    p_name,
    department,
    d_name,
    date,
    time,
    email,
    phone,) {
    var query =
    'INSERT INTO appointment (patient_name,department,doctor_name,date,time,email,phone) values (?, ?, ?, ?, ?, ?, ?)';
    let isSuccessful = false;
    await new Promise((resolve, reject) => { 
        connection.query(query, 
        [p_name, department, d_name, date, time, email, phone],
        function(err, res) {
            if (err) {
                reject();
                throw err;
            }
            isSuccessful = true;
            resolve();
        });
    });
    return isSuccessful;
}
module.exports.edit_appointment = async function(
    id,
    p_name,
    department,
    d_name,
    date,
    time,
    email,
    phone) {
    var query = `UPDATE appointment SET patient_name = '${p_name}', department = '${department}', doctor_name = '${d_name}', date ='${date}', time = '${time}', email = '${email}', phone = '${phone}' WHERE id = ${id}`;
    let isSuccessful = false;
    await new Promise((resolve, reject) => { 
        connection.query(query,
        function(err, res) {
            if (err) {
                reject();
                throw err;
            }
            isSuccessful = true;
            resolve();
        });
    });
    return isSuccessful;
}

module.exports.edit_med = async function (
    id,
    name,
    p_date,
    expire,
    e_date,
    price,
    quantity
  ) {
    var query = `UPDATE store SET name = '${name}', p_date = '${p_date}', expire = '${expire}', expire_end ='${e_date}', price = ${price}, quantity = ${quantity} WHERE id = ${id}`;
    let isSuccessful = false;
    await new Promise((resolve, reject) => { 
        connection.query(query,
        function(err, res) {
            if (err) {
                reject();
                throw err;
            }
            isSuccessful = true;
            resolve();
        });
    });
    return isSuccessful;
}

module.exports.add_med = async function( 
    name,
    p_date,
    expire,
    e_date,
    price,
    quantity
) {
    var query =
    "INSERT INTO store (name, p_date, expire, expire_end, price, quantity) values (?, ?, ?, ?, ?, ?)";
    let isSuccessful = false;
    await new Promise((resolve, reject) => { 
        connection.query(query, 
        [name, p_date, expire, e_date, price, quantity],
        function(err, res) {
            if (err) {
                reject();
                throw err;
            }
            isSuccessful = true;
            resolve();
        });
    });
    return isSuccessful;
};

module.exports.add_employee = async function (
    name,
    email,
    contact,
    join_date,
    role,
    salary
  ) {
    var query =
      "Insert into `employee` (`name`,`email`,`contact`,`join_date`,`role`,`salary`) values (?, ?, ?, ?, ?, ?)";
      let isSuccessful = false;
      await new Promise((resolve, reject) => { connection.query(query, 
        [name, email, contact, join_date, role, salary],
        function(err, res) {
            if (err) {
                reject();
                throw err;
            }
            isSuccessful = true;
            resolve();
        });
    });
    return isSuccessful;
};
module.exports.edit_employee = async function (
    id,
    name,
    email,
    contact,
    join_date,
    role,
    salary
) {
    var query = `UPDATE employee SET name = '${name}', email = '${email}', contact = '${contact}', join_date ='${join_date}', role = '${role}', salary = ${salary} WHERE id = ${id}`;
    let isSuccessful = false;
    await new Promise((resolve, reject) => { connection.query(query, 
        function(err, res) {
            if (err) {
                reject();
                throw err;
            }
            isSuccessful = true;
            resolve();
        });
    });
    return isSuccessful;
};

module.exports.add_leave = async function (
    name,
    id,
    leave_type,
    from,
    to,
    reason
) {
    var query = 
    "Insert into `leaves` (`employee`, `emp_id`, `leave_type`,`date_from`,`date_to`,`reason`) values (?, ?, ?, ?, ?, ?)";
    let isSuccessful = false;
    await new Promise((resolve, reject) => { connection.query(query, 
        [name, id, leave_type, from, to, reason],
        function(err, res) {
            if (err) {
                reject();
                throw err;
            }
            isSuccessful = true;
            resolve();
        });
    });
    return isSuccessful;
};

module.exports.edit_leave = async function (
    id,
    name,
    leave_type,
    from,
    to,
    reason
) {
    var query = `UPDATE leaves SET employee = '${name}', leave_type = '${leave_type}', date_from = '${from}', date_to ='${to}', reason = '${reason}' WHERE id = ${id}`;
    let isSuccessful = false;
    await new Promise((resolve, reject) => { connection.query(query, 
        function(err, res) {
            if (err) {
                reject();
                throw err;
            }
            isSuccessful = true;
            resolve();
        });
    });
    return isSuccessful;
};

module.exports.add_complain = async function (
    message,
    name,
    email,
    subject
) {
    var query =
    "INSERT INTO complain (message, name, email, subject) values (?, ?, ?, ?)";
    let isSuccessful = false;
    await new Promise((resolve, reject) => { connection.query(query, 
        [message, name, email, subject],
        function(err, res) {
            if (err) {
                reject();
                throw err;
            }
            isSuccessful = true;
            resolve();
        });
    });
    return isSuccessful;
}
module.exports.edit_complain = async function (
    id,
    message,
    name,
    email,
    subject
) {
    var query =
    "INSERT INTO complain (message, name, email, subject) values (?, ?, ?, ?)";
    let isSuccessful = false;
    await new Promise((resolve, reject) => { connection.query(query, 
        [message, name, email, subject],
        function(err, res) {
            if (err) {
                reject();
                throw err;
            }
            isSuccessful = true;
            resolve();
        });
    });
    return isSuccessful;
}

module.exports.findvalueswithkey = async function(table, value, key) {
    let results;
    await new Promise((resolve, reject) => {
        var query = `SELECT * FROM ${table} WHERE ${value} LIKE "%${key}%"`;
        console.log(query);
        connection.query(query, function(err, res) {
            if (err) {
                reject();
                throw err;
            }
            results = res;
            resolve();
        });
    });
    return results;
};

module.exports.deletefromtablewithkey = async function(table, value, key) {
    let isSuccessful = false;
    var query = `DELETE FROM ${table} WHERE ${value} = ${key}`;
    await new Promise((resolve, reject) => {
        connection.query(query, function(err, res) {
            if (err) {
                reject();
                throw err;
            }
            isSuccessful = true;
            resolve();
        });
    });
    return isSuccessful;
};

module.exports.getallfromtable = async function(table) {
    let results;
    await new Promise((resolve, reject) => {
        var query = "SELECT * FROM "+ table;
        connection.query(query, function(err, res) {
            if (err) {
                reject();
                throw err;
            }
            results = res;
            resolve();
        });
    });
    return results;
};

module.exports.addnewusers = function(username, email, password, status) {
    connection.query('INSERT INTO users(username, email, password, email_status) VALUES (?, ?, ?, ?)',
        [username, email, password, status],
        function(err, results) {
            console.log(results[0]);
        });
}

module.exports.register = async function(email, callback) {
    let results;
    await new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE email = ?',
            [email],
            function(err, res) {
                if (err) {
                    reject();
                    throw err;
                }
                results = res;
                resolve();
            }
        );
    });
    return results;
};

module.exports.verify = function(username, email, token, callback) {
    connection.query('INSERT INTO verify(username, email, token) VALUES(?, ?, ?)',
        [username, email, token],
        callback);
};

module.exports.getuserid = function(email, callback) {
    connection.query('SELECT * FROM verify WHERE email = ?',
        [email],
        callback);
};

module.exports.login = async function(username, password) {
    let results;
    await new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password],
        function(err, res) {
            if (err) {
                reject();
                throw err;
            }
            results = res;
            resolve();
        });
    });
    return results;
};