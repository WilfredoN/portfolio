import { useEffect, useState } from 'react'

export const CookieConsent = () => {
  const [accepted, setAccepted] = useState(true)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')

    if (consent) {
      setAccepted(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true')
    setAccepted(true)
  }

  if (accepted) {
    return null
  }

  return (
    <div className='cookie bg-opacity-90 fixed right-0 bottom-0 left-0 z-50 border-t border-gray-300 p-4 text-center'>
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
