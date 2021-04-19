import { HTTPMethod } from '../core/config/constants'

export class HttpService {
   static async request(options: {
      url: string
      method: HTTPMethod
      payload?: Object
      timeout?: number
   }): Promise<any | undefined> {
      const requestParams: RequestInit = {
         method: options.method,
         headers: {
            'Content-Type': 'application/json'
         }
      }

      if (options.payload) {
         requestParams.body = JSON.stringify(options.payload)
      }

      try {
         const response = options.timeout
            ? await this.fetchWithTimeout(options.url, requestParams, options.timeout) as Response
            : await fetch(options.url, requestParams)

         if (response.ok || response.status === 200 || response.statusText === 'OK') {
            return await response.json()
         }
         return response
      } catch (error) {
         console.error(error)
         throw error
      }
   }

   static fetchWithTimeout = (url: string, params: RequestInit = {}, timeout: number) => {
      if (params.signal) {
          throw new Error('Signal not supported')
      }
      const controller = new AbortController()
      const { signal } = controller
      
      return new Promise((resolve, reject) => {
         const timer = setTimeout(() => {
            controller.abort()
         }, timeout)

         fetch(url, { signal, ...params })
            .then(response => {
               if (response.status !== 200) {
                  return response.text().then((text) => {
                     reject()
                  })
               }
               return response.json()
            })
            .then(resolve, reject)
            .finally(() => clearTimeout(timer))
      })
  }
}