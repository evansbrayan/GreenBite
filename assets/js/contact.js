
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert('Message sent successfully!');
        function adddata() {
        userdata={
            userfname :name,
            useremail :email,
            usermsg :message
        }
        localStorage.setItem("userdata",JSON.stringify(userdata));
    }
    adddata();
        // You can also implement actual form submission here using AJAX or a backend API.
    } else {
        alert('Please fill out all fields.');
    }
    
});