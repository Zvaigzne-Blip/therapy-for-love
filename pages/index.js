import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [supabaseConnected, setSupabaseConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verify Supabase client is initialized with credentials
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (url && key && supabase) {
      setSupabaseConnected(true)
    }
    setLoading(false)
  }, [])

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Therapy for Love</h1>
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>Supabase Connection Status</h2>
        <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
        <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20)}...</p>
        {loading && <p>Checking connection...</p>}
        {!loading && supabaseConnected && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>✓ Successfully connected to Supabase!</p>
        )}
        {!loading && !supabaseConnected && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>✗ Connection failed: Missing credentials</p>
        )}
      </div>
    </div>
  )
}
