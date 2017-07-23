import mongoose from 'mongoose';
import q from 'q';

const User = mongoose.model('User'),

register = (user) => {
    console.log('Inside register service', user);
    const deferred = q.defer();
    let currentUser = new User();
    currentUser.firstName = user.firstName;
    currentUser.lastName = user.lastName;
    currentUser.email = user.email;
    currentUser.mobile = user.mobile,
    currentUser.setPassword(user.password);

    currentUser.save(function(err) {
        if(err) {
            console.log('Registration failed');
            deferred.reject({"status": 500, "jsonResult": {"result": err}});
        } else {
            console.log('Registered successfully');
            var jwtToken = currentUser.generateJwt();
            console.log('jwtToken = ' + jwtToken);
            deferred.resolve({"status": 200, "jsonResult": {"result": jwtToken}});
        }
    });
    return deferred.promise;
},

login = (credentials) => {
    const deferred = q.defer();
    User.findOne({email: credentials.email}).exec(function(err, user) {
        if(err) {
            console.log('Server error');
            deferred.reject({"status": 500, "jsonResult": {"result": err}});
        } else if(user){
            if(user.isValidPassword(credentials.password)) {
                console.log('valid password');
                const jwtToken = user.generateJwt();
                deferred.resolve({"status": 200, "jsonResult": {"result": jwtToken}});
            } else {
                console.log('Invalid password');
                deferred.resolve({"status": 404, "jsonResult": {"result": "Invalid username or password"}});
            }
        } else {
            deferred.resolve({"status": 404, "jsonResult": {"result": "Invalid username or password"}});
        }
    });
    return deferred.promise;
};

export { register as registerService, login as loginService };
