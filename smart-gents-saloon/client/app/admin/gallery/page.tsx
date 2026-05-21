'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Lock, Eye } from 'lucide-react'
import ImageUpload, { type UploadResult } from '@/components/ui/ImageUpload'
import { GALLERY_CATEGORIES, type GalleryCategory } from '@/lib/gallery'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils'

// ─── Types ─────────────────────────────────────────────────────────────────

interface GalleryItem {
  id: string
  url: string
  publicId: string
  caption?: string | null
  category?: string | null
}

// ─── Helpers ───────────────────────────────────────────────────────────────

const API = process.env.NEXT_PUBLIC_API_URL ?? ''

async function apiFetch<T>(
  path: string,
  options: RequestInit,
  token: string,
): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers ?? {}),
    },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { message?: string }).message ?? `HTTP ${res.status}`)
  }
  const data = await res.json()
  return (data.data ?? data) as T
}

// ─── Auth gate ─────────────────────────────────────────────────────────────

function AuthGate({ onToken }: { onToken: (t: string) => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = value.trim()
    if (!token) { setError('Paste your admin JWT token'); return }
    try {
      await apiFetch('/api/v1/gallery', { method: 'GET' }, token)
      onToken(token)
    } catch {
      setError('Token rejected — make sure you are signed in as ADMIN')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8">
          <Lock size={14} className="text-gold" />
          <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Admin Access</span>
        </div>
        <h1 className="font-serif text-2xl text-white mb-6">Gallery Manager</h1>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="jwt" className="block text-white/35 text-[10px] tracking-[0.25em] uppercase mb-2">
              Admin JWT Token
            </label>
            <input
              id="jwt"
              type="password"
              value={value}
              onChange={(e) => { setValue(e.target.value); setError('') }}
              placeholder="eyJhbGci…"
              className="w-full bg-card border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-gold/50 font-mono placeholder:text-white/15"
            />
            {error && <p className="mt-2 text-red-400/70 text-[11px]">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gold text-background text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-gold/90 transition-colors duration-200"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Gallery manager ────────────────────────────────────────────────────────

function GalleryManager({ token }: { token: string }) {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Upload result held until saved
  const [pending, setPending] = useState<UploadResult | null>(null)
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState<GalleryCategory>(GALLERY_CATEGORIES[1])
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const loadItems = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await apiFetch<GalleryItem[]>('/api/v1/gallery', { method: 'GET' }, token)
      setItems(Array.isArray(data) ? data : [])
      setLoaded(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load gallery')
    } finally {
      setLoading(false)
    }
  }, [token])

  // Load on first render
  useState(() => { loadItems() })

  const handleUploaded = (result: UploadResult) => {
    setPending(result)
    setCaption('')
  }

  const handleSave = async () => {
    if (!pending) return
    setSaving(true)
    try {
      await apiFetch('/api/v1/gallery', {
        method: 'POST',
        body: JSON.stringify({
          url:      pending.url,
          publicId: pending.publicId,
          caption:  caption.trim() || undefined,
          category: category !== 'All' ? category : undefined,
        }),
      }, token)
      setPending(null)
      setCaption('')
      await loadItems()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeleteId(id)
    try {
      await apiFetch(`/api/v1/gallery/${id}`, { method: 'DELETE' }, token)
      setItems((prev) => prev.filter((i) => i.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    } finally {
      setDeleteId(null)
    }
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-6 bg-gold/45" />
              <span className="text-gold text-[9px] tracking-[0.4em] uppercase">Admin</span>
            </div>
            <h1 className="font-serif text-3xl text-white">Gallery Manager</h1>
          </div>
          <a
            href="/gallery"
            target="_blank"
            className="flex items-center gap-1.5 text-white/30 text-[10px] tracking-[0.22em] uppercase hover:text-white/55 transition-colors duration-200"
          >
            <Eye size={11} />
            View Public Gallery
          </a>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 border border-red-500/20 bg-red-500/[0.03] text-red-400/70 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          {/* Upload panel */}
          <div className="space-y-5">
            <p className="text-white/35 text-[10px] tracking-[0.3em] uppercase">
              <Plus size={10} className="inline mr-1.5" />
              Upload New Image
            </p>

            <ImageUpload
              folder="gallery"
              authToken={token}
              onUploaded={handleUploaded}
              onError={setError}
            />

            {/* Save form — appears after successful upload */}
            <AnimatePresence>
              {pending && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4 pt-4 border-t border-white/[0.06]"
                >
                  <div>
                    <label className="block text-white/35 text-[10px] tracking-[0.25em] uppercase mb-2">
                      Caption <span className="text-white/18">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="e.g. Classic Taper Fade"
                      className="w-full bg-card border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-gold/50 placeholder:text-white/18"
                    />
                  </div>

                  <div>
                    <label className="block text-white/35 text-[10px] tracking-[0.25em] uppercase mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as GalleryCategory)}
                      className="w-full bg-card border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-gold/50 appearance-none"
                    >
                      {GALLERY_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full py-3 bg-gold text-background text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-gold/90 transition-colors duration-200 disabled:opacity-60"
                  >
                    {saving ? 'Saving…' : 'Save to Gallery'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Live preview of pending upload */}
          <div>
            <p className="text-white/35 text-[10px] tracking-[0.3em] uppercase mb-4">
              Current Gallery
              {loaded && (
                <span className="ml-2 text-white/20">({items.length} images)</span>
              )}
            </p>

            {loading && (
              <div className="text-white/25 text-sm">Loading…</div>
            )}

            {loaded && items.length === 0 && (
              <p className="text-white/20 text-sm">No images yet. Upload one to get started.</p>
            )}

            {/* Grid of existing images */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="group relative aspect-square overflow-hidden bg-card"
                  >
                    <Image
                      src={item.url}
                      alt={item.caption ?? 'Gallery image'}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/55 transition-colors duration-200 flex items-center justify-center">
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deleteId === item.id}
                        className={cn(
                          'w-8 h-8 border flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100',
                          deleteId === item.id
                            ? 'border-white/20 text-white/30 cursor-wait'
                            : 'border-red-500/40 text-red-400/70 hover:border-red-500/70 hover:text-red-400',
                        )}
                        aria-label="Delete image"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    {/* Caption chip */}
                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <p className="text-white/60 text-[9px] tracking-wide truncate">{item.caption}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function AdminGalleryPage() {
  const [token, setToken] = useState<string | null>(null)

  if (!token) return <AuthGate onToken={setToken} />
  return <GalleryManager token={token} />
}
