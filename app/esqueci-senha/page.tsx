'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSent(true)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-0 shadow-xl bg-card">
        <CardHeader className="text-center pb-2">
          <Link 
            href="/" 
            className="absolute left-6 top-6 text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.jpg"
              alt="Metamorfose"
              width={80}
              height={80}
              className="rounded-xl"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            {sent ? 'E-mail Enviado!' : 'Recuperar Senha'}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {sent 
              ? 'Verifique sua caixa de entrada'
              : 'Digite seu e-mail para recuperar sua senha'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enviamos um link de recuperação para <strong className="text-foreground">{email}</strong>. 
                Verifique também sua pasta de spam.
              </p>
              <div className="pt-4">
                <Link href="/">
                  <Button className="w-full">
                    Voltar para o Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-input pl-10"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
              </Button>
            </form>
          )}

          {!sent && (
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Lembrou sua senha?{' '}
                <Link href="/" className="text-primary hover:underline font-medium">
                  Entrar
                </Link>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
