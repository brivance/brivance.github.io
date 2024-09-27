async function fetchPrediction(sequence) {
    const response = await fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sequence })
    });
    const result = await response.json();
    console.log(result);
}

// Example usage
fetchPrediction(["C", "G", "Am"]);