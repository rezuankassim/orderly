import {createFileRoute, Link, useNavigate} from '@tanstack/react-router';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import IconInput from '@/components/ui/input-icon';
import {EyeIcon, EyeOffIcon, MailIcon, UserIcon} from 'lucide-react';
import {LockClosedIcon} from '@radix-ui/react-icons';
import {useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import http from '@/lib/http';
import {useToast} from '@/hooks/use-toast';

const formSchema = z.object({
  fullName: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  agree: z.boolean().default(false),
});

export const Route = createFileRoute('/_auth/register')({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const {toast} = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      agree: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    http
      .post('/register', {
        name: values.fullName,
        username: values.username,
        email: values.email,
        password: values.password,
        terms: values.agree,
      })
      .then(res => {
        const data = res.data;

        localStorage.setItem('access_token', data.token.token);

        navigate({to: '/dashboard'});
      })
      .catch(e => {
        if (e.response?.status === 422) {
          toast({
            variant: 'destructive',
            title: 'Validation Error',
            description: 'Please check the form for errors',
          });

          const errors = e.response.data.errors;
          errors.forEach(
            (error: {message: string; rule: string; field: 'email' | 'fullName' | 'password'}) => {
              form.setError(error.field, {message: error.message});
            }
          );
        } else {
          toast({
            variant: 'destructive',
            title: 'An error occurred',
            description:
              'An error occurred while processing your request ' + import.meta.env.VITE_API_URL,
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
        <h1 className="text-3xl font-semibold text-greyscale-900">Sign up to Monefy</h1>
        <p className="mt-4 text-greyscale-400">Send, spend and save smarter</p>
      </div>

      <div className="mt-8 w-full max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="fullName"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <IconInput
                      leftIcon={<UserIcon className="h-4 w-4 text-greyscale-400" />}
                      placeholder="Johnny English"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({field}) => (
                <FormItem className="mt-4">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <IconInput
                      leftIcon={<UserIcon className="h-4 w-4 text-greyscale-400" />}
                      placeholder="johnnyenglish"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem className="mt-4">
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
                name="agree"
                render={({field}) => (
                  <FormItem className="flex items-center gap-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>

                    <FormLabel className="font-normal text-greyscale-400">
                      By creating an account, you agreeing to our{' '}
                      <span className="text-greyscale-900 underline">Privacy Policy,</span> and{' '}
                      <span className="text-greyscale-900 underline">
                        Electronics Communication Policy
                      </span>
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="mt-8 w-full">
              Sign In
            </Button>
          </form>
        </Form>
      </div>

      <div className="mt-8 flex gap-x-1 text-center text-sm">
        <p className="text-greyscale-400">Already have an account?</p>
        <Link to="/login" className="text-secondary-200 underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
