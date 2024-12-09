import { Person } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface PersonTableProps {
  people: Person[];
}

export const PersonTable = ({ people }: PersonTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Driver License</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person.id}>
              <TableCell>{person.firstName}</TableCell>
              <TableCell>{person.lastName}</TableCell>
              <TableCell>{format(person.dateOfBirth, 'PP')}</TableCell>
              <TableCell>{person.email || '-'}</TableCell>
              <TableCell>{person.driverLicense || '-'}</TableCell>
              <TableCell>{format(person.createdAt, 'PP')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};