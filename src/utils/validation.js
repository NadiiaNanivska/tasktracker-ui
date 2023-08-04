import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router-dom";

export function createValidator(pattern, message) {
    return {
        pattern,
        message,
    };
}

const firstNamePattern = /^[A-Z][a-zA-Z]*$/;
const firstNameMessage = 'Please enter a valid first name';
export const firstNameValidator = createValidator(firstNamePattern, firstNameMessage);

const lastNamePattern = /^[A-Z][a-zA-Z]*$/;
const lastNameMessage = 'Please enter a valid last name';
export const lastNameValidator = createValidator(lastNamePattern, lastNameMessage);

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailMessage = 'Please enter a valid email';
export const emailValidator = createValidator(emailPattern, emailMessage);

export function passwordValidator(rule, value, callback) {
    const errors = [];

    if (value.length < 8) {
        errors.push('Password should be at least 8 characters long');
    }

    if (!/[A-Z]/.test(value)) {
        errors.push('Password should contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(value)) {
        errors.push('Password should contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(value)) {
        errors.push('Password should contain at least one digit');
    }

    if (errors.length > 0) {
        callback(errors);
    } else {
        callback();
    }
}

const phonePattern = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
const phoneMessage = 'Please enter a valid phone number in the format +XXX (XXX) XXX-XXXX';
export const phoneValidator = createValidator(phonePattern, phoneMessage);

const cityPattern = /^[A-Z][a-zA-Z]*$/;
const cityMessage = 'Please enter a valid city';
export const cityValidator = createValidator(cityPattern, cityMessage);

const countryPattern = /^[A-Z][a-zA-Z]*$/;
const countryMessage = 'Please enter a valid country';
export const countryValidator = createValidator(countryPattern, countryMessage);

const companyPattern = /^[A-Z][a-zA-Z]*$/;
const companyMessage = 'Please enter a valid company';
export const companyValidator = createValidator(companyPattern, companyMessage);

const addressPattern = /^[A-Z][a-zA-Z]*$/;
const addressMessage = 'Please enter a valid address';
export const addressValidator = createValidator(addressPattern, addressMessage);

const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp > currentTime;
    } catch (error) {
        return false;
    }
};

export const checkTokenValidity = (storedToken, history) => {
    if (!isTokenValid(storedToken)) {
        localStorage.removeItem('token');
        history("/login");
    }
};