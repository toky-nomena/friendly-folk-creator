import { useState } from "react";
import { AddPersonForm } from "@/components/AddPersonForm";
import { PersonTable } from "@/components/PersonTable";
import { Person } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Person Management</h1>
          <p className="text-muted-foreground">
            Add and manage people in the system
          </p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Add Person</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New Person</SheetTitle>
            </SheetHeader>
            <div className="mt-8">
              <AddPersonForm onSubmit={handleAddPerson} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">People List</h2>
        <PersonTable people={people} />
      </div>
    </div>
  );
};

export default Index;