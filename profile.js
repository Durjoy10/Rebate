const userId = window.location.pathname.split('/').pop();
$.get(`/api/user/${userId}`, function(response) {
    if (response.success) {
        const user = response.user;
        const profileContent = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <!-- Add more user information as needed -->
        `;
        $('#profileContent').html(profileContent);
    } else {
        alert(response.message);
    }
});