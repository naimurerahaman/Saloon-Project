'use client'

import { useCallback, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, CheckCircle, AlertCircle, X, ImageIcon } from 'lucide-react'
import axios from 'axios'
import { cn } from '@/lib/utils'

// ─── Types ─────────────────────────────────────────────────────────────────

export interface UploadResult {
  url: string
  publicId: string
  width: number
  height: number
  format: string
  bytes: number
}

interface ImageUploadProps {
  /** Cloudinary sub-folder under smart-gents-saloon/ */
  folder?: string
  /** Bearer JWT for admin-protected endpoint */
  authToken?: string
  onUploaded: (result: UploadResult) => void
  onError?: (message: string) => void
  className?: string
  /** If set, shows a small chip label above the zone */
  label?: string
}

type UploadState = 'idle' | 'preview' | 'uploading' | 'success' | 'error'

const ACCEPTED = 'image/jpeg,image/png,image/webp,image/gif,image/avif'
const MAX_BYTES = 10 * 1024 * 1024 // 10 MB

// ─── Component ─────────────────────────────────────────────────────────────

export default function ImageUpload({
  folder = 'gallery',
  authToken,
  onUploaded,
  onError,
  className,
  label,
}: ImageUploadProps) {
  const [state, setState]       = useState<UploadState>('idle')
  const [progress, setProgress] = useState(0)
  const [preview, setPreview]   = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [result, setResult]     = useState<UploadResult | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const reset = () => {
    setState('idle')
    setProgress(0)
    setPreview(null)
    setFileName('')
    setErrorMsg('')
    setResult(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Only image files are accepted.')
      setState('error')
      onError?.('Only image files are accepted.')
      return
    }
    if (file.size > MAX_BYTES) {
      setErrorMsg('File exceeds the 10 MB limit.')
      setState('error')
      onError?.('File exceeds the 10 MB limit.')
      return
    }

    setFileName(file.name)
    setPreview(URL.createObjectURL(file))
    setState('preview')
  }, [onError])

  const handleUpload = useCallback(async () => {
    if (!preview || state !== 'preview') return
    const input = inputRef.current
    if (!input?.files?.[0]) return

    setState('uploading')
    setProgress(0)

    const formData = new FormData()
    formData.append('file', input.files[0])

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/v1/uploads?folder=${encodeURIComponent(folder)}`

    try {
      const res = await axios.post<{ data?: UploadResult } | UploadResult>(
        apiUrl,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          },
          onUploadProgress: (e) => {
            const pct = Math.round((e.loaded * 100) / (e.total ?? 1))
            setProgress(pct)
          },
        },
      )

      // Handle TransformInterceptor wrapper ({ data: ... }) or plain body
      const body = res.data as { data?: UploadResult } | UploadResult
      const uploaded: UploadResult =
        'data' in body && body.data ? body.data : (body as UploadResult)

      setResult(uploaded)
      setState('success')
      onUploaded(uploaded)
    } catch (err: unknown) {
      const msg =
        axios.isAxiosError(err)
          ? (err.response?.data as { message?: string })?.message ?? err.message
          : 'Upload failed. Please try again.'
      setErrorMsg(msg)
      setState('error')
      onError?.(msg)
    }
  }, [preview, state, folder, authToken, onUploaded, onError])

  // ── Drag & drop handlers ──────────────────────────────────────────────────

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const onDragLeave = () => setIsDragging(false)
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      // Sync the hidden input so handleUpload() can read it
      const dt = new DataTransfer()
      dt.items.add(file)
      if (inputRef.current) inputRef.current.files = dt.files
      handleFile(file)
    }
  }
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <p className="text-white/35 text-[10px] tracking-[0.3em] uppercase mb-2">{label}</p>
      )}

      <AnimatePresence mode="wait">
        {/* ── Idle / drag zone ─────────────────────────────────────────── */}
        {state === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              'flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed cursor-pointer transition-all duration-200 select-none',
              isDragging
                ? 'border-gold/60 bg-gold/5'
                : 'border-white/12 hover:border-white/25 hover:bg-white/[0.015]',
            )}
          >
            <div className="w-10 h-10 border border-white/15 flex items-center justify-center">
              <Upload size={16} className="text-white/35" />
            </div>
            <div className="text-center">
              <p className="text-white/55 text-sm">
                Drop an image here, or{' '}
                <span className="text-gold underline underline-offset-2">click to browse</span>
              </p>
              <p className="text-white/20 text-[11px] mt-1">
                JPEG · PNG · WEBP · GIF · AVIF — max 10 MB
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Preview ─────────────────────────────────────────────────── */}
        {state === 'preview' && preview && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="border border-white/10"
          >
            {/* Image preview */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt={fileName}
              className="w-full max-h-64 object-cover"
            />

            {/* Footer bar */}
            <div className="flex items-center justify-between gap-3 p-3 bg-card">
              <div className="min-w-0">
                <p className="text-white/60 text-[11px] truncate">{fileName}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={reset}
                  className="w-7 h-7 border border-white/10 flex items-center justify-center text-white/30 hover:border-white/25 hover:text-white/55 transition-all duration-150"
                  aria-label="Remove"
                >
                  <X size={11} />
                </button>
                <button
                  onClick={handleUpload}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-gold text-background text-[10px] tracking-[0.22em] uppercase font-semibold hover:bg-gold/90 transition-colors duration-150"
                >
                  Upload
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Uploading ────────────────────────────────────────────────── */}
        {state === 'uploading' && preview && (
          <motion.div
            key="uploading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border border-white/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Uploading…"
              className="w-full max-h-64 object-cover opacity-40"
            />
            <div className="p-4 bg-card space-y-2">
              {/* Progress bar */}
              <div className="h-0.5 bg-white/8 overflow-hidden">
                <motion.div
                  className="h-full bg-gold"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' as const }}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-white/35 text-[11px]">Uploading to Cloudinary…</p>
                <span className="text-gold text-[11px] font-medium">{progress}%</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Success ──────────────────────────────────────────────────── */}
        {state === 'success' && result && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border border-gold/20 bg-gold/[0.03]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={result.url} alt="Uploaded" className="w-full max-h-64 object-cover" />

            <div className="p-4 bg-card space-y-2.5">
              <div className="flex items-center gap-2 text-gold">
                <CheckCircle size={13} />
                <span className="text-[11px] tracking-wide font-medium">Upload successful</span>
              </div>
              <div className="space-y-1">
                <div className="flex gap-2 text-[11px]">
                  <span className="text-white/25 w-16 shrink-0">Size</span>
                  <span className="text-white/50">
                    {result.width} × {result.height} · {(result.bytes / 1024).toFixed(0)} KB
                  </span>
                </div>
                <div className="flex gap-2 text-[11px]">
                  <span className="text-white/25 w-16 shrink-0">Format</span>
                  <span className="text-white/50 uppercase">{result.format}</span>
                </div>
                <div className="flex gap-2 text-[11px]">
                  <span className="text-white/25 w-16 shrink-0">Public ID</span>
                  <span className="text-white/40 truncate font-mono">{result.publicId}</span>
                </div>
              </div>
              <button
                onClick={reset}
                className="text-white/30 text-[10px] tracking-[0.22em] uppercase hover:text-white/55 transition-colors duration-150 flex items-center gap-1"
              >
                <ImageIcon size={10} />
                Upload another
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Error ────────────────────────────────────────────────────── */}
        {state === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-3 p-5 border border-red-500/20 bg-red-500/[0.03]"
          >
            <AlertCircle size={15} className="text-red-400/70 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-red-400/80 text-sm">{errorMsg}</p>
            </div>
            <button
              onClick={reset}
              className="shrink-0 text-white/25 hover:text-white/50 transition-colors duration-150"
              aria-label="Dismiss"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        className="sr-only"
        onChange={onInputChange}
      />
    </div>
  )
}
