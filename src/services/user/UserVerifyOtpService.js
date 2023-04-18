const UserVerifyOtpService = async (Request, DataModel) => {
    // DataModel is the otps model
    try {
        // URL be like, http://localhost:3000/RecoverVerifyOTP/chaudhuree@gmail.com/123456
        let email = Request.params.email;
        let OTPCode = Request.params.otp;
        // default status of the otp is set to 0 in the db
        let status = 0;
        let statusUpdate = 1;
        // if while querying we found status is 0 that means this otp is not been used yet
        // in OTPCount we are checking if otp is valid or not with the status and otp code found in the email
        // if OTPCount is true that means otp is valid and we can update the status of the otp to 1
        // after updating the status to 1 , now if we try to check with the same otp then the OTPCount will be 0 or false. so that means this otp is not valid now


        //Database First Process
        // check with otp and status 0
        let OTPCount = await DataModel.aggregate([{ $match: { email: email, otp: OTPCode, status: status } }, { $count: "total" }])

        // of OTPCount is grater than 0 that means otp is verified
        if (OTPCount.length > 0) {

            // Second Process
            // after verifying otp update the otp model status with statusUpdate
            let OTPUpdate = await DataModel.updateOne({ email: email, otp: OTPCode, status: status }, { email: email, otp: OTPCode, status: statusUpdate })
            return { status: "success", data: OTPUpdate }
            // of updated successfully then in response data.modifycount will be 1

        } else {

            return { status: "fail", data: "Invalid OTP Code" }
        }
    }
    catch (error) {
        return { status: "fail", data: error.toString() }
    }
}
module.exports = UserVerifyOtpService