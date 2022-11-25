import NavigationBar from '../Components/NavigationBar/NavigationBar';
import { Outlet } from 'react-router-dom';
import s from './Layout.module.css'

function Layout() {
	return (
    	<div className={s.main}>
			<NavigationBar/>
			<Outlet/>
	 	</div>
  	);
}

export default Layout;
