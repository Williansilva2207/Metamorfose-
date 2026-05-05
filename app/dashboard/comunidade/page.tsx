'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { 
  Heart, 
  MessageCircle, 
  Flag, 
  User, 
  EyeOff, 
  Send,
  AlertTriangle,
  Users,
  Mail,
  ArrowLeft,
  Circle
} from 'lucide-react'
import { 
  posts as initialPosts, 
  currentUser, 
  conversations as initialConversations,
  communityMembers 
} from '@/lib/mock-data'
import type { Post, Comment, Conversation, PrivateMessage } from '@/lib/mock-data'

export default function ComunidadePage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPost, setNewPost] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [expandedPost, setExpandedPost] = useState<string | null>(null)
  const [newComment, setNewComment] = useState('')
  const [reportingPost, setReportingPost] = useState<string | null>(null)
  const [showReportSuccess, setShowReportSuccess] = useState(false)
  
  // Private messaging state
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [showNewMessageModal, setShowNewMessageModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const [initialMessage, setInitialMessage] = useState('')

  const handleSubmitPost = () => {
    if (!newPost.trim()) return

    const post: Post = {
      id: Date.now().toString(),
      authorName: isAnonymous ? 'Anônima' : currentUser.name,
      isAnonymous,
      content: newPost,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    }

    setPosts([post, ...posts])
    setNewPost('')
  }

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ))
  }

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      authorName: isAnonymous ? 'Anônima' : currentUser.name,
      isAnonymous,
      content: newComment,
      createdAt: new Date().toISOString(),
    }

    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ))
    setNewComment('')
  }

  const handleReport = () => {
    setReportingPost(null)
    setShowReportSuccess(true)
    setTimeout(() => setShowReportSuccess(false), 3000)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: PrivateMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      content: newMessage,
      createdAt: new Date().toISOString(),
      read: true,
    }

    setConversations(conversations.map(conv =>
      conv.id === selectedConversation.id
        ? { 
            ...conv, 
            messages: [...conv.messages, message],
            lastMessageAt: new Date().toISOString(),
          }
        : conv
    ))

    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
      lastMessageAt: new Date().toISOString(),
    })

    setNewMessage('')
  }

  const handleStartNewConversation = () => {
    if (!selectedMember || !initialMessage.trim()) return

    const member = communityMembers.find(m => m.id === selectedMember)
    if (!member) return

    const newConversation: Conversation = {
      id: Date.now().toString(),
      participantId: member.id,
      participantName: member.name,
      isParticipantAnonymous: member.isAnonymous,
      messages: [
        {
          id: Date.now().toString(),
          senderId: currentUser.id,
          content: initialMessage,
          createdAt: new Date().toISOString(),
          read: true,
        }
      ],
      lastMessageAt: new Date().toISOString(),
      unreadCount: 0,
    }

    setConversations([newConversation, ...conversations])
    setShowNewMessageModal(false)
    setSelectedMember(null)
    setInitialMessage('')
    setSelectedConversation(newConversation)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (hours < 1) return 'Agora mesmo'
    if (hours < 24) return `${hours}h atrás`
    if (days < 7) return `${days}d atrás`
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  }

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  const totalUnread = conversations.reduce((acc, conv) => acc + conv.unreadCount, 0)

  // Available members to message (not already in conversation)
  const availableMembers = communityMembers.filter(
    member => !conversations.some(conv => conv.participantId === member.id)
  )

  return (
    <div className="space-y-6 pt-12 md:pt-0 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Comunidade</h1>
        <p className="text-muted-foreground mt-1">
          Um espaço seguro para compartilhar e se conectar
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="forum" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="forum" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Fórum</span>
          </TabsTrigger>
          <TabsTrigger value="mensagens" className="flex items-center gap-2 relative">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Mensagens</span>
            {totalUnread > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {totalUnread}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="contatos" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Contatos</span>
          </TabsTrigger>
        </TabsList>

        {/* Forum Tab */}
        <TabsContent value="forum" className="space-y-4">
          {/* New Post Card */}
          <Card className="bg-card">
            <CardContent className="p-6">
              <Textarea
                placeholder="Compartilhe seus pensamentos, conquistas ou peça apoio..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px] resize-none bg-input"
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Switch
                    id="anonymous"
                    checked={isAnonymous}
                    onCheckedChange={setIsAnonymous}
                  />
                  <Label htmlFor="anonymous" className="text-sm text-muted-foreground flex items-center gap-1 cursor-pointer">
                    <EyeOff className="h-4 w-4" />
                    Postar anonimamente
                  </Label>
                </div>
                <Button onClick={handleSubmitPost} disabled={!newPost.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Publicar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Success notification */}
          {showReportSuccess && (
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-4 flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <p className="text-sm text-foreground">
                  Denúncia enviada. Nossa equipe irá analisar o conteúdo.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="bg-card">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        {post.isAnonymous ? (
                          <EyeOff className="h-5 w-5 text-primary" />
                        ) : (
                          <User className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{post.authorName}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => setReportingPost(post.id)}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments.length}
                    </Button>
                  </div>

                  {/* Comments Section */}
                  {expandedPost === post.id && (
                    <div className="mt-4 pt-4 border-t border-border space-y-4">
                      {/* Existing Comments */}
                      {post.comments.length > 0 && (
                        <div className="space-y-3">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3 p-3 bg-secondary/50 rounded-lg">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                {comment.isAnonymous ? (
                                  <EyeOff className="h-4 w-4 text-primary" />
                                ) : (
                                  <User className="h-4 w-4 text-primary" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-medium text-foreground">
                                    {comment.authorName}
                                  </p>
                                  <span className="text-xs text-muted-foreground">
                                    {formatDate(comment.createdAt)}
                                  </span>
                                </div>
                                <p className="text-sm text-foreground mt-1">
                                  {comment.content}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Comment */}
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Escreva um comentário de apoio..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-[60px] resize-none bg-input"
                        />
                        <Button
                          size="icon"
                          onClick={() => handleAddComment(post.id)}
                          disabled={!newComment.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="mensagens" className="space-y-4">
          {selectedConversation ? (
            // Chat View
            <Card className="bg-card">
              <CardHeader className="border-b border-border">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedConversation(null)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    {selectedConversation.isParticipantAnonymous ? (
                      <EyeOff className="h-5 w-5 text-primary" />
                    ) : (
                      <User className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{selectedConversation.participantName}</p>
                    <p className="text-xs text-muted-foreground">Online agora</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Messages */}
                <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.senderId === currentUser.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === currentUser.id 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {formatMessageTime(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="bg-input"
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Conversations List
            <>
              <div className="flex justify-end">
                <Button onClick={() => setShowNewMessageModal(true)}>
                  <Mail className="h-4 w-4 mr-2" />
                  Nova Mensagem
                </Button>
              </div>

              {conversations.length === 0 ? (
                <Card className="bg-card">
                  <CardContent className="p-8 text-center">
                    <Mail className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">Nenhuma conversa ainda</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Inicie uma conversa com outra mulher da comunidade
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-2">
                  {conversations.map((conv) => (
                    <Card 
                      key={conv.id} 
                      className="bg-card cursor-pointer hover:bg-secondary/50 transition-colors"
                      onClick={() => {
                        setSelectedConversation(conv)
                        // Mark as read
                        setConversations(conversations.map(c =>
                          c.id === conv.id ? { ...c, unreadCount: 0 } : c
                        ))
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                              {conv.isParticipantAnonymous ? (
                                <EyeOff className="h-6 w-6 text-primary" />
                              ) : (
                                <User className="h-6 w-6 text-primary" />
                              )}
                            </div>
                            {conv.unreadCount > 0 && (
                              <Circle className="absolute -top-1 -right-1 h-4 w-4 fill-primary text-primary" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-foreground">{conv.participantName}</p>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(conv.lastMessageAt)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {conv.messages[conv.messages.length - 1]?.content}
                            </p>
                          </div>
                          {conv.unreadCount > 0 && (
                            <Badge className="h-5 min-w-5 p-0 flex items-center justify-center">
                              {conv.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>

        {/* Contacts Tab */}
        <TabsContent value="contatos" className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Mulheres que você já conversou ou pode iniciar uma conversa
          </p>

          <div className="space-y-2">
            {communityMembers.map((member) => {
              const existingConv = conversations.find(c => c.participantId === member.id)
              
              return (
                <Card key={member.id} className="bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                        {member.isAnonymous ? (
                          <EyeOff className="h-6 w-6 text-primary" />
                        ) : (
                          <User className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">{member.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{member.bio}</p>
                      </div>
                      {existingConv ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedConversation(existingConv)}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Ver conversa
                        </Button>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => {
                            setSelectedMember(member.id)
                            setShowNewMessageModal(true)
                          }}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Enviar mensagem
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Report Modal */}
      <Dialog open={!!reportingPost} onOpenChange={(open) => !open && setReportingPost(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Denunciar Conteúdo</DialogTitle>
            <DialogDescription>
              Este conteúdo viola as regras da comunidade?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Nossa equipe irá analisar a denúncia e tomar as medidas necessárias. 
              Sua identidade será mantida em sigilo.
            </p>
            <Textarea
              placeholder="Descreva o motivo da denúncia (opcional)"
              className="min-h-[80px] resize-none bg-input"
            />
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setReportingPost(null)}>
                Cancelar
              </Button>
              <Button variant="destructive" className="flex-1" onClick={handleReport}>
                Denunciar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Message Modal */}
      <Dialog open={showNewMessageModal} onOpenChange={setShowNewMessageModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Nova Mensagem</DialogTitle>
            <DialogDescription>
              Inicie uma conversa privada com outra mulher da comunidade
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedMember ? (
              <>
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {communityMembers.find(m => m.id === selectedMember)?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {communityMembers.find(m => m.id === selectedMember)?.bio}
                    </p>
                  </div>
                </div>
                <Textarea
                  placeholder="Escreva sua primeira mensagem..."
                  value={initialMessage}
                  onChange={(e) => setInitialMessage(e.target.value)}
                  className="min-h-[100px] resize-none bg-input"
                />
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    onClick={() => {
                      setSelectedMember(null)
                      setInitialMessage('')
                    }}
                  >
                    Voltar
                  </Button>
                  <Button 
                    className="flex-1" 
                    onClick={handleStartNewConversation}
                    disabled={!initialMessage.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Enviar
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {availableMembers.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Você já tem conversa com todas as mulheres disponíveis
                  </p>
                ) : (
                  availableMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                      onClick={() => setSelectedMember(member.id)}
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{member.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{member.bio}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
