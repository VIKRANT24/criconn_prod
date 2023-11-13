//node imports
import { useEffect, memo, Fragment } from "react";
import { Outlet } from 'react-router-dom';


//local imports
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";
import SubHeader from "../../components/header/subheader";
import SettingOffCanvas from "../../components/theme/SettingOffCanvas";



const Dashboard = memo((props) => {
 // const appName = useSelector(SettingSelector.app_name);
  useEffect(() => { });
  console.log(props)
  return (
    <Fragment>
      {/* <Loader /> */}
      <Sidebar app_name="TennisCricket.in" />
      {/* <Tour /> */}
      <main className="main-content">
        <div className="position-relative">
          <Header />
          <SubHeader />
        </div>
        <div className="py-0 conatiner-fluid content-inner mt-n5">
          <Outlet />
        </div>
        <Footer />
      </main>
      <SettingOffCanvas />
    </Fragment>
  );
});

export default Dashboard;
