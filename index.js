document.addEventListener('DOMContentLoaded', function() {
    fetchParties();

    document.getElementById('partyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addParty();
    });
});

async function fetchParties() {
    try {
        const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events');
        const data = await response.json();
        if (data.success) {
            displayParties(data.data);
        }
    } catch (error) {
        console.error('Error fetching parties:', error);
    }
}

function displayParties(parties) {
    const partyList = document.getElementById('partyList');
    partyList.innerHTML = '';
    parties.forEach(party => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${party.name} - ${new Date(party.date).toLocaleDateString()} at ${party.location}
            <button onclick="deleteParty(${party.id})">Delete</button>
        `;
        partyList.appendChild(li);
    });
}

async function deleteParty(id) {
    try {
        const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events/${id}`, {
            method: 'DELETE'
        });
        if (response.status === 204) {
            fetchParties(); // Refresh the list
        }
    } catch (error) {
        console.error('Error deleting party:', error);
    }
}

async function addParty() {
    const partyDetails = {
        name: document.getElementById('name').value,
        date: document.getElementById('date').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value
    };

    try {
        const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(partyDetails)
        });
        const data = await response.json();
        if (data.success) {
            fetchParties(); // Refresh the list
            // Optionally, clear form fields here
        }
    } catch (error) {
        console.error('Error adding party:', error);
    }
}