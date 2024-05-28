document.getElementById('airdropForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const walletAddress = document.getElementById('walletAddress').value;
    const responseMessage = document.getElementById('responseMessage');
    
    try {
        // Perform input validation (e.g., check for empty input)

        // Send a POST request to register the wallet address
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address: walletAddress })
        });
        
        const data = await response.json();
        if (data.success) {
            responseMessage.textContent = 'Registered successfully!';
            responseMessage.style.color = 'green';
        } else {
            responseMessage.textContent = data.message;
            responseMessage.style.color = 'red';
        }
    } catch (error) {
        responseMessage.textContent = 'An error occurred. Please try again.';
        responseMessage.style.color = 'red';
    }
});
