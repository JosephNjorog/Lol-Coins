document.getElementById('airdropForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const walletAddress = document.getElementById('walletAddress').value;
    const responseMessage = document.getElementById('responseMessage');
    
    try {
        const response = await fetch('http://localhost:3000/register', { // Updated URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address: walletAddress })
        });
        
        const data = await response.json();
        console.log('Server response:', data); // Log the server response for debugging
        if (data.success) {
            responseMessage.textContent = 'Registered successfully!';
            responseMessage.style.color = '#00ff00';
        } else {
            responseMessage.textContent = data.message || 'Registration failed. Please try again.';
            responseMessage.style.color = '#ff0000';
        }
    } catch (error) {
        console.error('Error occurred:', error); // Log the error for debugging
        responseMessage.textContent = 'An error occurred. Please try again.';
        responseMessage.style.color = '#ff0000';
    }
});
