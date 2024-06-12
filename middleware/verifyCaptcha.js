export const verifyCaptcha = async (req,res,next) => {
    console.log(req.body);
    const { captcha } = req.body;
    const settings = {
        method: "POST"
    }

    // if (!captcha) {
    //     const err = new Error("Please verify that you are not Robot");
    //     err.status = 401;
    //     next(err);
    // }

    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY_RECAPTCHA}&response=${captcha}`, settings);

    // console.log(response);

    const data = await response.json();
    console.log(data);

    if (!data.success) {
        const error = new Error(data["error-codes"][0]);
        return next(error);
    }
    

    next();
}