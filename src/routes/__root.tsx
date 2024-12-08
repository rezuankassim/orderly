import {check, Update} from '@tauri-apps/plugin-updater';
import {relaunch} from '@tauri-apps/plugin-process';

import {createRootRouteWithContext, Link, Outlet} from '@tanstack/react-router';

import '../index.css';
import {Toaster} from '@/components/ui/toaster';
import Logo from '@/components/logo';
import {Button} from '@/components/ui/button';
import Sorry from '@/components/illustration/sorry';
import Stress from '@/components/illustration/stress';
import {useEffect, useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Progress} from '@/components/ui/progress';

interface MyRouterContext {
  clickClearForm?: () => void;
  clickSubmitForm?: () => void;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
  loader: async () => {
    const update = await check();

    return {
      update: update,
    };
  },
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
  const {update} = Route.useLoaderData();
  const [progressValue, setProgressValue] = useState(0);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  useEffect(() => {
    async function updateApp(update: Update, downloaded: number, contentLength: number) {
      await update.downloadAndInstall(event => {
        switch (event.event) {
          case 'Started':
            contentLength = event.data.contentLength ?? 0;
            break;
          case 'Progress':
            downloaded += event.data.chunkLength;
            setProgressValue((downloaded / contentLength) * 100);
            break;
          case 'Finished':
            console.log('download finished');
            break;
        }
      });

      relaunch();
    }

    if (update) {
      setShowUpdateDialog(true);

      const downloaded = 0;
      const contentLength = 0;

      updateApp(update, downloaded, contentLength);
    }
  }, [update]);

  return (
    <>
      <div className="h-full">
        <Dialog open={showUpdateDialog} onOpenChange={() => setShowUpdateDialog(true)}>
          <DialogContent withoutClose>
            <DialogHeader>
              <DialogTitle>Updating</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <p>Please be patient, we are updating this application for you.</p>

              <Progress className="mt-4" value={progressValue} />
            </DialogDescription>
          </DialogContent>
        </Dialog>

        <Outlet />
        <Toaster />
      </div>
    </>
  );
}
