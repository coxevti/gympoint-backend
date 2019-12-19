import * as Yup from 'yup';

export default async (req, res, next) => {
    const schema = Yup.object().shape({
        email: Yup.string()
            .email()
            .required(),
        password: Yup.string().required(),
    });
    try {
        await schema.validate(req.body, { abortEarly: false });
        return next();
    } catch (error) {
        return res
            .status(422)
            .json({ fields: error.errors, message: 'Validation fails' });
    }
};
