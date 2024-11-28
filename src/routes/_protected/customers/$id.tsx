import type {Customer} from '@/components/customers/columns';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {columns} from '@/components/vehicles/columns';
import {DataTable} from '@/components/vehicles/data-table';
import http from '@/lib/http';
import {Link} from '@tanstack/react-router';
import {createFileRoute} from '@tanstack/react-router';
import {ArrowLeftIcon} from 'lucide-react';

export const Route = createFileRoute('/_protected/customers/$id')({
  component: Customer,
  loader: async ({params}) => {
    const {data} = await http.get(`/customers/${params.id}`);

    return {
      customer: data.customer,
    } as {customer: Customer};
  },
});

function Customer() {
  const {customer} = Route.useLoaderData();

  const renderStatus = (status: string) => {
    let variant: 'none' | 'default' | 'destructive' | null | undefined = null;

    switch (status) {
      case 'active':
        variant = 'default';
        break;
      case 'suspended':
        variant = 'destructive';
        break;
    }

    return (
      <Badge className="align-baseline capitalize" variant={variant}>
        {status}
      </Badge>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-greyscale-100 p-4 text-greyscale-900">
        <div>
          <h1 className="text-2xl font-semibold">Customers</h1>
          <Badge variant="none" className="mt-1">
            #{customer.id}
          </Badge>
        </div>

        <div className="flex items-center justify-between gap-x-2">
          <Link to="/customers">
            <Button variant="outline">
              <div className="flex items-center gap-x-2">
                <ArrowLeftIcon className="size-4" />
                <span>Back</span>
              </div>
            </Button>
          </Link>

          {/* <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <div className="flex items-center gap-x-2">
                  <Trash2Icon className="size-4" />
                  <span>Delete</span>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Delete Service</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this service? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Close
                  </Button>
                </DialogClose>

                <Button onClick={onDelete}>Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button className="text-greyscale-900">
                <div className="flex items-center gap-x-2">
                  <PencilIcon className="size-4" />
                  <span>Edit Service</span>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <SheetHeader className="-ml-6 -mr-6 flex items-center justify-between border-b border-greyscale-100 px-6 pb-[23px]">
                <SheetTitle className="flex-1">Edit Service</SheetTitle>
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
                      Save
                    </Button>
                  </SheetFooter>
                </form>
              </Form>
            </SheetContent>
          </Sheet> */}
        </div>
      </div>

      <div className="flex flex-col gap-y-4 p-4 text-greyscale-900">
        <div>
          <div className="rounded-xl border border-greyscale-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Customer details</h1>

              {renderStatus(customer.status)}
            </div>

            <div className="mt-6 flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-1">
                <Label>Name</Label>
                <Input value={customer.name} readOnly />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-xl border border-greyscale-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Customer vehicles</h1>
            </div>

            <div className="mt-6 flex flex-col gap-y-4">
              <DataTable columns={columns} data={customer.vehicles ?? []} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
