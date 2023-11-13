import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/card/card'
import Alert from '../../../components/toast/toast'
import { ToastContainer } from 'react-toastify';

import { auth } from '../../../services/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { loadingToggleAction } from "../../../store/action/common";
import store from "../../../store/store";
import ApiService from '../../../services/service'
import { API_NAME } from '../../../utils/constants';
import Spinner from '../../../components/loader/loader'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';



const UserAdd = (props) => {

   const [value, setValue] = React.useState('');
   let history = useNavigate();
   const [img, setImg] = React.useState('');
   const [file, setFile] = React.useState();
   const [fileName, setFileName] = React.useState("");

   const createUser = (uid)=>{
     
      store.dispatch(loadingToggleAction(true))

      let params = {
         user_id: uid,
         username: value.username[0],
         password: value.pass[0],
         fullname:value.fullname[0],
         profilepic: img,
         addedBy: sessionStorage.getItem('user_id')
      }

      console.log('Component : User')
      console.log("Request : " + JSON.stringify(params))

      ApiService.postData(API_NAME.ADD_USER,params).then(
         (resData) => {
            store.dispatch(loadingToggleAction(false))
            Alert('00', resData.message)
            setTimeout( history('/home/user'), 6000);
         }
      ).catch((err) => {
         store.dispatch(loadingToggleAction(false))
         Alert('01', err.message)

      });
   }

   const onAddUser = (event)=>{
      event.preventDefault();
      let data = {
         fullname:value.fullname[0],
         username: value.username[0],
         pass: value.pass[0],
         cnpass: value.cnpass[0],
         profilepic: img
      }
      
      if(data.pass!=data.cnpass)
      {
         Alert('01','Confirm password is not matching!!')
         return;
      }
      else
      {
         store.dispatch(loadingToggleAction(true))
         createUserWithEmailAndPassword(auth, data.username, data.pass).then(
            (data) => {

              createUser(data.user.uid) 
              
             
            }
          ).catch((err) => {
            store.dispatch(loadingToggleAction(false))
                Alert('01', err.message)
            console.log('Response: '+JSON.stringify(err))
            console.log('==================================')
          });
      }

     
   }

   
   const handleFileRead = async (e) => {
      const file = e.target.files[0]
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }


   return (
      <>
        <ToastContainer/>
        <Spinner loading={props.showLoading} />
         <div>
            <Row>

               <Col xl="12">
                  <Card>
                     <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                           <h4 className="card-title">New Scorer</h4>
                        </div>
                     </Card.Header>
                     <Card.Body>

                     <Form onSubmit={onAddUser.bind(this)}>
                              <Row>
                              <Col md="6" className="mb-3">
                                    <Form.Label md="6" htmlFor="validationDefault01">Full Name</Form.Label>
                                    <Form.Control type="text"  id="validationDefault01" name="fullname"  onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })}  required/>
                                 </Col>
                              <Col md="6" className="mb-3">
                                    <Form.Label md="6" htmlFor="validationDefault01">Username</Form.Label>
                                    <Form.Control type="email"  id="validationDefault01" name="username"  onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })}  required/>
                                 </Col>
                                 <Col md="6" className="mb-3">
                                    <Form.Label md="6" htmlFor="validationDefault01">New Password</Form.Label>
                                    <Form.Control type="password"  id="validationDefault01" name="pass" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required/>
                                 </Col>
                                 <Col md="6" className="mb-3">
                                    <Form.Label  htmlFor="validationDefault02">Confirm Password</Form.Label>
                                    <Form.Control type="password"  id="validationDefault02" name="cnpass" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required/>
                                 </Col>
                                 <Col md="12" className="mb-3">
                                 <Form.Label className="custom-file-input">Image</Form.Label>
                                 <Form.Control type="file" accept="image/png, image/gif, image/jpeg" onChange={e => handleFileRead(e)}   required />
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

export default connect(mapStateToProps)(UserAdd);