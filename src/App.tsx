
//node imports
import { useDispatch } from 'react-redux';

//local imports
import Router from './routing/router';
import { theme_color } from "./store/setting/actions";
import SettingAction from './store/setting/actions'

//css
import './App.css';

//scss
import "./assets/scss/hope-ui.scss"
import "./assets/scss/custom.scss"
import "./assets/scss/dark.scss"
import "./assets/scss/rtl.scss"
import "./assets/scss/customizer.scss"
import 'react-toastify/dist/ReactToastify.css';





function App() {
  

  const dispatch = useDispatch();

  const getSetting = sessionStorage.getItem('huisetting-react')

  if(getSetting===null)
  {
    dispatch(SettingAction['theme_scheme']('light'))
    dispatch(theme_color({ value: 'theme-color-blue', colors: {"--{{prefix}}primary": "#015C99","--{{prefix}}info": "#71AD44",} }))
  }
  else
  {
   const data = JSON.parse(sessionStorage.getItem('huisetting-react') || '')
    if(data.setting.theme_scheme.value === 'light')
    {
      dispatch(SettingAction['theme_scheme']('light'))
      dispatch(theme_color({ value: 'theme-color-blue', colors: {"--{{prefix}}primary": "#015C99","--{{prefix}}info": "#71AD44",} }))
    }
  
    else
    {
      dispatch(SettingAction['theme_scheme']('dark'))
      dispatch(theme_color({ value: 'theme-color-blue', colors: {"--{{prefix}}primary": "#71AD44","--{{prefix}}info": "#015C99",} }))
    }
  }




 

  return (
   <Router/>
  );
}

export default App;
