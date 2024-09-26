document.getElementById('submit').addEventListener('click', () => {
    const query = document.getElementById('query').value;

    // Clear previous result
    document.getElementById('result').innerHTML = '';

    // Send request to backend
    fetch('http://localhost:3000/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    })
    .then(response => {
        if (!response.ok) {
            // If response is not ok, we parse the JSON error message from the response
            return response.json().then(errData => {
                throw new Error(errData.error); // Throw error to be caught in catch block
            });
        }
        return response.json();
    })
    .then(data => {
        // Display the result
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <h2>State: ${data.state}</h2>
            <p>Capital: ${data.capital}</p>
            <p>Languages: ${data.languages.join(', ')}</p>
            <p>Population: ${data.population}</p>
            <p>Area: ${data.area} km²</p>
            <p>Facts: ${data.facts.join(', ')}</p>
        `;
    })
    .catch(error => {
        // Handle errors and display the message returned from the backend
        document.getElementById("result").innerHTML = `
            <p><strong>Error:</strong> ${error.message}</p>
        `;
    });
});
