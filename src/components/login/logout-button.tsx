'use client'

import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login"); // redirect to login page
        },
      },
    });
  }

  return <Button onClick={logout} variant="outline" size="sm" className="font-bold">로그아웃</Button>
}
