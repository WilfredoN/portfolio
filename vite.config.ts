import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
	plugins: [
		react(),
		viteStaticCopy({
			targets: [
				{
					src: 'assets/*',
					dest: 'assets/'
				},
				{
					src: '.well-known/*',
					dest: '.well-known/'
				},
				{
					src: 'public/*',
					dest: 'assets/'
				}
			]
		})
	]
})
