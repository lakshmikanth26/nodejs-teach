export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
  
    if (!env.VITE_APP_BASE_URL) {
      process.env.VITE_APP_BASE_URL = ''
    }
    const PORT = env.VITE_PORT ?? '10000'
  
    const noMock = env.VITE_ENV === 'development' && env.VITE_NOMOCK === 'true'
    const prod = env.VITE_ENV === 'production'
    const proxys = resolveProxys(noMock, env)
    return {
      plugins: [
        vue2(),
        htmlPlugin(loadEnv(mode, process.cwd(), '')),
        legacy({
          targets: ['ie >= 11'],
          additionalLegacyPolyfills: ['regenerator-runtime/runtime']
        }),
        istanbul(),
        createHtmlPlugin({
          template: 'index.html',
          publicPath: '',
          inject: {
            data: {
              NODE_ENV: prod ? '"production"' : '"development"'
            }
          }
        })
      ],
      server: {
        host: 'localhost',
        port: PORT,
        proxy: proxys
      }
    }
  })
  