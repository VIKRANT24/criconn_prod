//node imports
import { signInWithEmailAndPassword } from "firebase/auth";

//local imports
import { auth } from '../../../services/firebase'
import Alert from '../../../components/toast/toast'
import { loadingToggleAction } from "../../../store/action/common";
import store from "../../../store/store";




class LoginService {
  LoginApi = (params) => {
    store.dispatch(loadingToggleAction(true))
    signInWithEmailAndPassword(auth, params.email, params.password).then(
      (data) => {
        console.log('Response: '+JSON.stringify(data))
        Alert('00', 'Login successful.')
        store.dispatch(loadingToggleAction(false))
        sessionStorage.setItem('user_uid',data.user.uid)
        console.log('==================================')
        window.location.href = 'http://criconn.tenniscricket.in/home/dashboard';
      }
    ).catch((err) => {
      console.log('Response: '+JSON.stringify(err))
      Alert('01', 'Bad user credentials.')
      store.dispatch(loadingToggleAction(false))
      console.log('==================================')
    });



  }

}


export default new LoginService();