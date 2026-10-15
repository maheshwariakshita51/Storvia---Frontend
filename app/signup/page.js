"use client"

import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import styles from './signup.module.css'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: "", email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post("http://localhost:8100/api/", form)
      alert(res.data.message)
      if (res.data.status) {
        router.push("/login")
      }
    } catch (error) {
      console.error(error)
      alert("Signup Failed")
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.badge}>Get Started</span>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Enter your details below to join</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Full Name</label>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Sign Up
          </button>
        </form>

        <div className={styles.footer}>
          <span>Already have an account?</span>
          <button 
            type="button" 
            className={styles.loginBtn} 
            onClick={() => router.push("/login")}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  )
}