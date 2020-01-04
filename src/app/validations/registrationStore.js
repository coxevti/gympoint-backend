import * as Yup from 'yup';

export default async (req, res, next) => {
    const schema = Yup.object().shape({
        student_id: Yup.number().required(),
        plan_id: Yup.number().required(),
        start_date: Yup.number().required(),
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
