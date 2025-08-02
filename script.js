
        document.addEventListener('DOMContentLoaded', function() {
            // Form and feedback elements
            const form = document.getElementById('registration-form');
            const feedbackDiv = document.getElementById('form-feedback');
            
            // Form submission event listener
            form.addEventListener('submit', function(event) {
                // Prevent form submission
                event.preventDefault();
                
                // Clear previous feedback
                feedbackDiv.style.display = 'none';
                feedbackDiv.innerHTML = '';
                
                // Reset error borders
                document.querySelectorAll('input').forEach(input => {
                    input.classList.remove('error-border');
                });
                
                // Get input values and trim whitespace
                const username = document.getElementById('username').value.trim();
                const email = document.getElementById('email').value.trim();
                const password = document.getElementById('password').value;
                
                // Validation variables
                let isValid = true;
                const messages = [];
                
                // Validate username
                if (username.length === 0) {
                    isValid = false;
                    messages.push('Username is required');
                    document.getElementById('username').classList.add('error-border');
                } else if (username.length < 3) {
                    isValid = false;
                    messages.push('Username must be at least 3 characters');
                    document.getElementById('username').classList.add('error-border');
                }
                
                // Validate email
                if (email.length === 0) {
                    isValid = false;
                    messages.push('Email is required');
                    document.getElementById('email').classList.add('error-border');
                } else {
                    // Check for '@' and '.'
                    const atIndex = email.indexOf('@');
                    const dotIndex = email.indexOf('.', atIndex);
                    
                    if (atIndex < 1 || dotIndex < atIndex + 2 || dotIndex === email.length - 1) {
                        isValid = false;
                        messages.push('Email must contain \'@\' and \'.\' in appropriate positions');
                        document.getElementById('email').classList.add('error-border');
                    }
                }
                
                // Validate password
                if (password.length === 0) {
                    isValid = false;
                    messages.push('Password is required');
                    document.getElementById('password').classList.add('error-border');
                } else if (password.length < 8) {
                    isValid = false;
                    messages.push('Password must be at least 8 characters');
                    document.getElementById('password').classList.add('error-border');
                }
                
                // Display feedback
                feedbackDiv.style.display = 'block';
                
                if (isValid) {
                    // Success feedback
                    feedbackDiv.textContent = 'Registration successful!';
                    feedbackDiv.className = 'feedback-success';
                    
                    // Reset form
                    form.reset();
                } else {
                    // Error feedback
                    feedbackDiv.innerHTML = messages.join('<br>');
                    feedbackDiv.className = 'feedback-error';
                }
            });
            
            // Password strength indicator
            document.getElementById('password').addEventListener('input', function() {
                const password = this.value;
                const lengthRule = document.getElementById('length-rule');
                
                if (password.length >= 8) {
                    lengthRule.classList.add('valid');
                } else {
                    lengthRule.classList.remove('valid');
                }
            });
        });
    