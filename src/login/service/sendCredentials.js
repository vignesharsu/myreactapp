import superagent from 'superagent';

export function getUserInfo(username, password) {
    const promise =  new Promise((resolve, reject) => {
        superagent
        .get('http://localhost:4000/login/users')
        .query({userName : username, password: password})
        .then(res => {
            return resolve(JSON.parse(res.text));
            // res.body, res.headers, res.status
        })
        .catch(err => {
            return reject(err);
            // err.message, err.response
        });
    });
    return promise;    
};

export function getContactInfo(userid) {
    const promise =  new Promise((resolve, reject) => {
        superagent
        .get('http://localhost:4000/contact/users')
        .query({userId : userid})
        .then(res => {
            return resolve(res);
            // res.body, res.headers, res.status
        })
        .catch(err => {
            return reject(err);
            // err.message, err.response
        });
    });
    return promise;    
};

export function updateContactInfo(userid,name,designation,
    mobile,email,address) {
    const promise =  new Promise((resolve, reject) => {
        superagent
        .post('http://localhost:4000/contact/update')
        .send({userId: userid, name: name, designation: designation, mobile: mobile,
        email: email, address: address})
        .then(res => {
            return resolve(res);
            // res.body, res.headers, res.status
        })
        .catch(err => {
            return reject(err);
            // err.message, err.response
        });
    });
    return promise;    
};

export function getChartData(userid) {
    const promise =  new Promise((resolve, reject) => {
        superagent
        .get('http://localhost:4000/chart/users')
        .query({userId : userid})
        .then(res => {
            return resolve(JSON.parse(res.text));
            // res.body, res.headers, res.status
        })
        .catch(err => {
            return reject(err);
            // err.message, err.response
        });
    });
    return promise;    
};

export function getImage(userid) {
    const promise =  new Promise((resolve, reject) => {
        superagent
        .get('http://localhost:4000/upload/image')
        .query({userId: userid})
        .then(res => {
            return resolve(res);
            // res.body, res.headers, res.status
        })
        .catch(err => {
            return reject(err);
            // err.message, err.response
        });
    });
    return promise;    
};

export function registerUser(user,password,name,designation,
    mobile,email,address) {
    const promise =  new Promise((resolve, reject) => {
        superagent
        .post('http://localhost:4000/login/register')
        .send({userName: user, password: password, name: name, designation: designation, mobile: mobile,
        email: email, address: address})
        .then(res => {
            return resolve(res);
            // res.body, res.headers, res.status
        })
        .catch(err => {
            return reject(err);
            // err.message, err.response
        });
    });
    return promise;    
};