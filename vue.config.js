module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'http://39.97.33.178',
				changeOrigin: true,
			},
			'/ajax': {
				target: 'http://m.maoyan.com',
				changeOrigin: true,
			}
		}
	}
}
