import { email, maxLength, minLength, object, optional, string, date } from 'valibot';

export const personSchema = object({
  firstName: string('First name is required', [
    minLength(2, 'First name must be at least 2 characters'),
    maxLength(50, 'First name must be less than 50 characters')
  ]),
  lastName: string('Last name is required', [
    minLength(2, 'Last name must be at least 2 characters'),
    maxLength(50, 'Last name must be less than 50 characters')
  ]),
  dateOfBirth: date('Date of birth is required'),
  email: optional(string([
    email('Please enter a valid email address')
  ])),
  driverLicense: optional(string([
    minLength(5, 'Driver license must be at least 5 characters'),
    maxLength(20, 'Driver license must be less than 20 characters')
  ])),
});