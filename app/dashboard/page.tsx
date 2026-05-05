'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Users, MessageCircle, Clock, ArrowRight } from 'lucide-react'
import { currentUser, sessions, psychologists } from '@/lib/mock-data'

export default function DashboardPage() {
  const upcomingSessions = sessions.filter(s => s.status === 'scheduled')
  const completedSessions = sessions.filter(s => s.status === 'completed')

  return (
    <div className="space-y-8 pt-12 md:pt-0">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Olá, {currentUser.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Bem-vinda ao seu espaço seguro de transformação.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sessões Restantes
            </CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {currentUser.sessionsRemaining}/{currentUser.sessionsTotal}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Plano {currentUser.plan === 'free' ? 'Gratuito' : currentUser.plan === 'paid' ? 'Premium' : 'Social'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Próxima Sessão
            </CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {upcomingSessions.length > 0 ? (
              <>
                <div className="text-2xl font-bold text-foreground">
                  {new Date(upcomingSessions[0].date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {upcomingSessions[0].time} - {upcomingSessions[0].psychologistName}
                </p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-foreground">-</div>
                <p className="text-xs text-muted-foreground mt-1">Nenhuma sessão agendada</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sessões Realizadas
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{completedSessions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Este mês</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Comunidade
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">127</div>
            <p className="text-xs text-muted-foreground mt-1">Mulheres conectadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Schedule Session */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Agendar Sessão</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Encontre uma psicóloga e agende sua próxima sessão de terapia.
            </p>
            <Link href="/dashboard/psicologas">
              <Button className="w-full">
                Ver Psicólogas Disponíveis
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Community */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Comunidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Conecte-se com outras mulheres em um ambiente seguro e acolhedor.
            </p>
            <Link href="/dashboard/comunidade">
              <Button variant="secondary" className="w-full">
                Acessar Comunidade
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Sessions */}
      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-foreground">Próximas Sessões</CardTitle>
          <Link href="/dashboard/sessoes">
            <Button variant="ghost" size="sm" className="text-primary">
              Ver todas
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {upcomingSessions.length > 0 ? (
            <div className="space-y-4">
              {upcomingSessions.map((session) => {
                const psy = psychologists.find(p => p.id === session.psychologistId)
                return (
                  <div 
                    key={session.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{session.psychologistName}</p>
                        <p className="text-sm text-muted-foreground">
                          {psy?.specialty}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">
                        {new Date(session.date).toLocaleDateString('pt-BR', { 
                          day: '2-digit', 
                          month: 'long' 
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">{session.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">Você não tem sessões agendadas</p>
              <Link href="/dashboard/psicologas">
                <Button variant="link" className="text-primary mt-2">
                  Agendar agora
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
