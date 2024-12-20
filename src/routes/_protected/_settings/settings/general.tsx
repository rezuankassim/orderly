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
import {useToast} from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Printers = {
  name: string;
  system_name: string;
  driver_name: string;
};

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters.',
    })
    .max(50, {
      message: 'Name must be at most 50 characters.',
    }),
  printer_name: z
    .string()
    .min(3, {message: 'Printer name must be at least 3 characters.'})
    .max(50, {message: 'Printer name must be at most 50 characters.'}),
});

export const Route = createFileRoute('/_protected/_settings/settings/general')({
  component: General,
  loader: async () => {
    const printers = await invoke<string>('retrieve_printers');
    const db = await Database.load('sqlite:mydatabase.db');
    const result: Record<string, string>[] = await db.select(
      'SELECT * FROM settings WHERE name = "general"'
    );

    return {
      name: result[0] ? result[0].content : '',
      printers: JSON.parse(printers),
    };
  },
  shouldReload: true,
});

function General() {
  const context = useRouteContext({
    from: '/_protected/_settings/settings/general',
  });
  const {name, printers} = Route.useLoaderData() as {name: string; printers: Printers[]};
  const {toast} = useToast();
  const router = useRouter();

  const ref = React.useRef<HTMLButtonElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
      printer_name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const db = await Database.load('sqlite:mydatabase.db');
      const valuesStringify = JSON.stringify(values);

      await db.execute(
        'INSERT INTO settings (name, content) VALUES ("general", ?) ON CONFLICT(name) DO UPDATE SET content = ?',
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
        <h1 className="text-xl font-semibold text-greyscale-900">General</h1>
        <p className="mt-2 text-greyscale-400">Set up and manage your profile</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 flex flex-1 flex-col gap-y-4">
          <div className="mt-4 flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem className="grid grid-flow-col grid-cols-2 items-center">
                  <FormLabel className="text-base text-greyscale-400">Name</FormLabel>
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
              name="printer_name"
              render={({field}) => (
                <FormItem className="grid grid-flow-col grid-cols-2 items-center">
                  <FormLabel className="text-base text-greyscale-400">Printer Name</FormLabel>
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
                          {printers.map(printer => (
                            <SelectItem key={printer.name} value={printer.name}>
                              {printer.name}
                            </SelectItem>
                          ))}
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
