# Allisn

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

##Deployment
- Docker version 1.13 or higher
- Docker Compose: included in Docker Desktop for Mac and Docker Desktop for Windows. Linux systems require direct install. Pre Windows 10 systems without Hyper-V use Docker Toolbox.
- Heroku CLI version 7.22.7

Deploy using Heroku
```shell
git clone https://github.com/cos301-2019-se/Botic
cd allisn

heroku login
heroku container:login

docker build -t registry.heroku.com/botic-frontend/web .
docker push registry.heroku.com/botic-frontend/web

heroku container:release web --app botic-frontend
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
