import express from 'express';
import {get,merge} from 'lodash';

import { getUserBySession } from '../db/user';

export const isOwner = async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    try{
        const {id} = req.params;
        const currentId = get(req,'identity._id') as string;

        if(!currentId){
            return res.sendStatus(403);
        }
        if(currentId.toString()!==id){
            return res.sendStatus(403);
        }
        next();
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isAuthenticated = async(req:express.Request,res:express.Response,next:express.NextFunction)=>{

    try{
        const sessionToken = req.cookies['abcd-api'];
        if(!sessionToken){
            return res.sendStatus(403);
        }

        const exisitinguser = await getUserBySession(sessionToken);
        if(!exisitinguser){
            return res.sendStatus(403);
        }
        merge(req,{identity:exisitinguser});
        return next();

    }catch(error){
        console.log(error);
        res.sendStatus(400);
    }
}