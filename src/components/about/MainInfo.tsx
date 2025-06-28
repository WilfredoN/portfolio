import React from 'react'
import { CapybaraImage } from '../image/CapybaraImage'
import { MainInfoText } from './MainInfoText'

export const MainInfo = React.memo(() => {
	return (
		<div className="flex m-0 flex-col items-center justify-center max-w-screen-2xl relative">
			<CapybaraImage />
			<MainInfoText />
		</div>
	)
})
