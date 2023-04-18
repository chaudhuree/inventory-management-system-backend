//aikhane DataModel er sathe OTPSModel er kaj korte hobe tai alada kore import kore newa hoyeche.

const OTPSModel = require("../../models/Users/OTPSModel");
const SendEmailUtility = require("../../utility/SendEmailUtility");

const UserVerifyEmailService = async (Request, DataModel) => {
    try {
        // URL be like, http://localhost:3000//RecoverVerifyEmail/chaudhuree@gmail.com
        // Email Account Query
        let email = Request.params.email; // Get Email from URL Parameter(req.params.email) 
        //generate random 6 digit number for OTP
        let OTPCode = Math.floor(100000 + Math.random() * 900000)

        // Database First process
        //check any user exist with this email
        let UserCount = await DataModel.aggregate([{ $match: { email: email } }, { $count: "total" }])
        //or
        //let UserCount= await Datamodel.find({email: email})

        if (UserCount.length > 0) {
            // OTP Insert

            // Database Second process
            // after getting user count, if user exist then insert OTP in OTPSModel
            await OTPSModel.create({ email: email, otp: OTPCode })

            // Email Send
            // send email to user with OTP
            let SendEmail = await SendEmailUtility(email, "Your PIN Code is= " + OTPCode, "Inventory PIN Verification")

            return { status: "success", data: SendEmail }
        }
        else {
            return { status: "fail", data: "No User Found" }
        }
    } catch (error) {

        return { status: "fail", data: error.toString() }
    }
}
module.exports = UserVerifyEmailService