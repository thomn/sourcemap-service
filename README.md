<h1 align="left">Sourcemap Service</h1>

microservice for providing versioned sourcemaps

***

## Installation
Clone this repository and run the start script

```bash
$ git clone https://github.com/thomn/sourcemap-service.git
$ cd sourcemap-service
$ npm run start
```

## Endpoints
* GET: `/sm`:  -> retrival
* POST: `/sm`: -> upload
* DELETE: `/sm`: -> removal

## QueryParameters
* `v` (mandatory): version, only integer values 
* `n` (mandatory): name, only alphanummeric values except `.-_` 

## Examples
`post` a map by a POST requesrt
```bash
curl -v -X POST -H "Content-Type: application/json" -d @styles.css.map "http://localhost:80/sm?v=2&n=styles.map"
```

`get` a map by a GET requesrt
```
http://localhost:80/sm?v=8&n=foo.js.map
```

`delete` a map by a DELETE request  
```
http://localhost:80/sm?v=8&n=foo.js.map
```
