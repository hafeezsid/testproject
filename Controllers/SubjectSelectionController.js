document.addEventListener('DOMContentLoaded', () => {
    const model = new SubjectsModel();
    model.loadMajorsAndSubjects().then(() => {
        displaySubjectBubbles(model.getSubjectDomains());
    });

    document.getElementById('nextButton').addEventListener('click', function() {
        const selectedSubjects = getSelectedSubjects();
        localStorage.setItem('selectedSubjects', JSON.stringify(selectedSubjects));
        window.location.href = 'qualifications_entry.html';
    });
});

function displaySubjectBubbles(subjectDomains) {
    const container = document.getElementById('subjectOptions');
        Object.keys(subjectDomains).forEach(domain => {
        if (subjectDomains[domain].length > 0) {
            let domainHeader = document.createElement('h3');
            domainHeader.textContent = domain;
            container.appendChild(domainHeader);

            let domainContainer = document.createElement('div');
            domainContainer.className = "domain-container";

            subjectDomains[domain].forEach(subject => {
                const bubble = document.createElement('button');
                bubble.className = 'btn btn-secondary subject-option';
                bubble.type = 'button';

                // Create the checkmark icon and hide it by default
                const checkIcon = document.createElement('i');
                checkIcon.className = 'fas fa-check';
                checkIcon.style.visibility = 'hidden';
                bubble.appendChild(checkIcon);

                // Add text node for the subject
                const textNode = document.createTextNode(` ${subject}`);
                bubble.appendChild(textNode);

                bubble.onclick = function() {
                    bubble.classList.toggle('active');
                    // Toggle visibility of the check icon
                    checkIcon.style.visibility = bubble.classList.contains('active') ? 'visible' : 'hidden';
                };

                domainContainer.appendChild(bubble);
            });

            container.appendChild(domainContainer);
        }
    });
}

function getSelectedSubjects() {
    const selectedSubjects = [];
    document.querySelectorAll('.subject-option.active').forEach(subject => {
        selectedSubjects.push(subject.textContent.trim());
    });
    return selectedSubjects;
}
