statsVK
=======
Single page application on react & ASP.NET Core

QUICK START
-----------

Requirements:
  
	.NET Core 6+
  	nodejs 14+
  	npm

Run the app in the development mode:

	npm start

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


Build react-app:

	cd react-app
	npm run build
	
Replace files
	
	react-app/build -> server/wwwroot

Build & run ASP.NET Core:

 	cd server
  	dotnet run
