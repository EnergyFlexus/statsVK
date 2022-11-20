import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import Main from './Pages/Main';
import Chats from './Pages/Chats';
import FAQ from './Pages/FAQ';	
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import PassReset from './Pages/PassReset';
import Chat from './Pages/Chat';	
import Layout from './Pages/Layout';

const router = createBrowserRouter([
  	{
    	path: "/",
   		element: <Layout/>,
		children: [
			{
				path: "/",
   				element: <Main/>,
			},
			{
				path: "chats",
				element: <Chats/>,
			},
			{
				path: "faq",
				element: <FAQ/>,
			},
			{
				path: "signin",
				element: <SignIn/>,
			},
     		{
    	  		path: "signup",
    	  		element: <SignUp/>,
  	 		},
			{
				path: "pass_reset",
				element: <PassReset/>
			},
			{
				path: "chats/:chatId",
				element: <Chat/>,
			},
		]
  	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
    	<RouterProvider router={router} />
  	</React.StrictMode>
);
