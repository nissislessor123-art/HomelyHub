//receive the user info
//validate user info
//send the info to ai planner
//calucate buject per night
//search mangodb fron suitable properties
//send booth ai trip plan matvhing properties back to the frontend user

import {Property} from "../Models/propertyModel.js"
import {planTrip} from "../ai/tripPlanner.js"
import { generateDescription } from "../ai/generateDescription.js"

const cleanCity = (text)=> text.toLowerCase().replaceAll(" ","")
const createTripPlan = async(req,res)=>{ //run frontend call the backend
    try{
       const{destination,budget,days,people,interests}=req.body
       if(!destination || !budget ||!days ||!people){
        return res.status(404).json({
            status:"fail",
            message:"please fill in proper details"
        })
       }
       const plan = await planTrip({
        destination,
        budget,
        days,
        people,
        interests: interests ||[]
       });

       const perNight = Number(budget)/Number(days);
       const city= cleanCity(destination);
       const properties = await Property.find({
           $or:[
            {"address.city":city},
            {"address.state":city},
            {"address.area":city}
           ],
           price:{$lte: perNight},
           maximumGuest:{$gte:Number(people)},
       }).limit(6);
        res.status(200).json({
           status:"success",
           data:{plan,properties,perNight} })      


    }catch(error){
      res.status(500).json({
        status:"fail",
        message:"could not create a trip plan,please try again"
      })
    }
}

const writeDescription = async(req,res)=>{
   try{
   
    const description= await generateDescription(req.body);
    res.status(200).json({status:"success",data:{description}})
}catch(error){
     res.status(500).json({
        status:"fail",
        message:"could not generate,please try again"})
}}
export {createTripPlan,writeDescription};