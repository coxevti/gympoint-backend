import Bee from 'bee-queue';
import RegistrationMail from '../app/jobs/RegistrationMail';
import ChangeOfInscriptionMail from '../app/jobs/ChangeOfInscriptionMail';
import HelpOrderAnswerMail from '../app/jobs/HelpOrderAnswerMail';
import redisConfig from '../config/redis';

const jobs = [RegistrationMail, ChangeOfInscriptionMail, HelpOrderAnswerMail];

class Queue {
    constructor() {
        this.queues = {};
        this.init();
    }

    init() {
        jobs.forEach(({ key, handle }) => {
            this.queues[key] = {
                bee: new Bee(key, { redis: redisConfig }),
                handle,
            };
        });
    }

    add(queue, job) {
        return this.queues[queue].bee.createJob(job).save();
    }

    processQueue() {
        jobs.forEach(job => {
            const { bee, handle } = this.queues[job.key];
            bee.process(handle);
        });
    }
}

export default new Queue();
