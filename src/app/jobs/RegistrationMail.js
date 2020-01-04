import { format, parseISO } from 'date-fns';

import Mail from '../../lib/Mail';

class RegistrationMail {
    get key() {
        return 'RegistrationMail';
    }

    async handle({ data }) {
        const { registration, student, plan } = data;
        await Mail.sendMail({
            to: `${student.name} <${student.email}>`,
            subject: 'Seja bem-vindo ao Gympoint',
            template: 'registration',
            context: {
                student: student.name,
                plan: plan.title,
                start_date: format(
                    parseISO(registration.start_date),
                    'dd/MM/yyyy'
                ),
                end_date: format(parseISO(registration.end_date), 'dd/MM/yyyy'),
                price: (registration.price / 100).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
            },
        });
    }
}

export default new RegistrationMail();
