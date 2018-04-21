### QuickStart

1. Clone repository

```bash
$ git clone https://github.com/marcosvieiraftw/node-pokemon-battle.git
```

2. Install node dependences.

```bash
$ npm install
```

3. Run application

```bash
$ npm run start
```

4. Access http://localhost:3000

### Generate APIDocs

1. Install apiDoc

```bash
$ npm install apidoc -g
```

2. Run bin to generate API documentation

```bash
$ apidoc -i ./app/api/v1/business -o docs
```

3. Access docs folder generated on app root and open index.html with any browser.


### Access heroku

1. App deployed to Heroku in: https://mysterious-journey-83432.herokuapp.com


### Integration test

1. There`s a integration test as example. To run, you must raise server in some instance:
```bash
$ npm run start
```

2. And then in another instance, run (I`ve made test dependent of another instance to total simulate a integration):
```bash
$ npm test
```