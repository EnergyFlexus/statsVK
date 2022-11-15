import NavigationBar from '../Components/NavigationBar/NavigationBar';
import { Outlet } from 'react-router-dom';

function Layout() {
	return (
    	<div>
			<NavigationBar/>
			<Outlet/>
	 	</div>
  	);
}

export default Layout;
