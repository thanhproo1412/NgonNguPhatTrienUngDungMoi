// src/hooks/useAuthUser.ts
'use client'

import { useEffect, useState } from 'react'

export interface UserData {
  name: string
  role: string
  avatar: string
}

export function useAuthUser() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      setLoading(false)
      return
    }

    fetch('/api/auth/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Token invalid')
        return res.json()
      })
      .then((data) => {
        setUser({
          name: data.name,
          role: data.role,
          avatar: data.avatar,
        })
      })
      .catch(() => {
        localStorage.removeItem('authToken')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  return { user, setUser, loading }
}
