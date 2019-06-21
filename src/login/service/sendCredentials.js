import superagent from 'superagent';

export default function sendCredentials(username, password) {
    const promise =  new Promise((resolve, reject) => {
        superagent
        .get('http://localhost:4000/login/'+username)
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
        .get('http://localhost:4000/contact/'+userid)
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
        .get('http://localhost:4000/chart/user/'+userid)
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
        .get('http://localhost:4000/upload/'+userid)
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