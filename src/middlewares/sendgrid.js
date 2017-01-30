'use strict'
const ENV = require('../../config/env')
let sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
let helper = require('sendgrid').mail,
    from_email = new helper.Email("poloc1722@hotmail.fr"),
    subject = "Nouveau mot de passe",
    content;

exports.sendgrid = {

    emailIt(user) {      
        let to_email = new helper.Email(`${user.email}`);
        if (user.New) {
            subject = "Bordeux Entrepreuneurs - Nouveau Compte";
            content = new helper.Content("text/plain", `Bonjour ${user.firstname}, \n Vous venez d'être inscris à Bordeaux Entrepreneurs. \n\n Connectez vous avec cette adresse email  ainsi que votre mode de passe : ${user.password} \n\n Lors de votre première connection pensez à changer votre mot de passe dans votre espace profile. \n\n Sincèrement,\n\n Bordeaux Entrepreneurs`);
        } else
            content = new helper.Content("text/plain", `Bonjour ${user.firstname}, \n Suite à votre demande de renouvellement de mot de passe, votre nouveau mot de passe est ${user.password} \n\n Connectez vous avec celui-ci puis pensez à le changer dans votre espace profile. \n\n Sincèrement,\n\n Bordeaux Entrepreneurs`);

        let mail = new helper.Mail(from_email, subject, to_email, content),
            request = sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON()
            });
        sg.API(request, function(error, response) {
            console.log(`Status : ${response.statusCode}`, `Response : ${response.body}`, `Herader : ${response.headers}`)
        })


    }
}
