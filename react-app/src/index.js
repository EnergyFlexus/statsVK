import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import Main from './Components/Main';
import Chats from './Components/Chats';
import FAQ from './Components/FAQ';	

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
  	}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
    	<RouterProvider router={router} />
  	</React.StrictMode>
);