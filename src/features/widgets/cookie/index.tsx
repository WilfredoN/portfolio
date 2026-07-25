import { useEffect, useState } from 'react'

export const CookieConsent = () => {
  const [isChecking, setIsChecking] = useState(true)
  const [accepted, setAccepted] = useState(() => {
    try {
      return Boolean(localStorage.getItem('cookieConsent'))
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookieConsent')
      if (consent) {
        setAccepted(true)
      }
    } catch {
    } finally {
      setIsChecking(false)
    }
  }, [])

  const handleAccept = () => {
    try {
      localStorage.setItem('cookieConsent', 'true')
    } catch {}
    setAccepted(true)
  }

  if (isChecking || accepted) {
    return null
  }

  return (
    <div className='fixed right-0 bottom-0 left-0 z-50 border-t border-gray-300 bg-(--color-nav)/90 p-4 text-center'>
      <p className='text-lg'>
        We are using cookies to enhance your experience. By continuing to visit
        this site you agree to our use of cookies.
      </p>
      <button
        className='mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500'
        onClick={handleAccept}
      >
        Accept
      </button>
    </div>
  )
}
