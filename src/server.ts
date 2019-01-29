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

app.get('/send', (request, res) => {
    console.log(request);
    const { query } = url.parse(request.url, true);
    
    console.log(query.name);
    console.log(query.surname);
    
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

    const user : User = {
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
        birthDate: req.body.birthDate,
    };

    console.log(user.birthDate);

    const result = Joi.validate(
        { name: user.name, surname: user.surname , birthDate: user.birthDate, password: user.password }, userSchema);

    if (result.error === null) {           
           
            sequelize
            .authenticate()
            .then(() => {
              console.log('Connection DB');
             
              userModel.sync({force: true}).then(() => {
                    return userModel.create({
                    name: user.name,
                    surname: user.surname,
                    password: user.password,
                    birthDate: user.birthDate,
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

    console.log(`Start aplication on localhost port:  ${port}`);

});
