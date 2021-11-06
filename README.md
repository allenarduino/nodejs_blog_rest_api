# Complete NodeJs Social Blog API

> This is a complete social blog rest api powered by NodeJs and MySQL

## Database Schema

<img
		width="100%"
		alt="Capture 1"
		src="https://github.com/allenarduino/nodejs_blog_rest_api/blob/master/screenshots/screenshot1.png">

## End points:

### User Registration:

```
POST /register
Host:  http://localhost:5000
```

<img
		width="100%"
		alt="Capture 1"
		src="https://github.com/allenarduino/nodejs_blog_rest_api/blob/master/screenshots/screenshot2.png">

<img
		width="100%"
		alt="Capture 1"
		src="https://github.com/allenarduino/nodejs_blog_rest_api/blob/master/screenshots/screenshot3.png">

### User Login/Authentication:

```
POST /login
Host:  http://localhost:5000
```

<img
		width="100%"
		alt="Capture 1"
		src="https://github.com/allenarduino/nodejs_blog_rest_api/blob/master/screenshots/screenshot4.png">

<img
		width="100%"
		alt="Capture 1"
		src="https://github.com/allenarduino/nodejs_blog_rest_api/blob/master/screenshots/screenshot5.png">

<img
		width="100%"
		alt="Capture 1"
		src="https://github.com/allenarduino/nodejs_blog_rest_api/blob/master/screenshots/screenshot6.png">

```
POST /user_profile/<user_id>
headers:{
	 'x-access-token': 'YOUR_JWT_HERE'
}
Host:  http://localhost:5000
```

<img
		width="100%"
		alt="Capture 1"
		src="https://github.com/allenarduino/nodejs_blog_rest_api/blob/master/screenshots/screenshot7.png">
