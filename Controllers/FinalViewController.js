// FinalViewController.js
document.addEventListener('DOMContentLoaded', () => {
    const majorsModel = new MajorsModel();
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const selectedSubjects = JSON.parse(localStorage.getItem('selectedSubjects'));
    const userGrade = parseInt(localStorage.getItem('overallGrade'));

    displayRecap(userDetails, selectedSubjects, userGrade);

    majorsModel.fetchPossibleMajors(selectedSubjects, userGrade).then(() => {
        displayPossibleMajors(majorsModel.getPossibleMajors());
    });

    setupEmailSending(userDetails, selectedSubjects, userGrade);
});

function displayRecap(userDetails, selectedSubjects, userGrade) {
    const recapSection = document.getElementById('recapSection');
    if (userDetails) {
        recapSection.innerHTML = `
            <p><strong>Name:</strong> ${userDetails.name}</p>
            <p><strong>Age:</strong> ${userDetails.age}</p>
            <p><strong>Degree:</strong> ${userDetails.degree}</p>
            <p><strong>Grade:</strong> ${userGrade}%</p>
            <p><strong>Selected Subjects:</strong> ${selectedSubjects ? selectedSubjects.join(', ') : 'None'}</p>
        `;
    }
}

function displayPossibleMajors(majors) {
    const majorsListDiv = document.getElementById('possibleMajors');
    majorsListDiv.innerHTML = '';

    if (majors && majors.length > 0) {
        majors.forEach(major => {
            const item = document.createElement('li');
            item.className = 'list-group-item'; // Add the class here
            item.textContent = major.Major;
            // Optionally, you can add an icon to each item as well
            const icon = document.createElement('i');
            icon.className = 'fas fa-book'; // Example: using a book icon
            icon.style.marginRight = '10px';
            item.prepend(icon); // Add the icon before the text

            majorsListDiv.appendChild(item);
        });
		localStorage.setItem('possibleMajors', JSON.stringify(majors));
    } else {
        const noMajorsItem = document.createElement('li');
        noMajorsItem.className = 'list-group-item'; // Add the class here
        noMajorsItem.textContent = 'No majors found matching the criteria.';
        majorsListDiv.appendChild(noMajorsItem);
    }
}



function setupEmailSending(userDetails, selectedSubjects, userGrade) {
    const sendButton = document.getElementById('sendButton');
    const emailInput = document.getElementById('emailInput');
    const feedbackDiv = document.getElementById('feedback');

    sendButton.addEventListener('click', () => {
        const email = emailInput.value;
        if (validateEmail(email)) {
            sendResultsEmail(userDetails, selectedSubjects, userGrade, email);
        } else {
            feedbackDiv.textContent = 'Please enter a valid email address.';
        }
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sendResultsEmail(userDetails, selectedSubjects, userGrade, email) {
    const feedbackDiv = document.getElementById('feedback');
	const possibleMajors = JSON.parse(localStorage.getItem('possibleMajors')) || [];
	console.log(possibleMajors);

    fetch('http://127.0.0.1:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: userDetails.name,
            age: userDetails.age,
            degree: userDetails.degree,
            grade: userGrade,
            subjects: selectedSubjects,
            receiver: email,
			majors: possibleMajors// Ensure that this matches the expected structure on the server-side
        })
    })
    .then(response => {
        if (response.ok) {
            feedbackDiv.textContent = 'Email sent successfully!';
            feedbackDiv.style.color = 'green';
        } else {
            response.json().then(data => {
                feedbackDiv.textContent = data.error || 'Failed to send email. Please try again.';
                feedbackDiv.style.color = 'red';
            });
        }
    })
    .catch(error => {
        console.error('Error sending email:', error);
        feedbackDiv.textContent = 'Error sending email. Please check your connection and try again.';
        feedbackDiv.style.color = 'red';
    });
}

