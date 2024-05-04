document.addEventListener('DOMContentLoaded', () => {
    const userModel = new UserModel(); // Instantiate the user model
    const form = document.getElementById('personalDetailsForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const userName = document.getElementById('userName').value;
        const userAge = document.getElementById('userAge').value;
        let selectedDegree;
        
        document.querySelectorAll('.degree-option input').forEach((input) => {
            if (input.checked) {
                selectedDegree = input.value;
            }
        });

        if (!selectedDegree) {
            alert('Please select a degree to continue.');
            return;
        }

        userModel.setUserDetails({
            name: userName,
            age: userAge,
            degree: selectedDegree
        });

        window.location.href = 'subject_selection.html';
    });
});
