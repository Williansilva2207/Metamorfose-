'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Check, Star, FileText, Upload, CheckCircle } from 'lucide-react'
import { plans, currentUser } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function PlanosPage() {
  const [showAidModal, setShowAidModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleSelectPlan = (planId: string) => {
    if (planId === 'social') {
      setShowAidModal(true)
    } else if (planId === 'paid') {
      setSelectedPlan(planId)
    }
  }

  const handleSubmitAid = () => {
    setShowAidModal(false)
    setShowSuccessModal(true)
  }

  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Escolha Seu Plano</h1>
        <p className="text-muted-foreground mt-2">
          Invista no seu bem-estar emocional. Escolha o plano que melhor se adapta às suas necessidades.
        </p>
      </div>

      {/* Current Plan Info */}
      <Card className="bg-primary/10 border-primary/20 max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-between p-4">
          <div>
            <p className="text-sm text-muted-foreground">Seu plano atual</p>
            <p className="font-semibold text-foreground">
              {currentUser.plan === 'free' ? 'Gratuito' : currentUser.plan === 'paid' ? 'Premium' : 'Social'}
            </p>
          </div>
          <Badge variant="secondary">
            {currentUser.sessionsRemaining}/{currentUser.sessionsTotal} sessões
          </Badge>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {plans.map((plan) => {
          const isCurrentPlan = currentUser.plan === plan.id
          const isPaid = plan.id === 'paid'

          return (
            <Card 
              key={plan.id}
              className={cn(
                "bg-card relative",
                isPaid && "border-primary shadow-lg"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Mais Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-foreground">
                    {plan.price === 0 ? 'Grátis' : `R$${plan.price.toFixed(2).replace('.', ',')}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground">/mês</span>
                  )}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={isPaid ? 'default' : 'outline'}
                  disabled={isCurrentPlan}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {isCurrentPlan 
                    ? 'Plano Atual' 
                    : plan.id === 'social' 
                      ? 'Solicitar Isenção'
                      : plan.id === 'paid'
                        ? 'Assinar Premium'
                        : 'Selecionar'
                  }
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Financial Aid Modal */}
      <Dialog open={showAidModal} onOpenChange={setShowAidModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground">Solicitar Isenção Financeira</DialogTitle>
            <DialogDescription>
              O Plano Social é destinado a mulheres em situação de vulnerabilidade. 
              Por favor, preencha os dados abaixo.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-foreground">
                Conte-nos um pouco sobre sua situação
              </Label>
              <Textarea
                id="reason"
                placeholder="Descreva brevemente sua situação financeira atual..."
                className="min-h-[100px] resize-none bg-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="income" className="text-foreground">
                Renda familiar aproximada
              </Label>
              <Input
                id="income"
                type="text"
                placeholder="Ex: R$ 1.500,00"
                className="bg-input"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Comprovante (opcional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Arraste um arquivo ou clique para enviar
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Comprovante de renda, CadÚnico, etc.
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowAidModal(false)}>
                Cancelar
              </Button>
              <Button className="flex-1" onClick={handleSubmitAid}>
                <FileText className="h-4 w-4 mr-2" />
                Enviar Solicitação
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md text-center">
          <div className="flex flex-col items-center py-4">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <DialogTitle className="text-xl text-foreground mb-2">
              Solicitação Enviada!
            </DialogTitle>
            <DialogDescription className="text-center">
              Sua solicitação de isenção foi recebida. Nossa equipe irá analisar e 
              entrar em contato em até 3 dias úteis.
            </DialogDescription>
            <Button className="mt-6" onClick={() => setShowSuccessModal(false)}>
              Entendi
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Paid Plan Modal */}
      <Dialog open={selectedPlan === 'paid'} onOpenChange={(open) => !open && setSelectedPlan(null)}>
        <DialogContent className="sm:max-w-md text-center">
          <div className="flex flex-col items-center py-4">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-primary fill-primary" />
            </div>
            <DialogTitle className="text-xl text-foreground mb-2">
              Assinar Plano Premium
            </DialogTitle>
            <DialogDescription className="text-center">
              Esta é uma demonstração. Em um ambiente real, você seria redirecionada 
              para a página de pagamento.
            </DialogDescription>
            <Button className="mt-6" onClick={() => setSelectedPlan(null)}>
              Entendi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
