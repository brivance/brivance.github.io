function insertText() {
    // Get the value from the input field
    const inputText = document.getElementById('inputText').value;

    // Parse the text into an array, splitting by commas and trimming whitespace
    const chordsArray = inputText.split(',').map(chord => chord.trim());

    // Display the array as a horizontal row
    displayChords(chordsArray);
}

function displayChords(chordsArray) {
    // Get the output div
    const outputDiv = document.getElementById('output');

    // Clear any existing content
    outputDiv.innerHTML = '';

    // Create a container <div> to hold the chords
    const containerDiv = document.createElement('div');
    containerDiv.className = 'chord-container'; // Add a class for styling if needed

    // Join the chords into a single string separated by commas and spaces
    const chordsText = chordsArray.join(', ');

    // Create a <p> element to hold the joined text
    const p = document.createElement('p');
    p.textContent = chordsText;

    // Append the <p> to the container <div>
    containerDiv.appendChild(p);

    // Append the container <div> to the output div
    outputDiv.appendChild(containerDiv);
}
