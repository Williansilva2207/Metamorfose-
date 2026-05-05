'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Star, Search, Calendar, Clock, User, CheckCircle, Brain, Sparkles } from 'lucide-react'
import { psychologists, professionalTypes, currentUser } from '@/lib/mock-data'
import type { Psychologist } from '@/lib/mock-data'

export default function PsicologasPage() {
  const [search, setSearch] = useState('')
  const [professionalType, setProfessionalType] = useState('todos')
  const [selectedPsy, setSelectedPsy] = useState<Psychologist | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const filteredPsychologists = psychologists.filter(psy => {
    const matchesSearch = psy.name.toLowerCase().includes(search.toLowerCase()) ||
      psy.specialty.toLowerCase().includes(search.toLowerCase())
    const matchesType = professionalType === 'todos' || psy.professionalType === professionalType
    return matchesSearch && matchesType
  })

  const handleSchedule = () => {
    if (selectedPsy && selectedSlot) {
      setShowSuccess(true)
    }
  }

  const closeModal = () => {
    setSelectedPsy(null)
    setSelectedSlot(null)
    setShowSuccess(false)
  }

  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Profissionais</h1>
        <p className="text-muted-foreground mt-1">
          Encontre o profissional ideal para você
        </p>
      </div>

      {/* Session Info */}
      <Card className="bg-primary/10 border-primary/20">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Sessões disponíveis: {currentUser.sessionsRemaining}/{currentUser.sessionsTotal}
              </p>
              <p className="text-xs text-muted-foreground">
                Plano {currentUser.plan === 'free' ? 'Gratuito' : currentUser.plan === 'paid' ? 'Premium' : 'Social'}
              </p>
            </div>
          </div>
          {currentUser.sessionsRemaining === 0 && (
            <Button size="sm" variant="default">
              Fazer Upgrade
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou especialidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card"
          />
        </div>
        <Select value={professionalType} onValueChange={setProfessionalType}>
          <SelectTrigger className="w-full sm:w-[220px] bg-card">
            <SelectValue placeholder="Tipo de Profissional" />
          </SelectTrigger>
          <SelectContent>
            {professionalTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Psychologists Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPsychologists.map((psy) => (
          <Card 
            key={psy.id} 
            className="bg-card hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedPsy(psy)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  {psy.professionalType === 'psicologa' && <User className="h-8 w-8 text-primary" />}
                  {psy.professionalType === 'neuropsicologo' && <Brain className="h-8 w-8 text-primary" />}
                  {psy.professionalType === 'outros' && <Sparkles className="h-8 w-8 text-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{psy.name}</h3>
                  <p className="text-sm text-muted-foreground">{psy.specialty}</p>
                  <p className="text-xs text-primary/80 capitalize">
                    {psy.professionalType === 'psicologa' ? 'Psicóloga' : 
                     psy.professionalType === 'neuropsicologo' ? 'Neuropsicólogo' : 'Terapeuta'}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-medium text-foreground">{psy.rating}</span>
                    <span className="text-sm text-muted-foreground">({psy.reviewsCount})</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 line-clamp-2">
                {psy.bio}
              </p>
              <div className="flex items-center justify-between mt-4">
                <Badge variant={psy.type === 'volunteer' ? 'secondary' : 'default'}>
                  {psy.type === 'volunteer' ? 'Voluntária' : 'Profissional'}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {psy.availableSlots.length} horários
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPsychologists.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-muted-foreground">Nenhum profissional encontrado</p>
        </div>
      )}

      {/* Schedule Modal */}
      <Dialog open={!!selectedPsy && !showSuccess} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground">Agendar Sessão</DialogTitle>
            <DialogDescription>
              Escolha um horário disponível com {selectedPsy?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPsy && (
            <div className="space-y-6">
              {/* Psychologist Info */}
              <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{selectedPsy.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedPsy.specialty}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="text-xs text-foreground">{selectedPsy.rating}</span>
                  </div>
                </div>
              </div>

              {/* Available Slots */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Horários Disponíveis (Hoje)
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {selectedPsy.availableSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedSlot === slot ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Schedule Button */}
              <Button 
                className="w-full" 
                disabled={!selectedSlot || currentUser.sessionsRemaining === 0}
                onClick={handleSchedule}
              >
                {currentUser.sessionsRemaining === 0 
                  ? 'Sem sessões disponíveis' 
                  : 'Confirmar Agendamento'
                }
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-md text-center">
          <div className="flex flex-col items-center py-4">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <DialogTitle className="text-xl text-foreground mb-2">
              Sessão Agendada!
            </DialogTitle>
            <DialogDescription className="text-center">
              Sua sessão com {selectedPsy?.name} foi agendada para hoje às {selectedSlot}.
            </DialogDescription>
            <Button className="mt-6" onClick={closeModal}>
              Entendi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
