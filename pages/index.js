import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [supabaseConnected, setSupabaseConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check Supabase connection
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (url && key && supabase) {
      setSupabaseConnected(true)
    }

    // Check if user is logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    checkUser()
  }, [])

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Navigation */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>💚 Therapy for Love</h1>
        <div style={{ display: 'flex', gap: '15px' }}>
          {user ? (
            <>
              <span style={{ color: '#666' }}>Welcome, {user.email}</span>
              <a href="/dashboard" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 'bold' }}>Dashboard</a>
            </>
          ) : (
            <>
              <a href="/login" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 'bold' }}>Sign In</a>
              <a href="/register" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 'bold', background: '#667eea', color: 'white', padding: '8px 16px', borderRadius: '6px' }}>Sign Up</a>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Welcome to Therapy for Love</h2>
        <p style={{ fontSize: '16px', color: '#666' }}>A compassionate platform providing support and resources for individuals seeking relationship advice and emotional well-being.</p>
      </div>

      {/* Supabase Status */}
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '30px' }}>
        <h3>System Status</h3>
        <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
        <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20)}...</p>
        {!loading && supabaseConnected && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>✓ Successfully connected to Supabase!</p>
        )}
      </div>

      {/* Features */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
          <h3>📚 Articles</h3>
          <p>Read expert-written articles on relationships and mental health.</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
          <h3>💬 Community Forum</h3>
          <p>Connect with others and share your experiences in our safe community.</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
          <h3>🎯 Personalized Advice</h3>
          <p>Get tailored guidance based on your specific relationship goals.</p>
        </div>
      </div>

      {/* CTA */}
      {!user && (
        <div style={{ textAlign: 'center', marginTop: '40px', padding: '30px', background: '#f5f5f5', borderRadius: '8px' }}>
          <h3>Ready to start your journey?</h3>
          <a href="/register" style={{ display: 'inline-block', background: '#667eea', color: 'white', padding: '12px 30px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', marginTop: '10px' }}>
            Create Account
          </a>
        </div>
      )}
    </div>
  )
}
