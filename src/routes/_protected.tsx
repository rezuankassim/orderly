import {AppSidebar} from '@/components/app-sidebar';
import {Button} from '@/components/ui/button';
import {SidebarInset, SidebarProvider} from '@/components/ui/sidebar';
import http from '@/lib/http';
import {createFileRoute, Outlet, redirect} from '@tanstack/react-router';
import {BellIcon, SearchIcon} from 'lucide-react';

export const Route = createFileRoute('/_protected')({
  component: ProtectedLayout,
  beforeLoad: async ({location}) => {
    const token = localStorage.getItem('access_token');
    const is_authenticated = !!token;

    if (!is_authenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  loader: async () => {
    const res = await http.get('/my-info');
    const data = res.data;

    return {
      user: {
        fullName: data.user.full_name,
        email: data.user.email,
      },
    };
  },
  shouldReload: true,
});

function ProtectedLayout() {
  const {user} = Route.useLoaderData();

  return (
    <SidebarProvider>
      <AppSidebar user={{name: user.fullName, email: user.email, avatar: '/avatars/shadcn.jpg'}} />

      <SidebarInset>
        <header className="flex h-[88px] shrink-0 items-center gap-2 border-b border-greyscale-100">
          <div className="flex items-center gap-2 px-4 py-6">
            <div className="relative h-full w-full">
              <input
                type="search"
                className="w-60 rounded-full border border-greyscale-100 bg-white py-2 pl-8 pr-3 text-sm font-medium text-greyscale-900 shadow-sm outline-none focus-visible:border-primary-300 focus-visible:ring focus-visible:ring-primary-50"
              />

              <SearchIcon className="absolute left-0 top-0 ml-3 mt-[11px] size-4 text-greyscale-900" />
            </div>
          </div>
          <div className="ml-auto px-3">
            <Button variant="icon" size="icon">
              <BellIcon className="size-4" />
              <span className="sr-only">Notification</span>
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
