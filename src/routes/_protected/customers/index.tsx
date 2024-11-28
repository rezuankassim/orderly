import {Button} from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {createFileRoute, useRouter} from '@tanstack/react-router';
import {PlusIcon} from 'lucide-react';
import {FormEvent, useState} from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import {Cross2Icon} from '@radix-ui/react-icons';

import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Vehicles} from '@/components/vehicles/columns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import http from '@/lib/http';
import {useToast} from '@/hooks/use-toast';
import {columns, Customer} from '@/components/customers/columns';
import {DataTable} from '@/components/customers/data-table';

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters.',
    })
    .max(50, {
      message: 'Name must be at most 50 characters.',
    }),
  status: z
    .string()
    .refine(
      value => ['active', 'suspended'].includes(value),
      'Status must be active, or suspended.'
    ),
});

const formVehicleSchema = z.object({
  plate: z
    .string()
    .min(2, {
      message: 'Plate must be at least 2 characters.',
    })
    .max(10, {
      message: 'Plate must be at most 10 characters.',
    }),
  description: z.string().max(50, {
    message: 'Description must be at most 50 characters.',
  }),
});

export const Route = createFileRoute('/_protected/customers/')({
  component: Customers,
  loader: async () => {
    const {data} = await http.get('/customers');

    return {
      customers: data.customers,
    } as {customers: Customer[]};
  },
  shouldReload: true,
});

function Customers() {
  const {customers} = Route.useLoaderData();
  const [open, setOpen] = useState(false);
  const {toast} = useToast();
  const [openVehicle, setOpenVehicle] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      status: 'active',
    },
  });

  const formVehicle = useForm<z.infer<typeof formVehicleSchema>>({
    resolver: zodResolver(formVehicleSchema),
    defaultValues: {
      plate: '',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const val = {
      ...values,
      vehicles,
    };

    http
      .post('/customers', val)
      .then(() => {
        router.invalidate();
        setOpen(false);
        form.reset();

        toast({
          variant: 'default',
          title: 'Customer created',
          description: 'The customer has been successfully created.',
        });
      })
      .catch(e => {
        if (e.response?.status === 422) {
          const errors = e.response.data.errors;
          errors.forEach((error: {message: string; rule: string; field: 'name' | 'status'}) => {
            form.setError(error.field, {message: error.message});
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'An error occurred',
            description: 'An error occurred while processing your request',
          });
        }
      });
  }

  async function onVechilePresubmit(event: FormEvent<HTMLFormElement>) {
    // this part is for stopping parent forms to trigger their submit
    if (event) {
      // sometimes not true, e.g. React Native
      if (typeof event.preventDefault === 'function') {
        event.preventDefault();
      }
      if (typeof event.stopPropagation === 'function') {
        // prevent any outer forms from receiving the event too
        event.stopPropagation();
      }
    }

    return formVehicle.handleSubmit(onVehicleSubmit)(event);
  }

  function onVehicleSubmit(values: z.infer<typeof formVehicleSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    onAddVehicle(values);
    formVehicle.reset();
    setOpenVehicle(false);
  }

  function onAddVehicle({plate, description}: Vehicles) {
    setVehicles([...vehicles, {plate, description}]);
  }

  return (
    <>
      <div className="flex items-center justify-between border-b border-greyscale-100 p-4 text-greyscale-900">
        <h1 className="text-2xl font-semibold text-greyscale-900">Customers</h1>

        <div className="flex gap-x-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button className="text-greyscale-900">
                <div className="flex items-center gap-x-2">
                  <PlusIcon className="size-4" />
                  <span>Create Customer</span>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <SheetHeader className="-ml-6 -mr-6 flex items-center justify-between border-b border-greyscale-100 px-6 pb-[23px]">
                <SheetTitle className="flex-1">New Customer</SheetTitle>
                <SheetPrimitive.Close asChild>
                  <Button variant="icon" size="icon">
                    <Cross2Icon className="size-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </SheetPrimitive.Close>
              </SheetHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-2 flex flex-1 flex-col gap-y-4"
                >
                  <div className="rounded-xl border border-greyscale-100 p-4">
                    <h3 className="font-semibold text-greyscale-900">Customer details</h3>

                    <div className="mt-4 flex flex-col gap-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="status"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                                name={field.name}
                                disabled={field.disabled}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="suspended">Suspended</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-greyscale-100 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-greyscale-900">Customer vehicles</h3>

                      <Dialog open={openVehicle} onOpenChange={setOpenVehicle}>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <div className="flex items-center gap-x-2">
                              <PlusIcon className="size-4" />
                              <span>Add</span>
                            </div>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Add Vehicle</DialogTitle>
                            <DialogDescription>Add a vehicle to the customer.</DialogDescription>
                          </DialogHeader>

                          <Form {...formVehicle}>
                            <form onSubmit={onVechilePresubmit} className="flex flex-col gap-y-8">
                              <div className="flex flex-col gap-y-4">
                                <FormField
                                  control={formVehicle.control}
                                  name="plate"
                                  render={({field}) => (
                                    <FormItem>
                                      <FormLabel>Plate</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={formVehicle.control}
                                  name="description"
                                  render={({field}) => (
                                    <FormItem>
                                      <FormLabel>Description</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <DialogFooter>
                                <Button type="submit" className="w-full">
                                  Add
                                </Button>
                              </DialogFooter>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="mt-4 flex max-h-64 flex-col gap-y-4 overflow-y-auto">
                      {vehicles.map(vehicle => (
                        <div
                          key={`${vehicle.plate}-${vehicle.description}`}
                          className="rounded-xl border border-greyscale-100 px-4 py-3"
                        >
                          <p className="font-semibold">{vehicle.plate}</p>
                          <p className="mt-1 text-sm font-medium text-greyscale-400">
                            {vehicle.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <SheetFooter className="mt-auto">
                    <Button type="submit" className="mt-auto w-full">
                      Create
                    </Button>
                  </SheetFooter>
                </form>
              </Form>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div>
        <DataTable columns={columns} data={customers} />
      </div>
    </>
  );
}
