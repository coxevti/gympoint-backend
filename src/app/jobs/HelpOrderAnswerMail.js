import Mail from '../../lib/Mail';

class HelpOrderAnswerMail {
    get key() {
        return 'HelpOrderAnswerMail';
    }

    async handle({ data }) {
        const { helpOrder } = data;
        await Mail.sendMail({
            to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
            subject: 'Sua dúvida foi respondida!',
            template: 'helpOrderAnswer',
            context: {
                student: helpOrder.student.name,
                question: helpOrder.question,
                answer: helpOrder.answer,
            },
        });
    }
}

export default new HelpOrderAnswerMail();
