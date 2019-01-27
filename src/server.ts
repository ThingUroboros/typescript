import * as express from 'express';
import * as fs from 'fs';
import * as url from 'url';
// tslint:disable-next-line:ordered-imports
import * as bodyParser from 'body-parser'; // Přidáno kvůli postu (Data chodí v .body)

import { userModel } from './models/UserModel';
import { userSchema } from './schema/userSchema';

import { User } from './instances/intefaces';

// tslint:disable-next-line:no-implicit-dependencies
import * as Joi from 'joi'; 

import { sequelize } from './instances/sequelize';

const app = express();

// Configure Express to parse incoming JSON data
app.use(express.json()); 

//app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true,
})); 

app.get('/posli', (request, res) => {
    console.log(request);
    const { query } = url.parse(request.url, true);
    
    console.log(query.jmeno);
    console.log(query.prijmeni);
    
    fs.readFile('./form.html', (_, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
});

app.get('/', (_ , res) => {
 
    console.log('------------------');

    fs.readFile('./form.html', (__, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
 });

app.post('/', (req, res) => {
  
    console.log('------------------');
    
    fs.readFile('./form.html', (_, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
    console.log(req.body);
});

app.post('/json', (req, res) => {

    console.log('zpracovávám json');
   
    const jmeno = req.body.jmeno;
    const prijmeni = req.body.prijmeni;
    const heslo = req.body.heslo;
    const datum_narozeni = req.body.datum_narozeni;

    const result = Joi.validate(
        { jmeno, prijmeni , datum_narozeni, heslo: heslo }, userSchema);

    if (result.error === null) {
           
            const test : User = {
                jmeno: req.body.jmeno,
                prijmeni: req.body.prijmeni,
                heslo: req.body.heslom,
                datum_narozeni: req.body.datum_narozeni,
            };
            console.log(test.datum_narozeni);

           /// Uložíme do databáze
            console.log('Kontrola proběhla v pořádku budeme zapisovat do databaze');

            sequelize
            .authenticate()
            .then(() => {
              console.log('Připojeni k DB');
             
              userModel.sync({force: true}).then(() => {
                    return userModel.create({
                    jmeno: test.jmeno,
                    prijmeni: test.prijmeni,
                    heslo: test.heslo,
                    datum_narozeni: test.datum_narozeni,
                    });
                });

              const status: (number | string)[][] = [['status'], [1]];
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(status));
            
            })
            .catch(err => {

              console.error('Unable to connect to the database:', err);
              const status: (number | string)[][] = [['status'], [2]];
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(status));
      
            });

    }
    else {
        const status: (number | string)[][] = [['status'], [0]];
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(status));
    }

    console.log(result);

});

const port : number = 5000;

app.listen(port, () => {

    console.log(`spuštěno na localhost port:  ${port}`);

});
