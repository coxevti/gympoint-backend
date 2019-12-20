import * as Yup from 'yup';

export default async (req, res, next) => {
    const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string().when('password', (password, field) =>
            password ? field.required() : field
        ),
        password: Yup.string().min(8),
        confirmPassword: Yup.string().when('password', (password, field) =>
            password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
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
