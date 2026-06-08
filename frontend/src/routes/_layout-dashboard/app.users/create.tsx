import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';

import { UserForm } from '@/modules/users/components/user-form';
import { userKeys } from '@/modules/users/user.key';
import { userMutationOptions } from '@/modules/users/user.mutation';

import { hasPermissionPage } from '@/utils/auth/has-permission';

export const Route = createFileRoute('/_layout-dashboard/app/users/create')({
  component: UsersCreatePage,
  beforeLoad: ({ context }) => {
    hasPermissionPage(context, 'create', 'User');
  },
});

function UsersCreatePage() {
  const navigate = useNavigate({ from: '/app/users/create' });
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    ...userMutationOptions.create(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success('User created successfully');
      navigate({ to: '/app/users' });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create user');
    },
  });

  return (
    <div className='space-y-4'>
      <Card className='rounded-2xl shadow-sm'>
        <CardContent>
          <div className='space-y-1'>
            <p className='text-sm font-medium text-muted-foreground'>Users</p>
            <h1 className='text-2xl font-semibold tracking-tight'>Create User</h1>
            <p className='max-w-2xl text-sm text-muted-foreground'>
              Add a new platform user and assign role access. This action is restricted to administrators.
            </p>
          </div>
        </CardContent>
      </Card>

      <UserForm
        mode='create'
        isSubmitting={createMutation.isPending}
        onSubmit={(payload) => createMutation.mutate(payload)}
      />
    </div>
  );
}
