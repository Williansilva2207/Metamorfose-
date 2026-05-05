'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff, Heart, ArrowLeft } from 'lucide-react'

export default function CadastroPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('As senhas não coincidem')
      return
    }
    setIsLoading(true)
    // Simulate registration
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
              width={240}
              height={240}
              className="rounded-2xl shadow-lg"
            />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Comece Sua Jornada
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Junte-se a centenas de mulheres que estão transformando suas vidas com apoio profissional e uma comunidade acolhedora.
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
            <Link 
              href="/" 
              className="absolute left-6 top-6 text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
            <div className="flex justify-center mb-4 lg:hidden">
              <Image
                src="/logo.jpg"
                alt="Metamorfose"
                width={160}
                height={160}
                className="rounded-xl"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Criar Conta</CardTitle>
            <CardDescription className="text-muted-foreground">
              Preencha os dados para se cadastrar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Nome completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-input"
                />
              </div>

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
                <Label htmlFor="password" className="text-foreground">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Crie uma senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-input"
                />
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  required
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  Li e aceito os{' '}
                  <Link href="#" className="text-primary hover:underline">
                    Termos de Uso
                  </Link>{' '}
                  e a{' '}
                  <Link href="#" className="text-primary hover:underline">
                    Política de Privacidade
                  </Link>
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading || !acceptTerms}
              >
                {isLoading ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta?{' '}
                <Link href="/" className="text-primary hover:underline font-medium">
                  Entrar
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
