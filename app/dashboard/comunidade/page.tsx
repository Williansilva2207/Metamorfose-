'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
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
  AlertTriangle
} from 'lucide-react'
import { posts as initialPosts, currentUser } from '@/lib/mock-data'
import type { Post, Comment } from '@/lib/mock-data'

export default function ComunidadePage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPost, setNewPost] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [expandedPost, setExpandedPost] = useState<string | null>(null)
  const [newComment, setNewComment] = useState('')
  const [reportingPost, setReportingPost] = useState<string | null>(null)
  const [showReportSuccess, setShowReportSuccess] = useState(false)

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

  return (
    <div className="space-y-6 pt-12 md:pt-0 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Comunidade</h1>
        <p className="text-muted-foreground mt-1">
          Um espaço seguro para compartilhar e se conectar
        </p>
      </div>

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
    </div>
  )
}
