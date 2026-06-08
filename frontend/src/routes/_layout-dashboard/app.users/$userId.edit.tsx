import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { SearchX } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FallbackSpinner } from '@/components/ui/fallback-spinner';

import { UserForm } from '@/modules/users/components/user-form';
import { userKeys } from '@/modules/users/user.key';
import { userMutationOptions } from '@/modules/users/user.mutation';
import { userQueryOptions } from '@/modules/users/user.query';

import { hasPermission } from '@/utils/auth/has-permission';
import { useAuth } from '@/utils/hooks/use-auth';

export const Route = createFileRoute('/_layout-dashboard/app/users/$userId/edit')({
  component: UsersEditPage,
  beforeLoad: ({ context }) => {
    if (!hasPermission(context.ability, 'update', 'User')) {
      throw redirect({ to: '/not-found' });
    }
  },
});

function UsersEditPage() {
  const { userData } = useAuth();
  const navigate = useNavigate({ from: '/app/users/$userId/edit' });
  const queryClient = useQueryClient();
  const { userId } = Route.useParams();

  const userQuery = useQuery({
    ...userQueryOptions.getById(userId),
  });

  const updateMutation = useMutation({
    ...userMutationOptions.update(userId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: userKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) }),
      ]);
      toast.success('User updated successfully');
      navigate({ to: '/app/users' });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update user');
    },
  });

  if (userQuery.isError) {
    return (
      <Card className='rounded-2xl'>
        <CardContent className='flex min-h-64 flex-col items-center justify-center gap-3 text-center'>
          <SearchX className='size-7 text-muted-foreground' />
          <p className='font-medium'>Unable to load user details.</p>
          <Button variant='outline' onClick={() => userQuery.refetch()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (userQuery.isPending || !userQuery.data) {
    return <FallbackSpinner fullscreen />;
  }

  return (
    <div className='space-y-4'>
      <Card className='rounded-2xl shadow-sm'>
        <CardContent>
          <div className='space-y-1'>
            <p className='text-sm font-medium text-muted-foreground'>Users</p>
            <h1 className='text-2xl font-semibold tracking-tight'>Edit User</h1>
            <p className='max-w-2xl text-sm text-muted-foreground'>
              Update account profile, role access, and account status. This action is restricted to administrators.
            </p>
          </div>
        </CardContent>
      </Card>

      <UserForm
        mode='edit'
        initialValue={userQuery.data}
        isSelfEdit={userData.id === userId}
        isSubmitting={updateMutation.isPending}
        onSubmit={(payload) => updateMutation.mutate(payload)}
      />
    </div>
  );
}
