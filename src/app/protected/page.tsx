import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

import { LogoutButton } from '@/components/login/logout-button'

export default async function ProtectedPage() {
  const session = await auth.api.getSession({
    headers: headers()
  })

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="flex h-svh w-full items-center justify-center gap-2">
      <p>
        Hello <span>{session.user.email}</span>
      </p>
      <LogoutButton />
    </div>
  )
}
