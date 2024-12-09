export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email?: string;
  driverLicense?: string;
  createdAt: Date;
}