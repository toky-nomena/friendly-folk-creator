import { email, maxLength, minLength, object, optional, string, date, pipe } from 'valibot';

export const personSchema = object({
  firstName: string([
    pipe(
      minLength(2, 'First name must be at least 2 characters'),
      maxLength(50, 'First name must be less than 50 characters')
    )
  ]),
  lastName: string([
    pipe(
      minLength(2, 'Last name must be at least 2 characters'),
      maxLength(50, 'Last name must be less than 50 characters')
    )
  ]),
  dateOfBirth: date('Date of birth is required'),
  email: optional(string([
    pipe(
      email('Please enter a valid email address')
    )
  ])),
  driverLicense: optional(string([
    pipe(
      minLength(5, 'Driver license must be at least 5 characters'),
      maxLength(20, 'Driver license must be less than 20 characters')
    )
  ])),
});