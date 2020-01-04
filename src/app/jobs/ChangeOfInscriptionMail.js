import { format, parseISO } from 'date-fns';

import Mail from '../../lib/Mail';

class ChangeOfInscriptionMail {
    get key() {
        return 'ChangeOfInscriptionMail';
    }

    async handle({ data }) {
        const { registration, plan } = data;
        await Mail.sendMail({
            to: `${registration.student.name} <${registration.student.email}>`,
            subject: 'Alteração de inscrição',
            template: 'changeOfInscription',
            context: {
                student: registration.student.name,
                planOld: registration.plan.title,
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

export default new ChangeOfInscriptionMail();
