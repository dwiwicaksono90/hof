const CronJob = require('cron').CronJob;
const User = require('../models/user')
const Thread = require('../models/thread')
const sgMail = require('@sendgrid/mail');
require('dotenv').config()

module.exports = { 
    reportDaily: function() {
        Thread.find()
            .populate('author')
            .exec()
            .then((result) => {
                // console.log(result);
        new CronJob('0 10 * * *', function() {
            Thread.find()
            .populate('author')
            .exec()
            .then((result) => {
                result.forEach(data => {
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    const msg = {
                            to: data.author.email,
                            from: 'dwiw1909@gmail.com',
                            subject: 'hacktiv OverFlow Dailly Report',
                            text: `Your Thread ${data.title} have ${data.answers.length} answers, ${data.upVotes.length} people Like and ${data.downVotes.length} dislike your post, let Check it out https://hacktivho.firebaseapp.com/thread/${data._id}`,
                            html: `<p>Your Thread ${data.title} have ${data.answers.length} answers, ${data.upVotes.length} people Like and ${data.downVotes.length} dislike your post, let Check it out https://hacktivho.firebaseapp.com/thread/${data._id}</p>`,
                        };
                    sgMail.send(msg);
                    console.log('cron daily report active');
                    }).catch((err) => {
                        console.log(err);
                    });
                })
            //     console.log(result);
                //kirim email ke result.author.email
                // Your Thread (result.title) have (result.answers.length) answers, (result.upVotes.length) people Like and result.downVotes.length) dislike your post
                // console.log(`Your Thread ${result.title} have ${result.answers.length} answers, ${result.upVotes.length} people Like and ${result.downVotes.length} dislike your post, let Check it out https://hacktivho.firebaseapp.com/thread/${idThread}`);
                //send mail
                // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                // const msg = {
                //     to: result.author.email,
                //     from: 'dwiw1909@gmail.com',
                //     subject: 'hacktiv OverFlow Dailly Report',
                //     text: `Your Thread ${result.title} have ${result.answers.length} answers, ${result.upVotes.length} people Like and ${result.downVotes.length} dislike your post, let Check it out https://hacktivho.firebaseapp.com/thread/${idThread}`,
                //     html: `<p>Your Thread ${result.title} have ${result.answers.length} answers, ${result.upVotes.length} people Like and ${result.downVotes.length} dislike your post, let Check it out https://hacktivho.firebaseapp.com/thread/${idThread}</p>`,
                // };
                // sgMail.send(msg);
                //     }).catch((err) => {
                //         console.log(err);
                //     });
            }, null, true, 'Asia/Jakarta');
        })
    }

}


