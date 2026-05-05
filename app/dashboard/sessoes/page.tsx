'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Clock, MessageCircle, Video, Phone, Star } from 'lucide-react'
import { sessions, psychologists } from '@/lib/mock-data'

export default function SessoesPage() {
  const [activeTab, setActiveTab] = useState('upcoming')

  const upcomingSessions = sessions.filter(s => s.status === 'scheduled')
  const completedSessions = sessions.filter(s => s.status === 'completed')

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'chat':
        return <MessageCircle className="h-4 w-4" />
      case 'video':
        return <Video className="h-4 w-4" />
      case 'audio':
        return <Phone className="h-4 w-4" />
      default:
        return <MessageCircle className="h-4 w-4" />
    }
  }

  const getSessionTypeLabel = (type: string) => {
    switch (type) {
      case 'chat':
        return 'Chat'
      case 'video':
        return 'Vídeo'
      case 'audio':
        return 'Áudio'
      default:
        return type
    }
  }

  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Minhas Sessões</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie seus agendamentos e histórico de sessões
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="upcoming">
            Próximas ({upcomingSessions.length})
          </TabsTrigger>
          <TabsTrigger value="history">
            Histórico ({completedSessions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {upcomingSessions.length > 0 ? (
            <div className="space-y-4">
              {upcomingSessions.map((session) => {
                const psy = psychologists.find(p => p.id === session.psychologistId)
                return (
                  <Card key={session.id} className="bg-card">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {session.psychologistName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {psy?.specialty}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                {new Date(session.date).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {session.time}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            {getSessionTypeIcon(session.type)}
                            {getSessionTypeLabel(session.type)}
                          </Badge>
                          <Button>Entrar na Sessão</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="bg-card">
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">Você não tem sessões agendadas</p>
                <Button className="mt-4" variant="default" asChild>
                  <a href="/dashboard/psicologas">Agendar Sessão</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          {completedSessions.length > 0 ? (
            <div className="space-y-4">
              {completedSessions.map((session) => {
                const psy = psychologists.find(p => p.id === session.psychologistId)
                return (
                  <Card key={session.id} className="bg-card">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {session.psychologistName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {psy?.specialty}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                {new Date(session.date).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {session.time}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">Concluída</Badge>
                          <Button variant="outline" size="sm">
                            <Star className="h-4 w-4 mr-1" />
                            Avaliar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="bg-card">
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">Nenhuma sessão realizada ainda</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
