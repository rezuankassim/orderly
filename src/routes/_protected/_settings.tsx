import {createFileRoute, Link, Outlet, useChildMatches, useLocation} from '@tanstack/react-router';
import {Button} from '@/components/ui/button';

export const Route = createFileRoute('/_protected/_settings')({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  const childMatches = useChildMatches();

  const onClick = () => {
    childMatches.at(0)?.context.clickSubmitForm?.();
  };

  const onCancelClick = () => {
    childMatches.at(0)?.context.clickClearForm?.();
  };

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-greyscale-100 p-4">
          <h1 className="text-2xl font-semibold text-greyscale-900">Settings</h1>

          <div className="flex gap-x-2">
            <Button onClick={onCancelClick} variant="outline">
              Cancel
            </Button>

            <Button onClick={onClick}>Save Change</Button>
          </div>
        </div>

        <div className="flex flex-1">
          <div className="w-48 border-r border-greyscale-100 p-4">
            <ul className="flex flex-col gap-y-3">
              <li>
                <Link
                  to="/settings/general"
                  data-active={location.href.includes('/general')}
                  className="block rounded-lg border border-transparent bg-transparent px-3 py-2 text-sm font-semibold text-greyscale-400 hover:border-greyscale-100 hover:bg-greyscale-25 hover:text-greyscale-900 focus:border-greyscale-100 focus:bg-greyscale-25 focus:text-greyscale-900 focus:outline-none data-[active=true]:border-greyscale-100 data-[active=true]:bg-greyscale-25 data-[active=true]:text-greyscale-900"
                >
                  General
                </Link>
              </li>

              <li>
                <Link
                  to="/settings/tiktok"
                  data-active={location.href.includes('/tiktok')}
                  className="block rounded-lg border border-transparent bg-transparent px-3 py-2 text-sm font-semibold text-greyscale-400 hover:border-greyscale-100 hover:bg-greyscale-25 hover:text-greyscale-900 focus:border-greyscale-100 focus:bg-greyscale-25 focus:text-greyscale-900 focus:outline-none data-[active=true]:border-greyscale-100 data-[active=true]:bg-greyscale-25 data-[active=true]:text-greyscale-900"
                >
                  TikTok
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
