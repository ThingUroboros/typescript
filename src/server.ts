import * as fs from 'fs';
// tslint:disable-next-line:no-implicit-dependencies
import * as Joi from 'joi'; 
import * as url from 'url';
import { app } from './class/app';
import { User } from './interfaces/user';
// tslint:disable-next-line:ordered-imports
import { sequelize } from './instances/sequelize';
import { userModel } from './models/UserModel';
import { userSchema } from './schema/userSchema';

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
  
    const user : User = {
        jmeno: req.body.jmeno,
        prijmeni: req.body.prijmeni,
        heslo: req.body.heslo,
        datum_narozeni: req.body.datum_narozeni,
    };

    const result = Joi.validate(
        { jmeno: user.jmeno, prijmeni: user.prijmeni , datum_narozeni: user.datum_narozeni, heslo: user.heslo }, userSchema);

    if (result.error === null) {           
           /// Uložíme do databáze
            console.log('Kontrola proběhla v pořádku budeme zapisovat do databaze');

            sequelize
            .authenticate()
            .then(() => {
              console.log('Připojeni k DB');
             
              userModel.sync({force: true}).then(() => {
                    return userModel.create({
                    jmeno: user.jmeno,
                    prijmeni: user.prijmeni,
                    heslo: user.heslo,
                    datum_narozeni: user.datum_narozeni,
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
