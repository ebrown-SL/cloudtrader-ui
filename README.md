# cloudtrader-ui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Install mock server dependencies:

```bash
cd e2e/mock-server
npm i
```

Run the mock server (from cloudtrader UI directory):

```bash
npm run mock:server
```

Execute the end-to-end tests via [Protractor](http://www.protractortest.org/):

```bash
ng e2e
#OR
npm run e2e
```

To run the development server using the mock server proxy settings:

```bash
ng start:proxy
#OR
npm run start:proxy
```

## Running with docker

Build the image

`docker build . -t cloudtrader-ui:latest`

Start the container

`docker run -p 9000:80 cloudtrader-ui:latest`

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
