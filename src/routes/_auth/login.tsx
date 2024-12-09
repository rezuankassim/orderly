// import {BaseDirectory, writeFile} from '@tauri-apps/plugin-fs';
import {createFileRoute, Link, useNavigate} from '@tanstack/react-router';
// import {Document, Page, Text, View, StyleSheet, pdf} from '@react-pdf/renderer';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import IconInput from '@/components/ui/input-icon';
import {EyeIcon, EyeOffIcon, MailIcon} from 'lucide-react';
import {LockClosedIcon} from '@radix-ui/react-icons';
import {useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import {useToast} from '@/hooks/use-toast';
import http from '@/lib/http';
// import {invoke} from '@tauri-apps/api/core';

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'column',
//     padding: 30,
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     fontSize: 14,
//   },
// });

// const MyPdfDocument = () => (
//   <Document>
//     <Page size={{width: 141.73, height: 226.77}} style={styles.page}>
//       <View style={styles.section}>
//         <Text>Hello, this is a PDF created with react-pdf!</Text>
//       </View>
//     </Page>
//   </Document>
// );

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  remember: z.boolean().default(false).optional(),
});

export const Route = createFileRoute('/_auth/login')({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  // async function click() {
  //   try {
  //     // Generate the PDF as a blob
  //     const pdfBlob = await pdf(<MyPdfDocument />).toBlob();

  //     // Convert the Blob to an ArrayBuffer
  //     const arrayBuffer = await pdfBlob.arrayBuffer();

  //     // Save the PDF using Tauri's fs plugin
  //     const fileName = 'react-pdf-example.pdf';
  //     const filePath = `./${fileName}`; // Saves to Tauri's default directory
  //     await writeFile(filePath, new Uint8Array(arrayBuffer), {baseDir: BaseDirectory.AppLocalData});

  //     alert(`PDF saved successfully as ${filePath}`);
  //   } catch (error) {
  //     console.error('Error saving PDF:', error);
  //     alert('Failed to save PDF.');
  //   }
  //   // await invoke('print_example');
  //   // const file = await open('bar.txt', {
  //   //   write: true,
  //   //   createNew: true,
  //   //   baseDir: BaseDirectory.AppLocalData,
  //   // });

  //   // await file.write(new TextEncoder().encode('world'));
  //   // await file.close();
  // }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    http
      .post('/login', values)
      .then(res => {
        const data = res.data;

        localStorage.setItem('access_token', data.token.token);

        navigate({to: '/dashboard'});
      })
      .catch(e => {
        if (e.response?.status === 422) {
          const errors = e.response.data.errors;

          errors.forEach((error: {message: string; rule: string; field: 'email' | 'password'}) => {
            form.setError(error.field, {message: error.message});
          });
        } else if (e.response?.status === 400) {
          toast({
            variant: 'destructive',
            title: 'Credentials Error',
            description: 'We could not find an account with the provided credentials',
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

  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-greyscale-900">Sign in to Monefy</h1>
        <p className="mt-4 text-greyscale-400">Send, spend and save smarter</p>
      </div>

      {/* <Button onClick={click}>Print</Button> */}

      <div className="mt-8 w-full max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <IconInput
                      leftIcon={<MailIcon className="h-4 w-4 text-greyscale-400" />}
                      placeholder="johnnyenglish@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem className="mt-4">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <IconInput
                      type={visible ? 'text' : 'password'}
                      rightClickable
                      leftIcon={<LockClosedIcon className="h-4 w-4 text-greyscale-400" />}
                      rightIcon={
                        <button type="button" onClick={togglePasswordVisibility}>
                          {!visible ? (
                            <EyeOffIcon className="h-4 w-4 text-greyscale-400" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-greyscale-400" />
                          )}
                        </button>
                      }
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-6 flex justify-between">
              <FormField
                control={form.control}
                name="remember"
                render={({field}) => (
                  <FormItem className="flex items-center gap-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>

                    <FormLabel className="text-greyscale-900">Remember Me</FormLabel>
                  </FormItem>
                )}
              />

              <Link to="/" className="text-sm text-secondary-200 underline">
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="mt-8 w-full">
              Sign In
            </Button>
          </form>
        </Form>
      </div>

      <div className="mt-8 flex gap-x-1 text-center text-sm">
        <p className="text-greyscale-400">Don't have an account?</p>
        <Link to="/register" className="text-secondary-200 underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
