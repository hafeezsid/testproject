class UserModel {
    constructor() {
        this.userDetails = JSON.parse(localStorage.getItem('userDetails')) || {};
    }

    setUserDetails(details) {
        this.userDetails = details;
        localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
    }

    getUserDetails() {
        return this.userDetails;
    }

    updateUserDetail(key, value) {
        this.userDetails[key] = value;
        localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
    }

    clearUserDetails() {
        this.userDetails = {};
        localStorage.removeItem('userDetails');
    }
}
