var emailRegisterInput = document.getElementById('emailRegister');
var passwordRegisterInput = document.getElementById('passwordRegister');
var secretRegisterInput = document.getElementById('secretRegister');
var registerSubmit = document.getElementById('submitRegister');
var registerResult = document.getElementById('registerResult');

registerSubmit.addEventListener('click', function() {
    var req = new XMLHttpRequest();
    // req.open('POST', 'http://localhost:9000/.netlify/functions/user/register');
    req.open('POST', '/.netlify/functions/user/register');

    req.responseType = 'json';

    req.onload = function() {
        var res = req.response;
        
        if (res.errors) {
            document.getElementById('emailRegisterError').textContent = '';
            document.getElementById('passwordRegisterError').textContent = '';
            document.getElementById('secretRegisterError').textContent = '';
            registerResult.textContent = '';

            if (res.errors.register) {                
                registerResult.textContent = res.errors.register;
                return;
            }

            for (var field in res.errors) {
                document.getElementById(field + 'RegisterError').textContent = res.errors[field];
            }
        } else {
            document.getElementById('emailRegisterError').textContent = '';
            document.getElementById('passwordRegisterError').textContent = '';
            document.getElementById('secretRegisterError').textContent = '';
            registerResult.textContent = '';
            
            localStorage.setItem('token', res.token);

            registerResult.textContent = 'User registered';
        }
    };

    req.setRequestHeader('Content-Type', 'application/json');

    req.send(JSON.stringify({
        email: emailRegisterInput.value,
        password: passwordRegisterInput.value,
        secret: secretRegisterInput.value
    }));
});
