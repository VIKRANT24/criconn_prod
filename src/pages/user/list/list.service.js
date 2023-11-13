import Alert from '../../../components/toast/toast'
import { loadingToggleAction } from "../../../store/action/common";
import store from "../../../store/store";
import ApiService  from '../../../services/service'
import { API_NAME } from '../../../utils/constants';



class UserListService {
    GetUserApi = () => {
        store.dispatch(loadingToggleAction(true))
        ApiService.getData(API_NAME.USER).then(
            (data) => {
                store.dispatch(loadingToggleAction(false))
                Alert('00', 'Data fetched successfully.')
                console.log('==================================')
                return data;
            }
        ).catch((err) => {
            store.dispatch(loadingToggleAction(false))
            Alert('01', err.message)
            console.log('==================================')

        });

      }



}

export default new UserListService();