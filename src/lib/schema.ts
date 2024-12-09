import { email, maxLength, minLength, object, optional, string, toDate } from 'valibot';

export const personSchema = object({
  firstName: string([
    minLength(2, 'First name must be at least 2 characters'),
    maxLength(50, 'First name must be less than 50 characters'),
  ]),
  lastName: string([
    minLength(2, 'Last name must be at least 2 characters'),
    maxLength(50, 'Last name must be less than 50 characters'),
  ]),
  dateOfBirth: toDate(),
  email: optional(string([email('Please enter a valid email address')])),
  driverLicense: optional(string([
    minLength(5, 'Driver license must be at least 5 characters'),
    maxLength(20, 'Driver license must be less than 20 characters'),
  ])),
});