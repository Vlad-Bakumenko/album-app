export const verifyCaptcha = async (req,res,next) => {
    const { captcha } = req.body;
    const settings = {
        method: "POST"
    }

    if (!captcha) {
        const err = new Error("Are you Robot? Please try again");
        next(err);
    }

    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY_RECAPTCHA}&response=${captcha}`, settings);

    const data = await response.json();

    if (!data.success) {
        const error = new Error(data["error-codes"][0]);
        return next(error);
    }
    
    next();
}