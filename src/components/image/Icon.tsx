import { memo, useEffect, useMemo, useState } from 'react'

const BASE_URL =
	'https://raw.githubusercontent.com/devicons/devicon/0cb57ede339bb83cb2b3f35bec861dd962c01dea/icons'

interface IconProps {
	iconName: string
	alt?: string
	title?: string
}

const getIconUrl = (iconName: string, variant: 'original' | 'plain') =>
	`${BASE_URL}/${iconName}/${iconName}-${variant}.svg`

export const Icon = memo(({ iconName, alt, title }: IconProps) => {
	const [imageUrl, setImageUrl] = useState<string>()
	const [error, setError] = useState(false)

	const originalUrl = useMemo(
		() => getIconUrl(iconName, 'original'),
		[iconName]
	)

	const plainUrl = useMemo(() => getIconUrl(iconName, 'plain'), [iconName])

	useEffect(() => {
		const checkImage = async () => {
			try {
				const response = await fetch(originalUrl, { method: 'HEAD' })
				setImageUrl(response.ok ? originalUrl : plainUrl)
			} catch {
				setImageUrl(plainUrl)
				setError(true)
				console.error(error)
			}
		}
		checkImage()
	}, [error, originalUrl, plainUrl])

	if (!imageUrl) return null

	return (
		<img
			className="ml-2 w-8 h-8"
			src={imageUrl}
			alt={alt ?? iconName}
			title={title ?? iconName}
			onError={() => setError(true)}
		/>
	)
})

Icon.displayName = 'Icon'
