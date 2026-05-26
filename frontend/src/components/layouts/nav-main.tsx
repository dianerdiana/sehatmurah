import { Link } from '@tanstack/react-router';
import { ChevronRightIcon } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import { useAppAbility } from '@/utils/hooks/use-app-ability';
import type { NavigationGroup, NavigationItem } from '@/utils/navigation';

import type { AppAbility } from '@/types/ability-rule.type';

const renderCollapsibleItems = (item: NavigationItem, ability: AppAbility) => {
  if (item.permission && ability.cannot(item.permission.action, item.permission.subject)) {
    return null;
  }

  return (
    <Collapsible key={item.title} asChild defaultOpen={item.isActive} className='group/collapsible'>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            className='hover:bg-sidebar-primary hover:text-sidebar-primary-foreground'
          >
            {item.icon && item.icon}
            <span>{item.title}</span>
            <ChevronRightIcon className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton
                  asChild
                  className='hover:bg-sidebar-primary hover:text-sidebar-primary-foreground'
                >
                  <Link
                    to={subItem.url}
                    activeProps={{ className: 'bg-sidebar-primary text-sidebar-primary-foreground' }}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const renderMenuItem = (item: NavigationItem, ability: AppAbility) => {
  if (item.permission && ability.cannot(item.permission.action, item.permission.subject)) {
    return null;
  }

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild className='hover:bg-sidebar-primary hover:text-sidebar-primary-foreground'>
        <Link
          to={item.url}
          activeProps={{ className: 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-primary/50' }}
        >
          {item.icon && item.icon}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function NavMain({ groups }: { groups: NavigationGroup[] }) {
  const ability = useAppAbility();

  return groups.map((group) => (
    <SidebarGroup key={group.label}>
      <SidebarGroupLabel className='font-bold'>{group.label}</SidebarGroupLabel>
      <SidebarMenu>
        {group.items.map((item) => {
          return item.items ? renderCollapsibleItems(item, ability) : renderMenuItem(item, ability);
        })}
      </SidebarMenu>
    </SidebarGroup>
  ));
}
