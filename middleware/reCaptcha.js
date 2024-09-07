const express = require('express');
const fetch = require('isomorphic-fetch');

// Parse JSON
app.use(express.urlencoded({extended: true}))
app.use(express.json())

module.exports = {
 // reCaptcha v3
    handleSend: (req, res, onSubmit, next) => {
    const secret_key = '6LfkPjUqAAAAACHF6-MR0CI2laPal_TJpQJSNNDK';
    const token = req.body.token;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
  
    fetch(url, {
        method: 'post'
    })
        .then(response => response.json())
        .then(google_response => res.json({ google_response }))
        .catch(error => res.json({ error }));

    return next();
  },
}