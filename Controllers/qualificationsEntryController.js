document.addEventListener('DOMContentLoaded', () => {
    const model = new QualificationsModel();
    
    document.getElementById('nextButton').addEventListener('click', function() {
        const overallGrade = document.getElementById('overallGrade').value;
        
        if (overallGrade === '' || overallGrade < 0 || overallGrade > 100) {
            alert('Please enter a valid grade between 0 and 100.');
            return false;
        }

        model.setOverallGrade(overallGrade);
        window.location.href = 'final.html'; // Navigate to the final page
    });
});
