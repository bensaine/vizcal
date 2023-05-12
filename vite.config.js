import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
	resolve: {
		alias: {
			'@renderer': resolve('src/renderer/src')
		}
	},
	server: {
		host: true
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: [resolve(__dirname, 'src/renderer/src/test.js')],
		css: {
			include: [/.+/],
			modules: {
				classNameStrategy: 'non-scoped'
			}
		}
	},
	plugins: [react()],
	build: {
		rollupOptions: {
			input: {
				index: resolve(__dirname, 'src/renderer/index.html')
			}
		}
	}
})
