'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { User, Mail, Calendar, CreditCard, Shield, Bell, CheckCircle } from 'lucide-react'
import { currentUser, sessions } from '@/lib/mock-data'

export default function PerfilPage() {
  const [name, setName] = useState(currentUser.name)
  const [email, setEmail] = useState(currentUser.email)
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const completedSessions = sessions.filter(s => s.status === 'completed').length

  const handleSave = () => {
    setIsEditing(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="space-y-6 pt-12 md:pt-0 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Meu Perfil</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie suas informações pessoais
        </p>
      </div>

      {/* Success notification */}
      {showSuccess && (
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-primary" />
            <p className="text-sm text-foreground">
              Suas informações foram atualizadas com sucesso.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Profile Card */}
      <Card className="bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-foreground">Informações Pessoais</CardTitle>
            {!isEditing && (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Editar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg">{currentUser.name}</h3>
              <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            </div>
          </div>

          <Separator />

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Nome completo
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                className="bg-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className="bg-input"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button className="flex-1" onClick={handleSave}>
                Salvar Alterações
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Resumo da Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <CreditCard className="h-4 w-4" />
                <span className="text-sm">Plano</span>
              </div>
              <p className="font-semibold text-foreground">
                {currentUser.plan === 'free' ? 'Gratuito' : currentUser.plan === 'paid' ? 'Premium' : 'Social'}
              </p>
            </div>

            <div className="p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Sessões</span>
              </div>
              <p className="font-semibold text-foreground">
                {currentUser.sessionsRemaining}/{currentUser.sessionsTotal} disponíveis
              </p>
            </div>

            <div className="p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Realizadas</span>
              </div>
              <p className="font-semibold text-foreground">{completedSessions} sessões</p>
            </div>

            <div className="p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Membro desde</span>
              </div>
              <p className="font-semibold text-foreground">Abril 2026</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Card */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacidade e Segurança
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Alterar senha</p>
              <p className="text-sm text-muted-foreground">Atualize sua senha de acesso</p>
            </div>
            <Button variant="outline" size="sm">
              Alterar
            </Button>
          </div>
          
          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notificações
              </p>
              <p className="text-sm text-muted-foreground">Gerencie suas preferências</p>
            </div>
            <Badge variant="secondary">Ativas</Badge>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Excluir conta</p>
              <p className="text-sm text-muted-foreground">Remover permanentemente sua conta</p>
            </div>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
              Excluir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
