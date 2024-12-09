import {
  email,
  maxLength,
  minLength,
  object,
  optional,
  string,
  date,
  pipe,
  InferInput,
} from "valibot";

export const personSchema = object({
  firstName: pipe(
    string(),
    minLength(2, "First name must be at least 5 characters"),
    maxLength(20, "First name must be less than 20 characters")
  ),
  lastName: pipe(
    string(),
    minLength(2, "Last name must be at least 5 characters"),
    maxLength(20, "Last name must be less than 20 characters")
  ),
  dateOfBirth: optional(date("Date of birth must be a valid date")),
  email: optional(pipe(string(), email("Please enter a valid email address"))),
  driverLicense: optional(
    pipe(
      string(),
      minLength(5, "Driver license must be at least 5 characters"),
      maxLength(20, "Driver license must be less than 20 characters")
    )
  ),
  policyNumber: optional(
    pipe(
      string(),
      minLength(5, "Policy number must be at least 5 characters"),
      maxLength(20, "Policy number must be less than 20 characters")
    )
  ),
});

export type Person = InferInput<typeof personSchema>;
