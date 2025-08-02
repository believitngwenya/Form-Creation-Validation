document.addEventListener('DOMContentLoaded', function() {
            // DOM elements
            const apiDataElement = document.getElementById('api-data');
            const fetchButton = document.getElementById('fetch-data');
            const refreshButton = document.getElementById('refresh-data');
            
            // Display initial loading state
            apiDataElement.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Click "Fetch User Data" to load information</p>
                </div>
            `;
            
            // Async function to fetch user data
            async function fetchUserData() {
                // API URL
                const apiUrl = 'https://jsonplaceholder.typicode.com/users';
                
                // Select the data container
                const dataContainer = document.getElementById('api-data');
                
                try {
                    // Show loading state
                    dataContainer.innerHTML = `
                        <div class="loading">
                            <div class="spinner"></div>
                            <p>Loading user data...</p>
                        </div>
                    `;
                    
                    // Fetch data from API
                    const response = await fetch(apiUrl);
                    
                    // Check if response is successful
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    // Parse JSON data
                    const users = await response.json();
                    
                    // Clear loading message
                    dataContainer.innerHTML = '';
                    
                    // Create user list
                    const userList = document.createElement('ul');
                    userList.className = 'user-list';
                    
                    // Loop through users and create cards
                    users.forEach(user => {
                        const userCard = document.createElement('li');
                        userCard.className = 'user-card';
                        
                        userCard.innerHTML = `
                            <h3>${user.name}</h3>
                            <div class="user-info">
                                <i class="fas fa-envelope"></i>
                                <span>${user.email}</span>
                            </div>
                            <div class="user-info">
                                <i class="fas fa-phone"></i>
                                <span>${user.phone}</span>
                            </div>
                            <div class="user-info">
                                <i class="fas fa-globe"></i>
                                <span>${user.website}</span>
                            </div>
                            <div class="user-info">
                                <i class="fas fa-building"></i>
                                <span>${user.company.name}</span>
                            </div>
                            <div class="user-info">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${user.address.city}, ${user.address.street}</span>
                            </div>
                        `;
                        
                        userList.appendChild(userCard);
                    });
                    
                    // Append user list to container
                    dataContainer.appendChild(userList);
                    
                } catch (error) {
                    // Handle errors
                    console.error('Error fetching user data:', error);
                    
                    // Clear container and show error message
                    dataContainer.innerHTML = '';
                    dataContainer.innerHTML = `
                        <div class="error-message">
                            <i class="fas fa-exclamation-triangle"></i>
                            <p>Failed to load user data.</p>
                            <p>${error.message}</p>
                            <p>Please try again later.</p>
                        </div>
                    `;
                }
            }
            
            // Event listeners for buttons
            fetchButton.addEventListener('click', fetchUserData);
            refreshButton.addEventListener('click', fetchUserData);
            
            // Fetch data automatically after 1 second to demonstrate
            setTimeout(fetchUserData, 1000);
        });