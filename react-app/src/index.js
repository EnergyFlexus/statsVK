import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import Main from './Pages/Main';
import Chats from './Pages/Chats';
import FAQ from './Pages/FAQ';	
import Auth from './Pages/Auth';	

const router = createBrowserRouter([
  	{
    	path: "/",
   		element: <Main/>,
  	},
  	{
    	path: "/chats",
    	element: <Chats/>,
  	},
	{
    	path: "/faq",
    	element: <FAQ/>,
  	},
	{
    	path: "/auth",
    	element: <Auth/>,
  	}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
    	<RouterProvider router={router} />
  	</React.StrictMode>
);
