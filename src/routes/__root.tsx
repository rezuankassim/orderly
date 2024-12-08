import {check} from '@tauri-apps/plugin-updater';
import {relaunch} from '@tauri-apps/plugin-process';

import {createRootRouteWithContext, Link, Outlet} from '@tanstack/react-router';

import '../index.css';
import {Toaster} from '@/components/ui/toaster';
import Logo from '@/components/logo';
import {Button} from '@/components/ui/button';
import Sorry from '@/components/illustration/sorry';
import Stress from '@/components/illustration/stress';
import {useToast} from '@/hooks/use-toast';
import {useEffect} from 'react';
import {ToastAction} from '@radix-ui/react-toast';

interface MyRouterContext {
  clickClearForm?: () => void;
  clickSubmitForm?: () => void;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
  notFoundComponent: () => {
    return (
      <div className="flex h-full flex-col bg-white">
        <div className="border-b border-greyscale-100 px-6 py-5">
          <Logo width="125" height="32" />
        </div>

        <div className="-mt-20 flex flex-1 flex-col items-center justify-center text-greyscale-900">
          <Sorry className="h-[400px] w-[400px]" />

          <div className="text-center">
            <h1 className="text-5xl font-semibold">Opps!</h1>
            <p className="mt-4 text-lg text-greyscale-400">
              We couldn't find the page you were looking for.
            </p>
          </div>

          <div className="mt-12">
            <Link to="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  },
  errorComponent: () => {
    return (
      <div className="flex h-full flex-col bg-white">
        <div className="border-b border-greyscale-100 px-6 py-5">
          <Logo width="125" height="32" />
        </div>

        <div className="-mt-20 flex flex-1 flex-col items-center justify-center text-greyscale-900">
          <Stress className="h-[400px] w-[400px]" />

          <div className="text-center">
            <h1 className="text-5xl font-semibold">Opps!</h1>
            <p className="mt-4 max-w-96 text-pretty text-lg text-greyscale-400">
              We're not exactly sure what happened, but our servers say something is wrong.
            </p>
          </div>

          <div className="mt-12">
            <Link to="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  },
});

function Root() {
  const {toast} = useToast();

  useEffect(() => {
    const checkUpdate = async () => {
      const update = await check();

      if (update) {
        toast({
          title: 'Update Available',
          description: 'An update is available for this application',
          action: <ToastAction altText="Update">Update</ToastAction>,
        });
      }
    };

    checkUpdate();
  });

  return (
    <>
      <div className="h-full">
        <Outlet />
        <Toaster />
      </div>
    </>
  );
}
