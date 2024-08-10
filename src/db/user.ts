import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    authentication:{
        password:{type:String,required:true,select:false},
        salt:{type:String,select:false},
        sessionToken:{type:String,select:false},
    }
})

export const UserModal =mongoose.model('User',Userschema);

export const getUsers = ()=> UserModal.find();
export const getUserbyEmail = (email:string)=> UserModal.findOne({email});
export const getUserBySession = (sessionToken:string)=>UserModal.findOne({
    'authentication.sessionToken':sessionToken,
})
export const getUserbyId = (id:string)=> UserModal.findById(id);
export const CreateUser = (values:Record<string,any>)=> new UserModal(values)
.save().then((user)=>user.toObject());
export const deleteUserById = (id:string)=>UserModal.findOneAndDelete({_id:id});
export const updateUserbyID =(id:string,values:Record<string,any>)=>UserModal.findByIdAndUpdate(id,values);