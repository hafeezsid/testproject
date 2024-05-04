class QualificationsModel {
    constructor() {
        this.overallGrade = this.getOverallGrade();
    }

    setOverallGrade(grade) {
        this.overallGrade = grade;
        localStorage.setItem('overallGrade', grade);
    }

    getOverallGrade() {
        return localStorage.getItem('overallGrade') || null;
    }
}
