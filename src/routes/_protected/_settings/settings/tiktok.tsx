import {invoke} from '@tauri-apps/api/core';
import Database from '@tauri-apps/plugin-sql';

import * as React from 'react';
import {createFileRoute, useRouteContext, useRouter} from '@tanstack/react-router';

import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {EyeIcon} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {useToast} from '@/hooks/use-toast';

const formSchema = z.object({
  shop_name: z
    .string()
    .min(3, {
      message: 'Shop name must be at least 3 characters.',
    })
    .max(50, {
      message: 'Shop name must be at most 50 characters.',
    }),
  api_token: z.string().min(3, {
    message: 'API Token must be at least 3 characters.',
  }),
  ticket: z.string().refine(value => ['layout_1'].includes(value), 'Ticket must be Layout 1'),
});

export const Route = createFileRoute('/_protected/_settings/settings/tiktok')({
  component: Tiktok,
  loader: async () => {
    const db = await Database.load('sqlite:mydatabase.db');
    const result: Record<string, string>[] = await db.select(
      'SELECT * FROM settings WHERE name = "tiktok"'
    );
    const generalResult: Record<string, string>[] = await db.select(
      'SELECT * FROM settings WHERE name = "general"'
    );

    const newGeneralR = generalResult.map(r => {
      return {
        ...r,
        content: JSON.parse(r.content),
      };
    });

    const newR = result.map(r => {
      return {
        ...r,
        content: JSON.parse(r.content),
      };
    });

    return {
      shop_name: newR[0] ? newR[0].content.shop_name : '',
      api_token: newR[0] ? newR[0].content.api_token : '',
      ticket: newR[0] ? newR[0].content.ticket : '',
      printer_name: newGeneralR[0] ? newGeneralR[0].content.printer_name : '',
    };
  },
});

function Tiktok() {
  const context = useRouteContext({
    from: '/_protected/_settings/settings/tiktok',
  });
  const {shop_name, api_token, ticket, printer_name} = Route.useLoaderData();
  const {toast} = useToast();
  const router = useRouter();

  const ref = React.useRef<HTMLButtonElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shop_name: shop_name,
      api_token: api_token,
      ticket: ticket,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const db = await Database.load('sqlite:mydatabase.db');
      const valuesStringify = JSON.stringify(values);

      await db.execute(
        'INSERT INTO settings (name, content) VALUES ("tiktok", ?) ON CONFLICT(name) DO UPDATE SET content = ?',
        [valuesStringify, valuesStringify]
      );

      toast({
        title: 'Record saved',
        description: 'General settings has been saved successfully',
      });

      router.invalidate();
    } catch {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'An error occurred while processing your request',
      });
    }
  }

  function clickSubmit() {
    ref?.current?.click();
  }

  function clickClear() {
    form.reset();
  }

  context.clickSubmitForm = clickSubmit;
  context.clickClearForm = clickClear;

  return (
    <>
      <div className="border-b border-greyscale-100 pb-4">
        <h1 className="text-xl font-semibold text-greyscale-900">TikTok</h1>
        <p className="mt-2 text-greyscale-400">Set up and manage your TikTok Shop profile</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 flex flex-1 flex-col gap-y-4">
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="shop_name"
              render={({field}) => (
                <FormItem className="grid grid-flow-col grid-cols-2 items-center border-b border-transparent py-6 [&:not(div:last-child)]:border-greyscale-100">
                  <FormLabel className="text-base text-greyscale-400">Shop name</FormLabel>
                  <div className="flex flex-col">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="mt-3" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="api_token"
              render={({field}) => (
                <FormItem className="grid grid-flow-col grid-cols-2 items-center border-b border-transparent py-6 [&:not(div:last-child)]:border-greyscale-100">
                  <FormLabel className="text-base text-greyscale-400">API token</FormLabel>
                  <div className="flex flex-col">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="mt-3" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ticket"
              render={({field}) => (
                <FormItem className="grid grid-flow-col grid-cols-2 items-center border-b border-transparent py-6 [&:not(div:last-child)]:border-greyscale-100">
                  <div className="flex items-center gap-x-4">
                    <FormLabel className="text-base text-greyscale-400">Ticket Layout</FormLabel>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button type="button" variant="icon" size="icon">
                          <EyeIcon className="size-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-xl">
                        <DialogHeader>
                          <DialogTitle>Preview ticket layout</DialogTitle>
                        </DialogHeader>

                        <div className="mx-auto mt-2 flex h-[400px] w-[300px] flex-col justify-center rounded-xl border border-greyscale-100 p-6 shadow-sm">
                          <div>
                            <p>
                              <strong>{shop_name}</strong>
                            </p>
                            <p>
                              <strong>Customer name:</strong> Ali bin Abu
                            </p>
                            <p>
                              <strong>Items:</strong>
                            </p>
                            <p>1. Testing x1</p>
                            <p>2. Testing x2</p>
                          </div>
                        </div>

                        <DialogFooter>
                          <Button
                            type="button"
                            className="w-full"
                            disabled={!printer_name}
                            onClick={async () =>
                              await invoke('print_example', {printerName: printer_name})
                            }
                          >
                            Print
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex flex-col">
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
                          <SelectItem value="layout_1">Layout 1</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="mt-3" />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button ref={ref} type="submit" className="mt-auto hidden w-full">
            Create
          </Button>
        </form>
      </Form>
    </>
  );
}
