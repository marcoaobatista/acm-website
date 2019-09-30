var deleteButton = document.getElementById('deleteAccount');

if (localStorage.getItem('token')) {
    deleteButton.style.display = 'block';

    deleteButton.addEventListener('click', function() {
        var item = {

        }
        
        var req = new XMLHttpRequest();
        req.open('DELETE', '/.netlify/functions/user');
        // req.open('DELETE', 'http://localhost:9000/.netlify/functions/user');
        req.setRequestHeader('Content-Type', 'application/json');
        req.setRequestHeader('x-auth-token', localStorage.getItem('token'));
        req.responseType = 'json';
        req.onload = function() {
            var res = req.response;
            
            if (res.errors) {
                console.log(res.errors);
            } else {
                localStorage.removeItem('token');
                
                document.getElementById('deleteResult').textContent = 'Your account was deleted';
            }
        }

        req.send();
    });
}

