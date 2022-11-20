statsVK
=======
Single page application on react & ASP.NET Core

QUICK START
-----------

Requirements:
  
	.NET Core 7+
	MySql 8+
  	nodejs 14+
  	npm
	python 3+ (deployment script)

Run the react-app in the development mode:

	npm start

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

Server build:

	cd server
	dotnet build

React-app build:

	npm run build

Full deployment in 1 script:

	cd react-app 
	npm i (npm dependences)
	cd ../deployment
	python3 deploy.py

