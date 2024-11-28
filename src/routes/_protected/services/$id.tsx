// import {Badge} from '@/components/ui/badge';
// import CurrencyInput from '@/components/ui/currency-input';
// import {Input} from '@/components/ui/input';
// import {Label} from '@/components/ui/label';
// import {Textarea} from '@/components/ui/textarea';
// import http from '@/lib/http';
// import {cn} from '@/lib/utils';
// import * as SheetPrimitive from '@radix-ui/react-dialog';
import {
  createFileRoute,
  //Link,
  //useRouter
} from '@tanstack/react-router';

// import {z} from 'zod';
// import {zodResolver} from '@hookform/resolvers/zod';
// import {useForm} from 'react-hook-form';

// import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// import {useToast} from '@/hooks/use-toast';
// import {useState} from 'react';
// import {
//   Sheet,
//   SheetContent,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from '@/components/ui/sheet';
// import {Button} from '@/components/ui/button';
// import {Cross2Icon} from '@radix-ui/react-icons';
// import {ArrowLeftIcon, PencilIcon, Trash2Icon} from 'lucide-react';

// import {Service as ServiceType} from '@/components/services/columns';
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';

// const formSchema = z.object({
//   title: z
//     .string()
//     .min(3, {
//       message: 'Title must be at least 3 characters.',
//     })
//     .max(50, {
//       message: 'Title must be at most 50 characters.',
//     }),
//   description: z
//     .string()
//     .max(200, {
//       message: 'Description must be at most 200 characters.',
//     })
//     .optional(),
//   price: z.string().min(3, {message: 'Price must be at least 3 characters.'}),
//   status: z
//     .string()
//     .refine(
//       value => ['draft', 'live', 'suspended'].includes(value),
//       'Status must be draft, live, or suspended.'
//     ),
// });

export const Route = createFileRoute('/_protected/services/$id')({
  component: Service,
  // loader: async ({params}) => {
  //   const {data} = await http.get(`/services/${params.id}`);

  //   return {
  //     service: data.service,
  //   };
  // },
});

function Service() {
  return <div>empty</div>;
  // const {service} = Route.useLoaderData<{service: ServiceType}>();
  // const {toast} = useToast();
  // const [open, setOpen] = useState(false);
  // const router = useRouter();

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     title: service.title,
  //     description: service.description ?? '',
  //     price: service.price?.toString() ?? '',
  //     status: service.status,
  //   },
  // });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   http
  //     .put(`/services/${service.id}`, values)
  //     .then(() => {
  //       router.invalidate();
  //       setOpen(false);

  //       toast({
  //         variant: 'default',
  //         title: 'Service updated',
  //         description: 'The service has been successfully updated.',
  //       });
  //     })
  //     .catch(e => {
  //       if (e.response?.status === 422) {
  //         const errors = e.response.data.errors;
  //         errors.forEach(
  //           (error: {
  //             message: string;
  //             rule: string;
  //             field: 'title' | 'description' | 'price' | 'status';
  //           }) => {
  //             form.setError(error.field, {message: error.message});
  //           }
  //         );
  //       } else {
  //         toast({
  //           variant: 'destructive',
  //           title: 'An error occurred',
  //           description: 'An error occurred while processing your request',
  //         });
  //       }
  //     });
  // }

  // function onDelete() {
  //   http
  //     .delete(`/services/${service.id}`)
  //     .then(() => {
  //       router.navigate({to: '/services'});

  //       toast({
  //         variant: 'destructive',
  //         title: 'Service deleted',
  //         description: 'The service has been successfully deleted.',
  //       });
  //     })
  //     .catch(() => {
  //       toast({
  //         variant: 'destructive',
  //         title: 'An error occurred',
  //         description: 'An error occurred while processing your request',
  //       });
  //     });
  // }

  // const renderStatus = (status: string) => {
  //   let variant: 'none' | 'default' | 'destructive' | null | undefined = null;

  //   switch (status) {
  //     case 'draft':
  //       variant = 'none';
  //       break;
  //     case 'live':
  //       variant = 'default';
  //       break;
  //     case 'suspended':
  //       variant = 'destructive';
  //       break;
  //   }

  //   return (
  //     <Badge className="align-baseline capitalize" variant={variant}>
  //       {status}
  //     </Badge>
  //   );
  // };

  // return (
  //   <>
  //     <div className="flex items-center justify-between border-b border-greyscale-100 p-4">
  //       <div>
  //         <h1 className="text-2xl font-semibold text-greyscale-900">Services</h1>
  //         <Badge variant="none" className="mt-1">
  //           #{service.id}
  //         </Badge>
  //       </div>

  //       <div className="flex items-center justify-between gap-x-2">
  //         <Link to="/services">
  //           <Button variant="outline">
  //             <div className="flex items-center gap-x-2">
  //               <ArrowLeftIcon className="size-4" />
  //               <span>Back</span>
  //             </div>
  //           </Button>
  //         </Link>

  //         <Dialog>
  //           <DialogTrigger asChild>
  //             <Button variant="outline">
  //               <div className="flex items-center gap-x-2">
  //                 <Trash2Icon className="size-4" />
  //                 <span>Delete</span>
  //               </div>
  //             </Button>
  //           </DialogTrigger>
  //           <DialogContent className="sm:max-w-md">
  //             <DialogHeader>
  //               <DialogTitle>Delete Service</DialogTitle>
  //               <DialogDescription>
  //                 Are you sure you want to delete this service? This action cannot be undone.
  //               </DialogDescription>
  //             </DialogHeader>
  //             <DialogFooter>
  //               <DialogClose asChild>
  //                 <Button type="button" variant="outline">
  //                   Close
  //                 </Button>
  //               </DialogClose>

  //               <Button onClick={onDelete}>Delete</Button>
  //             </DialogFooter>
  //           </DialogContent>
  //         </Dialog>

  //         <Sheet open={open} onOpenChange={setOpen}>
  //           <SheetTrigger asChild>
  //             <Button className="text-greyscale-900">
  //               <div className="flex items-center gap-x-2">
  //                 <PencilIcon className="size-4" />
  //                 <span>Edit Service</span>
  //               </div>
  //             </Button>
  //           </SheetTrigger>
  //           <SheetContent className="flex flex-col">
  //             <SheetHeader className="-ml-6 -mr-6 flex items-center justify-between border-b border-greyscale-100 px-6 pb-[23px]">
  //               <SheetTitle className="flex-1">Edit Service</SheetTitle>
  //               <SheetPrimitive.Close asChild>
  //                 <Button variant="icon" size="icon">
  //                   <Cross2Icon className="size-4" />
  //                   <span className="sr-only">Close</span>
  //                 </Button>
  //               </SheetPrimitive.Close>
  //             </SheetHeader>

  //             <Form {...form}>
  //               <form
  //                 onSubmit={form.handleSubmit(onSubmit)}
  //                 className="mt-2 flex flex-1 flex-col gap-y-4"
  //               >
  //                 <div className="rounded-xl border border-greyscale-100 p-4">
  //                   <h3 className="font-semibold text-greyscale-900">Service details</h3>

  //                   <div className="mt-4 flex flex-col gap-y-4">
  //                     <FormField
  //                       control={form.control}
  //                       name="title"
  //                       render={({field}) => (
  //                         <FormItem>
  //                           <FormLabel>Title</FormLabel>
  //                           <FormControl>
  //                             <Input {...field} />
  //                           </FormControl>
  //                           <FormMessage />
  //                         </FormItem>
  //                       )}
  //                     />

  //                     <FormField
  //                       control={form.control}
  //                       name="description"
  //                       render={({field}) => (
  //                         <FormItem>
  //                           <FormLabel>Description (Optional)</FormLabel>
  //                           <FormControl>
  //                             <Textarea {...field} />
  //                           </FormControl>
  //                           <FormMessage />
  //                         </FormItem>
  //                       )}
  //                     />

  //                     <FormField
  //                       control={form.control}
  //                       name="price"
  //                       render={({field}) => (
  //                         <FormItem>
  //                           <FormLabel>Price</FormLabel>
  //                           <FormControl>
  //                             <CurrencyInput placeholder="0.00" {...field} />
  //                           </FormControl>
  //                           <FormMessage />
  //                         </FormItem>
  //                       )}
  //                     />

  //                     <FormField
  //                       control={form.control}
  //                       name="status"
  //                       render={({field}) => (
  //                         <FormItem>
  //                           <FormLabel>Status</FormLabel>
  //                           <FormControl>
  //                             <Select
  //                               onValueChange={field.onChange}
  //                               defaultValue={field.value}
  //                               value={field.value}
  //                               name={field.name}
  //                               disabled={field.disabled}
  //                             >
  //                               <SelectTrigger>
  //                                 <SelectValue />
  //                               </SelectTrigger>
  //                               <SelectContent>
  //                                 <SelectItem value="draft">Draft</SelectItem>
  //                                 <SelectItem value="live">Live</SelectItem>
  //                                 <SelectItem value="suspended">Suspended</SelectItem>
  //                               </SelectContent>
  //                             </Select>
  //                           </FormControl>
  //                           <FormMessage />
  //                         </FormItem>
  //                       )}
  //                     />
  //                   </div>
  //                 </div>

  //                 <SheetFooter className="mt-auto">
  //                   <Button type="submit" className="mt-auto w-full">
  //                     Save
  //                   </Button>
  //                 </SheetFooter>
  //               </form>
  //             </Form>
  //           </SheetContent>
  //         </Sheet>
  //       </div>
  //     </div>

  //     <div className="p-4 text-greyscale-900">
  //       <div className="rounded-xl border border-greyscale-100 p-6 shadow-sm">
  //         <div className="flex items-center justify-between">
  //           <h1 className="text-xl font-semibold">Service details</h1>

  //           {renderStatus(service.status)}
  //         </div>

  //         <div className="mt-6 flex flex-col gap-y-4">
  //           <div className="flex flex-col gap-y-1">
  //             <Label>Title</Label>
  //             <Input value={service.title} readOnly />
  //           </div>

  //           <div className="flex flex-col gap-y-1">
  //             <Label>Description (Optional)</Label>
  //             <Textarea
  //               value={service.description ?? ''}
  //               className={cn(!service.description && 'resize-none')}
  //               readOnly
  //             />
  //           </div>

  //           <div className="flex gap-x-2">
  //             <div className="w-56">
  //               <div className="flex flex-col gap-y-1">
  //                 <Label>Price</Label>
  //                 <CurrencyInput value={service.price?.toString()} readOnly />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}
