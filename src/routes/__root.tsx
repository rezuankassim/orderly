import {createRootRouteWithContext, Link, Outlet} from '@tanstack/react-router';

import '../index.css';
import {Toaster} from '@/components/ui/toaster';
import Logo from '@/components/logo';
import {Button} from '@/components/ui/button';
import Sorry from '@/components/illustration/sorry';
import Stress from '@/components/illustration/stress';

interface MyRouterContext {
  clickClearForm?: () => void;
  clickSubmitForm?: () => void;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <div className="h-full">
        <Outlet />
        <Toaster />
      </div>
    </>
  ),
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
