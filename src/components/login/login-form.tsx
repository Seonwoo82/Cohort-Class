'use client'

import { cn } from '@/lib/utils'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { useState } from 'react'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSocialLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/protected" // or wherever you want to redirect
    }, {
      onError: (ctx) => {
        setError(ctx.error.message)
        setIsLoading(false)
      }
    })
  }

  return (
    <div className={cn('flex flex-col gap-6 items-center', className)} {...props}>
      <Card className="w-full text-center">
        <CardHeader>
          <Image src="/images/cohortclass-logo.svg" alt="코호트클래스" className="mx-auto mb-4" width={200} height={50} />
          {/* <CardTitle className="text-2xl">Welcome!</CardTitle> */}
          <CardDescription>코호트클래스에 오신 것을 환영합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSocialLogin}>
            <div className="flex flex-col gap-6">
              {error && <p className="text-sm text-destructive-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...'
                  :
                  <div className="flex items-center gap-2">
                    <img
                      className="h-5 w-5 mr-2"
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google logo"
                    />
                    <span>구글로 간편하게 로그인</span>
                  </div>
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
