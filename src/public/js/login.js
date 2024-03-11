$(document).ready(function () {
    const loginBtn = $('#loginBtn');
    
    loginBtn.on('click', function (e) {
        e.preventDefault();

        const username = $('#username').val();
        const password = $('#password').val();

        if (!username || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Make an AJAX request using the fetch API
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => {
            if (res.redirected && res.status === 200) {
                window.location.href = res.url;
            }
            else {
                alert('Username or password is incorrect');
                throw new Error('Username or password is incorrect');
            }
        })
        .catch(error => {
            // Handle errors during the fetch request
            console.error(error);
        });
    });
});
