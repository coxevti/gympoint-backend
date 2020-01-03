import * as Yup from 'yup';

export default async (req, res, next) => {
    const schema = Yup.object().shape({
        title: Yup.string().required(),
        duration: Yup.number().required(),
        price: Yup.number().required(),
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
