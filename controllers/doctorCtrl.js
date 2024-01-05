
const appointmentModel = require('../models/appointmentModel');
const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModels');
const getDoctorInfoController = async(req,res)=>{
    try {
        const doctor = await doctorModel.findOne({userId:req.body.userId})
        res.status(200).send({
            success:true,
            message:'doctor data fetch success',
            data:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in fetching Doctor Details',
            error
        })
    }
}

//Update doc profile

const updateProfileController = async(req,res)=>{
    try {
       const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body)
       res.status(200).send({
        success: true,
        message:"Doctor Profile has been updated Successfully",
        data:doctor
       }) 
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Doctor Profile Update Issue',
            error
        })
    }
}

//Get Single Doc Info

const getDoctorByIdController = async(req,res)=>{
    try {
        const doctor =await doctorModel.findOne({_id:req.body.doctorId})
        res.status(200).send({
            success:true,
            message:'Single Doc Info fetch',
            data:doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in fetching doc info',
            error
        })
        
    }
}

//Get Doctor Appointments

const doctorAppointmentsController = async(req,res)=>{
    try {
        const doctor = await doctorModel.findOne({userId:req.body.userId})
        const appointments = await appointmentModel.find({doctorId:doctor._id})
        res.status(200).send({
            success:true,
            message:'Doctor Appointments fetched succesfully',
            data:appointments,
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Doctor Appointments",
            error
        })
        
    }

}

const updateStatusController =async(req,res)=>{
    try {
        const {appointmentsId,status} = req.body
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId,{status})
        const user = await userModel.findOne({_id:appointments.userId})
        const notification = user.notification
        notification.push({
            type:'status updated',
            message:`your Appointment has been updated ${status}`,
            onClickPath:'/doctor-appointments'
        })
        await user.save()
        res.status(200).send({
            success: true,
            message : 'Appointment Status Updated Successfully',
        }) 
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:'Error in updating Status'
        })
        
    }
}

module.exports={getDoctorInfoController,
    updateProfileController,
    getDoctorByIdController,
    doctorAppointmentsController,
    updateStatusController};