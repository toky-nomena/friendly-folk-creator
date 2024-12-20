import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Person, personSchema } from "@/lib/schema";

interface AddPersonFormProps {
  onSubmit: (data: Omit<Person, "id" | "createdAt">) => void;
  onOpenChange?: () => void;
}

export const AddPersonForm = ({
  onSubmit,
  onOpenChange,
}: AddPersonFormProps) => {
  const { toast } = useToast();
  const form = useForm<Person>({
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: faker.date.birthdate(),
    },
    resolver: valibotResolver(personSchema),
  });

  const generateFakeData = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const dateOfBirth = faker.date.birthdate();

    form.setValue("firstName", firstName);
    form.setValue("lastName", lastName);
    form.setValue("dateOfBirth", dateOfBirth);
  };

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
    form.reset();
    toast({
      title: "Success",
      description: "Person added successfully",
    });
    onOpenChange?.();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth *</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="driverLicense"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Driver License</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">Add Person</Button>
          <Button type="button" variant="outline" onClick={generateFakeData}>
            Generate Random Data
          </Button>
        </div>
      </form>
    </Form>
  );
};
