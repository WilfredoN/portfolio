import React from 'react'
import { DownloadButton } from '../input/DownloadButton'

interface CapybaraImageProps {
	children?: React.ReactNode
}

export const CapybaraImage = React.memo(({ children }: CapybaraImageProps) => {
	return (
		<div className="flex items-center justify-center max-w-[35rem] relative">
			<DownloadButton pdfUrl="assets/resume.pdf" />
			<div className="flex items-center justify-center select-none overflow-hidden border-2 xl:w-full sm:w-1/2 rounded-full relative">
				<img
					src="assets/capybara_binary.png"
					alt="Capybara image in zeros and ones style"
					className="scale-105 rounded-full"
					draggable="false"
				/>
				{children}
			</div>
		</div>
	)
})
