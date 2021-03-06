const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partial');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

if(port === 3000) {
    app.use((req, res, next) =>{
        var log = `${new Date().toString()}: ${req.method} ${req.url}`;
        console.log(log);
        fs.appendFileSync('server.log', log + '\n', (err) => {
            console.log('Unable to append server log');
        });
        next();
    });
}


// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
//   });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to my website'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});


app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/banner', (req, res) => {
    res.render('banner.hbs', {
        pageTitle: 'Banner Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill this request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
}); 