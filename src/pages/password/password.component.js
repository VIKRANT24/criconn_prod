import React from 'react'
import {Row,Col,Form,Button} from 'react-bootstrap'
import Card from '../../components/card/card'
import store from "../../store/store";
import ApiService from '../../services/service'
import Alert from '../../components/toast/toast'
import { ToastContainer } from 'react-toastify';
import { API_NAME } from '../../utils/constants';
import Spinner from '../../components/loader/loader'
import { connect } from 'react-redux'
import { loadingToggleAction } from "../../store/action/common";




const ResetPassword = (props)=>{
   const [value, setValue] = React.useState('');

   const onResetPassword =(event)=>{
      event.preventDefault();
      let data = value
      if(data.newpass[0]!=data.cnpass[0])
      {
         Alert('01','Confirm password is not matching!!')
         return;
      }
      store.dispatch(loadingToggleAction(true))
      let params = {
         user_id: sessionStorage.getItem('user_uid'),
         password: value.newpass[0]
      }

      console.log('Component : Reset Password')
      console.log("Request : " + JSON.stringify(params))

      ApiService.postData(API_NAME.RESET_PASSWORD,params).then(
         (resData) => {
            if(resData.statusCode==0)
            {
               store.dispatch(loadingToggleAction(false))
               Alert('00', resData.message)
            }
            else
            {
               store.dispatch(loadingToggleAction(false))
               Alert('01', resData.message)

            }
            

         }
      ).catch((err) => {
         store.dispatch(loadingToggleAction(false))
         Alert('01', err.message)

      });
   }
    return(
        <>
        <ToastContainer/>
        <Spinner loading={props.showLoading} />
          <div>
              <Row>
                
                 <Col xl="12">
                    <Card>
                       <Card.Header className="d-flex justify-content-between">
                          <div className="header-title">
                             <h4 className="card-title">New Password</h4>
                          </div>
                       </Card.Header>
                       <Card.Body>
                       <Form onSubmit={onResetPassword.bind(this)}>
                              <Row>
                                 <Col md="6" className="mb-3">
                                    <Form.Label md="6" htmlFor="validationDefault01">New Password</Form.Label>
                                    <Form.Control type="text" name="newpass" id="validationDefault01" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required/>
                                 </Col>
                                 <Col md="6" className="mb-3">
                                    <Form.Label  htmlFor="validationDefault02">Confirm Password</Form.Label>
                                    <Form.Control type="text" name="cnpass"  id="validationDefault02" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required/>
                                 </Col>
                              </Row>
                              <Form.Group>
                                 <Button variant="btn btn-primary" style={{float:'right'}} type="submit">Register</Button>
                              </Form.Group>
                           </Form>
                       </Card.Body>
                    </Card>
                 </Col>
              </Row>
           </div>
        </>
    )
}

const mapStateToProps = (state) => {
   return {
      showLoading: state.auth.showLoading
   }
}

export default connect(mapStateToProps)(ResetPassword);