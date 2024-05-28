document.getElementById('airdropForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const walletAddress = document.getElementById('walletAddress').value;
    const responseMessage = document.getElementById('responseMessage');
    
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address: walletAddress })
        });
        
        const data = await response.json();
        if (data.success) {
            responseMessage.textContent = 'Registered successfully!';
            responseMessage.style.color = '#00ff00';
        } else {
            responseMessage.textContent = data.message;
            responseMessage.style.color = '#ff0000';
        }
    } catch (error) {
        responseMessage.textContent = 'An error occurred. Please try again.';
        responseMessage.style.color = '#ff0000';
    }
});
