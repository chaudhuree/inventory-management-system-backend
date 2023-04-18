const OTPSModel = require("../../models/Users/OTPSModel");

// after checking the emaill in UserVerifyEmail and verifying the otp in UserVerifyOtp
// now here the users passowrd change request is granted

const UserResetPassService = async (Request, DataModel) => {
    // everyting is coming here from body
    let email = Request.body['email'];
    let OTPCode = Request.body['OTP'];
    let NewPass = Request.body['password'];
    let statusUpdate = 1;

    try {
        // Database First Process
        // checking with the email and otp there has any data found in the OTPS model which status is 1 or not. if 1 then proceed to change password
        let OTPUsedCount = await OTPSModel.aggregate([{ $match: { email: email, otp: OTPCode, status: statusUpdate } }, { $count: "total" }])

        if (OTPUsedCount.length > 0) {
            // Database Second Process
            let PassUpdate = await DataModel.updateOne({ email: email }, { password: NewPass })
            return { status: "success", data: PassUpdate }
        }

        else {
            return { status: "fail", data: "Invalid Request" }
        }
    }


    catch (error) {
        return { status: "fail", data: error.toString() }
    }
}
module.exports = UserResetPassService