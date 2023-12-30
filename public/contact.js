

$(document).ready(function() {
    // Contact Form Submission
    $('#contactForm').submit(function(event) {
        event.preventDefault();
        const name = $('#name').val();
        const email = $('#email').val();
        const message = $('#message').val();

        $.post('/api/contact', { name, email, message }, function(response) {
            if (response.success) {
                alert('Message sent successfully!');
            } else {
                alert('Failed to send message. Please try again later.');
            }
        });
    });

    // Additional logic for other pages can be added here
});
