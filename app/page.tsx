'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Heart } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary/10 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.jpg"
              alt="Metamorfose"
              width={120}
              height={120}
              className="rounded-2xl shadow-lg"
            />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Bem-vinda ao Metamorfose
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Um espaço seguro para sua transformação. Conecte-se com psicólogas e uma comunidade de mulheres que entendem você.
          </p>
          <div className="flex justify-center gap-2 mt-8">
            <Heart className="h-5 w-5 text-primary fill-primary" />
            <Heart className="h-5 w-5 text-primary/70 fill-primary/70" />
            <Heart className="h-5 w-5 text-primary/40 fill-primary/40" />
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-0 shadow-xl bg-card">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4 lg:hidden">
              <Image
                src="/logo.jpg"
                alt="Metamorfose"
                width={80}
                height={80}
                className="rounded-xl"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Entrar</CardTitle>
            <CardDescription className="text-muted-foreground">
              Acesse sua conta para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-input"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-foreground">Senha</Label>
                  <Link 
                    href="/esqueci-senha" 
                    className="text-sm text-primary hover:underline"
                  >
                    Esqueci minha senha
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-input pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Ainda não tem uma conta?{' '}
                <Link href="/cadastro" className="text-primary hover:underline font-medium">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
