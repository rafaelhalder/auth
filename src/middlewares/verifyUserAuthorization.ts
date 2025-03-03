import { Request,Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { request } from "http";

function verifyUserAuthorization(role: string[]){
  return (request: Request,response: Response, next: NextFunction) => {
    if(!request.user || !role.includes(request.user.role)){
      throw new AppError("Usuário não autorizado!",401);
      }
    return next();
  }
}

export {verifyUserAuthorization}