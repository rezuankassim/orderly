import * as React from 'react';
import {
  ArrowLeftRightIcon,
  AudioWaveform,
  BoxesIcon,
  ChartPieIcon,
  CircleHelpIcon,
  ClipboardIcon,
  Command,
  GalleryVerticalEnd,
  HomeIcon,
  Map,
  SettingsIcon,
  UsersIcon,
  WalletMinimalIcon,
} from 'lucide-react';

import {NavMain} from '@/components/nav-main';
import {NavPreference} from '@/components/nav-preference';
import {NavUser} from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import Logo from './logo';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: HomeIcon,
    },
    {
      title: 'Services',
      url: '/services',
      icon: BoxesIcon,
    },
    {
      title: 'Customers',
      url: '/customers',
      icon: UsersIcon,
    },
    {
      title: 'Invoices',
      url: '#',
      icon: ClipboardIcon,
    },
    {
      title: 'Reports',
      url: '#',
      icon: ChartPieIcon,
    },
  ],
  preferences: [
    {
      title: 'Settings',
      url: '/settings/general',
      icon: SettingsIcon,
    },
    {
      title: 'Help Center',
      url: '#',
      icon: CircleHelpIcon,
    },
  ],
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
};

export function AppSidebar({user, ...props}: AppSidebarProps) {
  return (
    <Sidebar collapsible="none" {...props}>
      <SidebarHeader>
        <Logo width="125" height="32" />
      </SidebarHeader>
      <SidebarContent>
        <NavUser user={user} />

        <NavMain items={data.navMain} />

        <NavPreference items={data.preferences} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
