import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/auth');

  const { data: role } = await supabase
    .from('user_roles')
    .select('is_super_admin')
    .eq('user_id', user.id)
    .single();

  if (!role?.is_super_admin) {
    redirect('/auth'); 
  }

  return <div>Dashboard Content</div>;
}
