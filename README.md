<h1 align="left">Sourcemap Service</h1>

service for up-/downloading artifacts

***

## Installation

Clone this repository and run the start script

```bash
$ git clone https://github.com/thomn/sourcemap-service.git
$ cd sourcemap-service
$ npm run start
```

## Endpoints

* GET: `/artifact/[id]`:  -> get artifact by id
* POST: `/artifact/[id]`: -> upload artifact by id
* DELETE: `/artifact/[id]`: -> delete artifact by id
* POST: `/artifact/claim`: -> get artifact id

## Examples

### Uploading

```bash
$ curl -X POST http://localhost:4000/artifact/claim -H "Content-Type: application/json" -d "{\"crc\":\"123321\"}"
// rtf:40iki2Ahud1Ig
$ curl -X POST http://localhost:4000/artifact/rtf:40iki2Ahud1Ig -d @script.js.map
```

### Retrieving

```bash
$curl http://localhost:4000/artifact/rtf:40iki2Ahud1Ig --output script.js.map
```

### Health check

```
curl "http://localhost:80/healthz"
// ok
```
