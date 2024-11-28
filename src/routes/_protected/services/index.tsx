import {columns, Service} from '@/components/services/columns';
import {DataTable} from '@/components/services/data-table';
import {Button} from '@/components/ui/button';
import * as SheetPrimitive from '@radix-ui/react-dialog';
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
import {Cross2Icon} from '@radix-ui/react-icons';

import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CurrencyInput from '@/components/ui/currency-input';
import http from '@/lib/http';

import {useToast} from '@/hooks/use-toast';
import {useState} from 'react';

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters.',
    })
    .max(50, {
      message: 'Title must be at most 50 characters.',
    }),
  description: z
    .string()
    .max(200, {
      message: 'Description must be at most 200 characters.',
    })
    .optional(),
  price: z.string().min(3, {message: 'Price must be at least 3 characters.'}),
  status: z
    .string()
    .refine(
      value => ['draft', 'live', 'suspended'].includes(value),
      'Status must be draft, live, or suspended.'
    ),
});

export const Route = createFileRoute('/_protected/services/')({
  component: Services,
  loader: async () => {
    const {data} = await http.get('/services');

    return {
      services: data.services,
    } as {services: Service[]};
  },
  shouldReload: true,
});

function Services() {
  const {services} = Route.useLoaderData();
  const {toast} = useToast();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      status: 'draft',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    http
      .post('/services', values)
      .then(() => {
        router.invalidate();
        setOpen(false);

        toast({
          variant: 'default',
          title: 'Service created',
          description: 'The service has been successfully created.',
        });
      })
      .catch(e => {
        if (e.response?.status === 422) {
          const errors = e.response.data.errors;
          errors.forEach(
            (error: {
              message: string;
              rule: string;
              field: 'title' | 'description' | 'price' | 'status';
            }) => {
              form.setError(error.field, {message: error.message});
            }
          );
        } else {
          toast({
            variant: 'destructive',
            title: 'An error occurred',
            description: 'An error occurred while processing your request',
          });
        }
      });
  }

  return (
    <>
      <div className="flex items-center justify-between border-b border-greyscale-100 p-4">
        <h1 className="text-2xl font-semibold text-greyscale-900">Services</h1>

        <div className="flex gap-x-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button className="text-greyscale-900">
                <div className="flex items-center gap-x-2">
                  <PlusIcon className="size-4" />
                  <span>Create Service</span>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <SheetHeader className="-ml-6 -mr-6 flex items-center justify-between border-b border-greyscale-100 px-6 pb-[23px]">
                <SheetTitle className="flex-1">New Service</SheetTitle>
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
                    <h3 className="font-semibold text-greyscale-900">Service details</h3>

                    <div className="mt-4 flex flex-col gap-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="price"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <CurrencyInput placeholder="0.00" {...field} />
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
                                  <SelectItem value="draft">Draft</SelectItem>
                                  <SelectItem value="live">Live</SelectItem>
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
        <DataTable columns={columns} data={services} />
      </div>
    </>
  );
}
