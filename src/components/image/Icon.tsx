import { memo, useEffect, useMemo, useState } from 'react'

const BASE_URL =
	'https://raw.githubusercontent.com/devicons/devicon/0cb57ede339bb83cb2b3f35bec861dd962c01dea/icons'

const iconUrlCache: Record<string, string> = {}

interface IconProps {
	iconName: string
	alt?: string
	title?: string
	size?: 'medium' | 'large'
}

const getIconUrl = (iconName: string, variant: 'original' | 'plain') =>
	`${BASE_URL}/${iconName}/${iconName}-${variant}.svg`

export const Icon = memo(
	({ iconName, alt, title, size = 'medium' }: IconProps) => {
		const [imageUrl, setImageUrl] = useState<string>(
			iconUrlCache[iconName] || ''
		)
		const [error, setError] = useState(false)

		const originalUrl = useMemo(
			() => getIconUrl(iconName, 'original'),
			[iconName]
		)

		const plainUrl = useMemo(() => getIconUrl(iconName, 'plain'), [iconName])

		useEffect(() => {
			if (iconUrlCache[iconName]) {
				setImageUrl(iconUrlCache[iconName])
				return
			}

			const checkImage = async () => {
				try {
					const response = await fetch(originalUrl, { method: 'HEAD' })
					iconUrlCache[iconName] = response.ok ? originalUrl : plainUrl

					setImageUrl(response.ok ? originalUrl : plainUrl)
				} catch {
					iconUrlCache[iconName] = plainUrl
					setImageUrl(plainUrl)
					setError(true)
					console.error(`Failed to load icon: ${iconName}, error: ${error}`)
				}
			}

			checkImage()
		}, [iconName, originalUrl, plainUrl, error])

		if (!imageUrl) return null

		return (
			<img
				className={`ml-2 ${size == 'medium' ? 'w-8 h-8' : 'w-12 h-12'}`}
				src={imageUrl}
				alt={alt ?? iconName}
				title={title ?? iconName}
				onError={() => setError(true)}
			/>
		)
	}
)
