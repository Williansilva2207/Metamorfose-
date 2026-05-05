// Mock data for Metamorfose app

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: 'free' | 'paid' | 'social'
  sessionsRemaining: number
  sessionsTotal: number
}

export interface Psychologist {
  id: string
  name: string
  specialty: string
  professionalType: 'psicologa' | 'neuropsicologo' | 'outros'
  bio: string
  avatar: string
  type: 'paid' | 'volunteer'
  rating: number
  reviewsCount: number
  availableSlots: string[]
}

export interface Session {
  id: string
  psychologistId: string
  psychologistName: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled'
  type: 'chat' | 'audio' | 'video'
}

export interface Post {
  id: string
  authorName: string
  authorAvatar?: string
  isAnonymous: boolean
  content: string
  createdAt: string
  likes: number
  comments: Comment[]
}

export interface Comment {
  id: string
  authorName: string
  isAnonymous: boolean
  content: string
  createdAt: string
}

// Current user
export const currentUser: User = {
  id: '1',
  name: 'Maria Silva',
  email: 'maria@email.com',
  plan: 'free',
  sessionsRemaining: 2,
  sessionsTotal: 2,
}

// Psychologists
export const psychologists: Psychologist[] = [
  {
    id: '1',
    name: 'Dra. Ana Carolina',
    specialty: 'Relacionamentos Tóxicos',
    professionalType: 'psicologa',
    bio: 'Especialista em recuperação emocional e autoestima. Mais de 10 anos de experiência ajudando mulheres.',
    avatar: '/avatars/psy-1.jpg',
    type: 'paid',
    rating: 4.9,
    reviewsCount: 127,
    availableSlots: ['09:00', '10:00', '14:00', '15:00', '16:00'],
  },
  {
    id: '2',
    name: 'Dr. Marcos Ribeiro',
    specialty: 'Avaliação Neuropsicológica',
    professionalType: 'neuropsicologo',
    bio: 'Neuropsicólogo com foco em avaliação e reabilitação cognitiva. Especialista em trauma cerebral.',
    avatar: '/avatars/psy-2.jpg',
    type: 'paid',
    rating: 4.8,
    reviewsCount: 89,
    availableSlots: ['08:00', '09:00', '17:00', '18:00'],
  },
  {
    id: '3',
    name: 'Dra. Carla Mendes',
    specialty: 'Ansiedade e Depressão',
    professionalType: 'psicologa',
    bio: 'Psicóloga clínica com foco em terapia cognitivo-comportamental. Atendimento empático.',
    avatar: '/avatars/psy-3.jpg',
    type: 'paid',
    rating: 4.7,
    reviewsCount: 156,
    availableSlots: ['10:00', '11:00', '13:00', '14:00'],
  },
  {
    id: '4',
    name: 'Dra. Diana Oliveira',
    specialty: 'Autoestima',
    professionalType: 'psicologa',
    bio: 'Voluntária universitária apaixonada por ajudar mulheres a redescobrirem seu valor.',
    avatar: '/avatars/psy-4.jpg',
    type: 'volunteer',
    rating: 4.6,
    reviewsCount: 42,
    availableSlots: ['14:00', '15:00', '16:00'],
  },
  {
    id: '5',
    name: 'Dr. Rafael Costa',
    specialty: 'Reabilitação Cognitiva',
    professionalType: 'neuropsicologo',
    bio: 'Neuropsicólogo especialista em reabilitação cognitiva e acompanhamento pós-trauma.',
    avatar: '/avatars/psy-5.jpg',
    type: 'paid',
    rating: 4.9,
    reviewsCount: 203,
    availableSlots: ['08:00', '09:00', '10:00', '11:00'],
  },
  {
    id: '6',
    name: 'Dra. Fernanda Lima',
    specialty: 'Dependência Emocional',
    professionalType: 'psicologa',
    bio: 'Foco em relacionamentos e padrões emocionais. Ajudo você a construir relacionamentos saudáveis.',
    avatar: '/avatars/psy-6.jpg',
    type: 'volunteer',
    rating: 4.5,
    reviewsCount: 67,
    availableSlots: ['13:00', '14:00', '17:00', '18:00'],
  },
  {
    id: '7',
    name: 'Dra. Luciana Alves',
    specialty: 'Arteterapia',
    professionalType: 'outros',
    bio: 'Arteterapeuta especializada em expressão criativa como forma de cura emocional.',
    avatar: '/avatars/psy-7.jpg',
    type: 'volunteer',
    rating: 4.7,
    reviewsCount: 54,
    availableSlots: ['14:00', '15:00', '16:00'],
  },
  {
    id: '8',
    name: 'Dr. Pedro Nascimento',
    specialty: 'Musicoterapia',
    professionalType: 'outros',
    bio: 'Musicoterapeuta com abordagem terapêutica através da música e sons.',
    avatar: '/avatars/psy-8.jpg',
    type: 'paid',
    rating: 4.6,
    reviewsCount: 38,
    availableSlots: ['10:00', '11:00', '15:00'],
  },
]

// Sessions
export const sessions: Session[] = [
  {
    id: '1',
    psychologistId: '1',
    psychologistName: 'Dra. Ana Carolina',
    date: '2026-05-10',
    time: '14:00',
    status: 'scheduled',
    type: 'video',
  },
  {
    id: '2',
    psychologistId: '3',
    psychologistName: 'Dra. Carla Mendes',
    date: '2026-04-28',
    time: '10:00',
    status: 'completed',
    type: 'chat',
  },
  {
    id: '3',
    psychologistId: '2',
    psychologistName: 'Dra. Beatriz Santos',
    date: '2026-04-15',
    time: '17:00',
    status: 'completed',
    type: 'audio',
  },
]

// Community posts
export const posts: Post[] = [
  {
    id: '1',
    authorName: 'Anônima',
    isAnonymous: true,
    content: 'Hoje consegui sair de casa pela primeira vez em semanas. Parece pouco, mas pra mim foi uma grande vitória. Obrigada por todo o apoio daqui.',
    createdAt: '2026-05-05T10:30:00',
    likes: 45,
    comments: [
      {
        id: '1',
        authorName: 'Juliana M.',
        isAnonymous: false,
        content: 'Isso é incrível! Cada passo conta. Estamos com você!',
        createdAt: '2026-05-05T10:45:00',
      },
      {
        id: '2',
        authorName: 'Anônima',
        isAnonymous: true,
        content: 'Você é muito forte. Continue assim!',
        createdAt: '2026-05-05T11:00:00',
      },
    ],
  },
  {
    id: '2',
    authorName: 'Camila R.',
    isAnonymous: false,
    content: 'Depois de 3 meses de terapia aqui, finalmente consegui colocar limites na minha família. Nunca pensei que seria possível. A Dra. Ana Carolina mudou minha vida.',
    createdAt: '2026-05-04T15:20:00',
    likes: 89,
    comments: [
      {
        id: '3',
        authorName: 'Patricia S.',
        isAnonymous: false,
        content: 'A Dra. Ana é maravilhosa mesmo! Feliz por você!',
        createdAt: '2026-05-04T16:00:00',
      },
    ],
  },
  {
    id: '3',
    authorName: 'Anônima',
    isAnonymous: true,
    content: 'Alguém mais tem dificuldade em confiar de novo depois de um relacionamento abusivo? Às vezes sinto que nunca vou conseguir.',
    createdAt: '2026-05-03T20:15:00',
    likes: 67,
    comments: [
      {
        id: '4',
        authorName: 'Renata L.',
        isAnonymous: false,
        content: 'Eu também passei por isso. Leva tempo, mas é possível sim. Seja gentil consigo mesma.',
        createdAt: '2026-05-03T20:30:00',
      },
      {
        id: '5',
        authorName: 'Anônima',
        isAnonymous: true,
        content: 'Você não está sozinha. A terapia ajuda muito nesse processo.',
        createdAt: '2026-05-03T21:00:00',
      },
      {
        id: '6',
        authorName: 'Marina C.',
        isAnonymous: false,
        content: 'Estou há 2 anos nesse processo. Cada dia fica um pouco mais fácil.',
        createdAt: '2026-05-04T08:00:00',
      },
    ],
  },
  {
    id: '4',
    authorName: 'Sofia B.',
    isAnonymous: false,
    content: 'Dica: mantenha um diário de gratidão. No começo parecia bobo, mas agora vejo como minha perspectiva mudou. Recomendo!',
    createdAt: '2026-05-02T14:00:00',
    likes: 112,
    comments: [],
  },
]

// Professional types for filtering
export const professionalTypes = [
  { value: 'todos', label: 'Todos' },
  { value: 'psicologa', label: 'Psicóloga' },
  { value: 'neuropsicologo', label: 'Neuropsicólogo' },
  { value: 'outros', label: 'Outros' },
]

// Plans
export const plans = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    sessions: 2,
    features: [
      '2 sessões por mês',
      'Acesso à comunidade',
      'Psicólogas voluntárias',
      'Suporte por chat',
    ],
  },
  {
    id: 'paid',
    name: 'Premium',
    price: 99.90,
    sessions: 8,
    features: [
      '8 sessões por mês',
      'Acesso à comunidade',
      'Todas as psicólogas',
      'Chat, áudio e vídeo',
      'Prioridade no agendamento',
      'Suporte prioritário',
    ],
    popular: true,
  },
  {
    id: 'social',
    name: 'Social',
    price: 0,
    sessions: 4,
    features: [
      '4 sessões por mês',
      'Acesso à comunidade',
      'Psicólogas voluntárias',
      'Suporte por chat',
      'Requer comprovação',
    ],
  },
]
