// MajorsModel.js
class MajorsModel {
    constructor() {
        this.possibleMajors = [];
    }

    fetchPossibleMajors(subjects, grade) {
        const apiEndpoint = 'http://localhost:5000/majors/mvc/';
        const requestBody = { subjects, grade };

        return fetch(apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        })
        .then(response => response.json())
        .then(data => {
            this.possibleMajors = data.majors || [];
            return this.possibleMajors;
        })
        .catch(error => {
            console.error('Error fetching possible majors:', error);
            return [];
        });
    }

    getPossibleMajors() {
        return this.possibleMajors;
    }
}
