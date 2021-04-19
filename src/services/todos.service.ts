import { HttpService } from './http.service'
import { HTTPMethod } from '../core/config/constants'

class TodosService {
   private baseUrl = 'https://todo-app-rn-28a1e-default-rtdb.firebaseio.com/'
   private urlSuffix = 'todos.json'

   async get(): Promise<Array<{[key: string]: { title: string }}> | []> {
      try {
         const data = HttpService.request({
            url: this.baseUrl + this.urlSuffix,
            method: HTTPMethod.GET
         })
         return data
      } catch (error) {
         console.error(error)
         throw error
      }
   }

   async post(payload: { title: string }): Promise<{ name: string } | undefined> {
      try {
         const data = await HttpService.request({
            url: this.baseUrl + this.urlSuffix,
            method: HTTPMethod.POST,
            payload
         })
         return data
      } catch (error) {
         console.error(error)
         throw error
      }
   }

   async patch(id: string, payload: { title: string }): Promise<{ name: string } | undefined> {
      try {
         const data = await HttpService.request({
            url: `${this.baseUrl}todos/${id}.json`,
            method: HTTPMethod.PATCH,
            payload
         })
         return data
      } catch (error) {
         console.error(error)
         throw error
      }
   }

   async delete(id: string): Promise<{ name: string } | undefined> {
      try {
         const data = await HttpService.request({
            url: `${this.baseUrl}todos/${id}.json`,
            method: HTTPMethod.DELETE
         })
         return data
      } catch (error) {
         console.error(error)
         throw error
      }
   }
}

export const todosService = new TodosService()