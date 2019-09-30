var emailInput = document.getElementById('emailLogin');
var passwordInput = document.getElementById('passwordLogin');
var loginSubmit = document.getElementById('submitLogin');
var loginResult = document.getElementById('loginResult');

loginSubmit.addEventListener('click', function() {
    var req = new XMLHttpRequest();
    
    req.open('POST', 'http://localhost:9000/.netlify/functions/user/login');
    // req.open('POST', '/.netlify/functions/user/login');
    
    req.responseType = 'json';

    req.onload = function() {        
        var res = req.response;

        console.log(res);

        if (res.errors) {
            document.getElementById('emailLoginError').textContent = '';
            document.getElementById('passwordLoginError').textContent = '';
            loginResult.textContent = '';

            for (var field in res.errors) {
                if (field === 'login') {
                    loginResult.textContent = res.errors.login;
                    continue;
                }
                
                document.getElementById(field + 'LoginError').textContent = res.errors[field];
            }

            
        } else {
            document.getElementById('emailLoginError').textContent = '';
            document.getElementById('passwordLoginError').textContent = '';
            loginResult.textContent = '';
            
            localStorage.setItem('token', res.token);

            loginResult.textContent = 'User logged in';
        }
    };

    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value
    }));
});
