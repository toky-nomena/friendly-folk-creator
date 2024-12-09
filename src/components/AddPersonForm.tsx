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
import { Person } from "@/lib/types";
import { personSchema } from "@/lib/schema";
import { safeParse } from "valibot";

interface AddPersonFormProps {
  onSubmit: (data: Omit<Person, "id" | "createdAt">) => void;
}

export const AddPersonForm = ({ onSubmit }: AddPersonFormProps) => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: undefined as unknown as Date,
      email: "",
      driverLicense: "",
    },
  });

  const generateFakeData = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const dateOfBirth = faker.date.birthdate();

    form.setValue("firstName", firstName);
    form.setValue("lastName", lastName);
    form.setValue("dateOfBirth", dateOfBirth);
  };

  const handleSubmit = (data: any) => {
    const result = safeParse(personSchema, data);
    
    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: result.issues[0].message,
      });
      return;
    }

    onSubmit(data);
    form.reset();
    toast({
      title: "Success",
      description: "Person added successfully",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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