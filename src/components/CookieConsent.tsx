import { useEffect, useState } from 'react'

export const CookieConsent = () => {
	const [accepted, setAccepted] = useState(false)

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

	if (accepted) return null

	return (
		<div className="z-50 cookie fixed bottom-0 left-0 right-0 bg-opacity-90 p-4 border-t border-gray-300 text-center">
			<p className="text-lg">
				We are using cookies to enhance your experience. By continuing to visit
				this site you agree to our use of cookies.
			</p>
			<button
				onClick={handleAccept}
				className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
			>
				Accept
			</button>
		</div>
	)
}
