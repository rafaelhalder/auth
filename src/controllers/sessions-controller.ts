import { Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import {authConfig} from '@/configs/auth'
import {sign} from 'jsonwebtoken'

class SessionsController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body
    const fakeUser = {
      id: "1",
      username: "admin",
      password: "admin",
      role: "customer",
    }

    if (username !== fakeUser.username || password !== fakeUser.password) {
      throw new AppError("Username ou senha incorreta!", 401)
    }

    const {secret, expiresIn} = authConfig.jwt

    const token = sign({
      role: fakeUser.role,
    }, secret, {
      subject: String(fakeUser.id),
      expiresIn,
    })

    return response.json({ token })
  }
}

export { SessionsController }
