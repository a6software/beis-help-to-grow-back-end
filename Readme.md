# Help To Grow Back End

BEIS Help to Grow Back End codebase.

## TL;DR

- `make install`
- `make serve`
- Go to [localhost:4001](http://localhost:4001)

See the `docs` subdirectory for help with specific tasks.

## Pre-requisites

- [NodeJS v14](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## NodeJS

This project uses:

* Node v14 LTS
* `npm v6.x`

### Dependencies

You will need to install the dependencies locally, even though we're using
Docker Compose to run locally.

The easiest way to do that is to run `make install`, which will cycle through
every folder and install npm dependencies.

## Running

> Docker and Docker Compose are both very well documented. Please check their
> documentation for advice on running it in development.

To run the development stack, you can run this in Docker Compose. The following `make` command will
start the project:

```
make serve
```

Then go to [localhost:4001](http://localhost:4001).

To stop all services:

```
make down
```
