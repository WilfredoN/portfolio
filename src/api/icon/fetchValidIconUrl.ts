import { getIconUrl } from '../../utils/getIconUrl'

export async function fetchValidIconUrl(
	iconName: string
): Promise<string | undefined> {
	const originalUrl = getIconUrl(iconName, 'original')
	const plainUrl = getIconUrl(iconName, 'plain')

	try {
		const res = await fetch(originalUrl, { method: 'HEAD' })
		if (res.ok) return originalUrl
	} catch (error) {
		console.log(`Error fetching original icon: ${error}`)
	}

	try {
		const res = await fetch(plainUrl, { method: 'HEAD' })
		if (res.ok) return plainUrl
	} catch (error) {
		console.log(`Error fetching plain icon: ${error}`)
	}

	return undefined
}
