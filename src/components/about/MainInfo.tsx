import { CapybaraImage } from '../image/CapybaraImage'
import { DownloadButton } from '../input/DownloadButton'
import { MainInfoText } from './MainInfoText'
import React from 'react'

export const MainInfo = React.memo(() => {
	return (
		<div className="flex m-0 flex-col items-center justify-center max-w-screen-2xl relative">
			<CapybaraImage>
				<div className="absolute bottom-4 right-4 z-10">
					<DownloadButton pdfUrl="assets/resume.pdf" />
				</div>
			</CapybaraImage>
			<MainInfoText />
		</div>
	)
})
