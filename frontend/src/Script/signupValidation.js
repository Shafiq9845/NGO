function signupValidation(values) {
    let error = {};

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const number_pattern = /^\d{10}$/;


    if (values.name === "") {
        error.name = "Name should not be empty";
    } else {
        error.name = "";
    }
    if (values.contactPersonPhone === "") {
        error.contactPersonPhone = "Contact Person Phone should not be empty";
    } else {
        error.contactPersonPhone = "";
    }
    if (values.contactPerson === "") {
        error.contactPerson = "Contact person should not be empty";
    } else {
        error.contactPerson = "";
    }
    if (values.ngoRegistrationNumber === "") {
        error.ngoRegistrationNumber = "NGO registration number should not be empty";
    } else {
        error.ngoRegistrationNumber = "";
    }
    if (values.ngoType === "") {
        error.ngoType = "NGO type should not be empty";
    } else {
        error.ngoType = "";
    }
    if (values.ngoAddress === "") {
        error.ngoAddress = "NGO address should not be empty";
    } else {
        error.ngoAddress = "";
    }
    if (values.ngoName === "") {
        error.ngoName = "NGO name should not be empty";
    } else {
        error.ngoName = "";
    }


    if (values.email === "") {
        error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Enter valid email.";
    } else {
        error.email = "";
    }

    if (values.number === "") {
        error.number = "Phone number should not be empty";
    } else if (!number_pattern.test(values.number)) {
        error.number = "Enter 10 digit phone number";
    } else {
        error.number = "";
    }

    if (values.password === "") {
        error.password = "Password should not be empty.";
    } else {
        error.password = "";
    }

    return error;
}

export default signupValidation;
