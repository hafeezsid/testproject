class SubjectsModel {
    constructor() {
        this.majors = []; // Store majors data
        this.uniqueSubjects = []; // Store unique subjects
        this.subjectDomains = {
            "STEM": [],
            "Health Sciences": [],
            "Arts and Humanities": [],
            "Social Sciences": [],
            "Business and Management": [],
            "Communication and Media Studies": [],
            "Engineering and Technology": [],
            "Others": []
        };
    }

    // Load majors and subjects from an external source (e.g., JSON file)
    loadMajorsAndSubjects() {
        return fetch('../testproject/Models/majors.json')
            .then(response => response.json())
            .then(data => {
                this.majors = data;
                this.extractUniqueSubjects();
            })
            .catch(error => console.error('Error loading the majors data:', error));
    }

    // Extract unique subjects and categorize them
    extractUniqueSubjects() {
        const subjectsSet = new Set();
        this.majors.forEach(major => {
            major['Required Subjects for Admission'].split(', ').forEach(subject => {
                subjectsSet.add(subject.trim());
            });
        });
        this.uniqueSubjects = Array.from(subjectsSet).sort();
        this.categorizeSubjects();
    }

    // Categorize subjects into domains
    categorizeSubjects() {
        this.uniqueSubjects.forEach(subject => {
                   if (["Mathematics", "Algebra", "Calculus", "Statistics", "Biology", "Chemistry", "Physics", "Environmental Science", "Computer Science", "Computer Programming", "Information Technology", "Artificial Intelligence", "Cybersecurity", "Engineering", "Architecture"].includes(subject)) {
            this.subjectDomains["STEM"].push(subject);
        } else if (["Nursing", "Anatomy", "Physiology", "Nutrition", "Public Health"].includes(subject)) {
            this.subjectDomains["Health Sciences"].push(subject);
        } else if (["Art", "Art History", "Studio Art", "Fine Arts", "Fashion Design", "Film Studies", "Language", "English Literature", "Philosophy", "Theology", "History", "Humanities"].includes(subject)) {
            this.subjectDomains["Arts and Humanities"].push(subject);
        } else if (["Psychology", "Sociology", "Political Science", "Anthropology", "Economics", "International Relations", "Law", "Criminal Justice", "Human Resources Management", "Public Relations", "Social Studies"].includes(subject)) {
            this.subjectDomains["Social Sciences"].push(subject);
        } else if (["Business Studies", "Finance", "Marketing", "Management", "Human Resources Management", "Public Relations", "Islamic Finance", "Banking Principles"].includes(subject)) {
            this.subjectDomains["Business and Management"].push(subject);
        } else if (["Communication", "Communications", "Journalism", "Media Studies", "Media Production", "Graphic Design"].includes(subject)) {
            this.subjectDomains["Communication and Media Studies"].push(subject);
        } else if (["Engineering", "Computer Engineering", "Architecture"].includes(subject)) {
            this.subjectDomains["Engineering and Technology"].push(subject);
        } else {
            this.subjectDomains["Others"].push(subject);
        }
        });
    }

    getSubjectDomains() {
        return this.subjectDomains;
    }
}
