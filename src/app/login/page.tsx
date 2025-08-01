'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    username: "",
    password: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user.password && user.username) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  const onSignUp = async () => {
    try {
      setLoading(true)
      const res = await axios.post("/api/users/login", user)
      console.log("login success", res.data)
      router.push('/')
    } catch (err) {
      console.error("Error while login:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-zinc-900 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          className="w-full px-4 py-2 rounded bg-zinc-800 text-white placeholder-gray-400 focus:outline-none"
          type="text"
          placeholder="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <input
          className="w-full px-4 py-2 rounded bg-zinc-800 text-white placeholder-gray-400 focus:outline-none"
          type="password"
          placeholder="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
          onClick={onSignUp}
          disabled={buttonDisabled}
          className={`w-full px-4 py-2 mt-4 rounded ${
            buttonDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "loging up..." : "Login"}
        </button>
      </div>
    </div>
  )
}
