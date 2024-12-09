import { useState } from "react";
import { AddPersonForm } from "@/components/AddPersonForm";
import { PersonTable } from "@/components/PersonTable";
import { Person } from "@/lib/types";

const Index = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const handleAddPerson = (personData: Omit<Person, "id" | "createdAt">) => {
    const newPerson: Person = {
      ...personData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setPeople((prev) => [...prev, newPerson]);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Person Management</h1>
        <p className="text-muted-foreground">
          Add and manage people in the system
        </p>
      </div>

      <div className="p-6 border rounded-lg bg-card">
        <h2 className="text-xl font-semibold mb-4">Add New Person</h2>
        <AddPersonForm onSubmit={handleAddPerson} />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">People List</h2>
        <PersonTable people={people} />
      </div>
    </div>
  );
};

export default Index;