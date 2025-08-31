
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

export default function Login(): JSX.Element {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string,string> | null>(null)
  const [loading, setLoading] = useState(false)
  const [pwVisible, setPwVisible] = useState(false)
  const statusRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  const announce = (msg: string) => {
    if (statusRef.current) statusRef.current.textContent = msg
  }

  const validate = () => {
    const next: Record<string,string> = {}
    if (!username.trim()) next.username = 'Username is required.'
    if (!password.trim()) next.password = 'Password is required.'
    setErrors(Object.keys(next).length ? next : null)
    if (Object.keys(next).length) announce('Please fix the highlighted fields.')
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    announce('Attempting login…')
    setTimeout(() => {
      setLoading(false)
      announce('Logged in (mock).')
      navigate('/app')
    }, 900)
  }

  const togglePassword = () => setPwVisible(v => !v)
  const onProvider = (label: string) => announce(`${label} selected. (Mock)`)

  return (
    <main className={styles.authWrapper} aria-labelledby="loginTitle">
      <div className={styles.container}>
        <header className={styles.authHeader}>
          <div className={styles.brandMark} aria-hidden>
            <svg width="46" height="30" viewBox="0 0 46 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M23 0L33 6.5L23 13L13 6.5L23 0Z" fill="currentColor"/>
              <path d="M13 13L23 19.5L33 13L23 6.5L13 13Z" fill="currentColor" opacity="0.9"/>
            </svg>
          </div>
          <h1 id="loginTitle" className={styles.authTitle}>RelaxRefresh Partners</h1>
          <p className={styles.authSubtitle}>Login to manage your stalls</p>
        </header>

        <section className={styles.authCard} aria-labelledby="cardTitle">
          <form className={styles.formBody} autoComplete="on" noValidate aria-describedby="formStatus" onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label htmlFor="username" className={styles.fieldLabel}>Username</label>
              <div className={styles.inputWrapper}>
                <input id="username" name="username" type="text" placeholder="Enter your username" required autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} aria-invalid={errors?.username ? 'true' : undefined} />
              </div>
              {errors?.username && <p className={styles.fieldError}>{errors.username}</p>}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.fieldLabel}>Password</label>
              <div className={styles.inputWrapper}>
                <input id="password" name="password" type={pwVisible ? 'text' : 'password'} placeholder="Enter your password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} aria-invalid={errors?.password ? 'true' : undefined} />
                <button type="button" className={styles.pwToggle} aria-label={pwVisible ? 'Hide password' : 'Show password'} aria-pressed={pwVisible} onClick={togglePassword}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
              <div className={styles.forgotRow}>
                <a href="#" className={styles.forgotLink}>Forgot password?</a>
              </div>
              {errors?.password && <p className={styles.fieldError}>{errors.password}</p>}
            </div>

            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={loading} aria-disabled={loading}>
              {loading ? 'Logging in…' : 'Login'}
            </button>

            <div className={styles.divider} role="separator" aria-label="Or continue with">Or continue with</div>

            <div className={styles.providerRow} role="group" aria-label="Other login providers">
              <button type="button" className={`${styles.providerBtn} ${styles.google}`} aria-label="Continue with Google" onClick={() => onProvider('Google')}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 11.1v2.9h6.9c-.2 1.5-.75 2.6-1.6 3.5-1 1-2.6 2.1-5.3 2.1-4.2 0-7.5-3.4-7.5-7.6 0-4.2 3.3-7.6 7.5-7.6 2.3 0 3.9.9 5.1 2l2.1-2.1C17.9 3 15.3 1.8 12 1.8 6.3 1.8 1.8 6.3 1.8 12S6.3 22.2 12 22.2c3.6 0 6.1-1.2 7.9-3 2-2.1 2.6-5 2.6-7.3 0-.7 0-1.2-.1-1.7H12z"/></svg>
              </button>
              <button type="button" className={`${styles.providerBtn} ${styles.facebook}`} aria-label="Continue with Facebook" onClick={() => onProvider('Facebook')}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.35 2 1.87 6.48 1.87 12.07c0 4.99 3.66 9.13 8.47 9.94v-7.03H8.9v-2.9h1.44V9.41c0-1.42.85-2.2 2.1-2.2.61 0 1.25.1 1.25.1v1.37h-.7c-.69 0-.9.42-.9.85v1.02h1.54l-.25 2.9h-1.29V22c4.81-.81 8.47-4.95 8.47-9.93z"/></svg>
              </button>
              <button type="button" className={`${styles.providerBtn} ${styles.apple}`} aria-label="Continue with Apple" onClick={() => onProvider('Apple')}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.2 2.6c-.9.1-2 .6-2.6 1.3-.6.7-1.1 1.8-.9 2.8 1 .1 2-.5 2.6-1.2.6-.7 1.1-1.8.9-2.9zM20.7 17.2c-.5 1.1-.8 1.6-1.5 2.5-.9 1.2-2.1 2.7-3.6 2.7-1.3 0-1.6-.8-3.3-.8-1.7 0-2 .8-3.3.8-1.5 0-2.6-1.3-3.5-2.5-2.4-3.1-2.7-6.7-1.2-8.6 1-1.3 2.5-2 3.9-2 1.5 0 2.5.8 3.8.8 1.2 0 1.9-.8 3.8-.8 1.3 0 2.8.7 3.8 2 .6.7.9 1.4 1.1 2.2-2.1.8-2.4 3.8-.1 4.7z"/></svg>
              </button>
            </div>

            <div id="formStatus" ref={statusRef} className="visually-hidden" aria-live="polite"></div>
          </form>
        </section>

        <p className={styles.authFooterText}>Don't have an account? <a href="#" className={styles.signUpLink}>Sign up</a></p>
      </div>
    </main>
  )
}
