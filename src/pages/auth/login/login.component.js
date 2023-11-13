//node imports
import React, { useState } from 'react'
import { Row, Col, Image, Form, Button, } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../../components/card/card'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import { signInWithEmailAndPassword } from "firebase/auth";

//local imports
import loginService from './login.service'
import Spinner from '../../../components/loader/loader'
import { auth } from '../../../services/firebase'
import Alert from '../../../components/toast/toast'
import { loadingToggleAction } from "../../../store/action/common";
import store from "../../../store/store";
import ApiService from '../../../services/service'
import { API_NAME } from '../../../utils/constants';

//local images
import auth1 from '../../../assets/images/auth/login.jpg'
import logo from '../../../assets/images/logo/logo.png'

//local css
import './login.scss'



const Login = (props) => {

   const [value, setValue] = useState('');
   let history = useNavigate()

   const onLogin = (event) => {

      event.preventDefault();
      let data = {
         email: value.email[0],
         password: value.password[0],
      }
      console.log('Component : Login')
      console.log("Request : " + JSON.stringify(data))

     // loginService.LoginApi(data)

      store.dispatch(loadingToggleAction(true))
      signInWithEmailAndPassword(auth, data.email, data.password).then(
        (data) => {
          console.log('Response: '+JSON.stringify(data))
          Alert('00', 'Login successful.')
          store.dispatch(loadingToggleAction(false))
          
          console.log('==================================')
          //window.location.href = 'http://criconn.tenniscricket.in/home/dashboard';

         //history('/home/dashboard')
         
          getRole(data.user.uid)

        }
      ).catch((err) => {
        console.log('Response: '+JSON.stringify(err))
        Alert('01', 'Bad user credentials.')
        store.dispatch(loadingToggleAction(false))
        console.log('==================================')
      });

      const getRole = (data)=>{
         let req = {
            id:data
         }
         ApiService.postData(API_NAME.GET_ROLE,req).then(
             (resData) => {
 
                 if (resData.statusCode === '00') {
                     store.dispatch(loadingToggleAction(false))
                     sessionStorage.setItem('user_id',resData.data[0].id)
                     sessionStorage.setItem('user_role',resData.data[0].role)
                     sessionStorage.setItem('user_uid',resData.data[0].user_id)
                     sessionStorage.setItem('user_name',resData.data[0].username)
                     sessionStorage.setItem('user_state',resData.data[0].userstate)
                     sessionStorage.setItem('full_name',resData.data[0].full_name)
                     sessionStorage.setItem('mobile_no',resData.data[0].mobile_no)
                     sessionStorage.setItem('profile_pic',resData.data[0].filename)
                     history('/home/dashboard')
                 }
                 else {
                     store.dispatch(loadingToggleAction(false))
                    // Alert('01', resData.message)
                     console.log('==================================')
                     history('/home/dashboard')
                 }
 
 
             }
         ).catch((err) => {
             store.dispatch(loadingToggleAction(false))
             Alert('01', err.message)
             console.log('==================================')
 
         });
 
      }
  
     

   }

   return (
      <>
         <ToastContainer />
         <Spinner loading={props.showLoading} />
         <section className="login-content" >
            <Row className="m-0 align-items-center bg-white vh-100 bgcolor">
               <Col md="6">
                  <Row className="justify-content-center">
                     <Col md="10">
                        <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card cardborder">
                           <Card.Body>
                              <Link to="/home/dashboard" className="navbar-brand d-flex align-items-center mb-5">

                                 <Image src={logo} height="50px" width="50px" alt="images" />
                                 <h4 className="logo-title ms-3" >TennisCricket.in</h4>
                              </Link>
                              <Form onSubmit={onLogin.bind(this)}>
                                 <Row>
                                    <Col md="12" className="mb-3 form-group">
                                       <Form.Floating className=" mb-3">
                                          <Form.Control type="email" className="" id="email" name="email" placeholder="name@example.com" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
                                          <Form.Label htmlFor="floatingInput">Email</Form.Label>
                                       </Form.Floating>
                                    </Col>
                                    <Col md="12" className="mb-3 form-group">
                                       <Form.Floating className=" mb-3">
                                          <Form.Control type="password" className="" id="password" name="password" placeholder="name@example.com" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
                                          <Form.Label htmlFor="floatingInput">Password</Form.Label>
                                       </Form.Floating>
                                    </Col>
                                    <Col lg="12" className="d-flex justify-content-between">
                                       <Form.Check className="form-check mb-3" style={{visibility:'hidden'}} >
                                          <Form.Check.Input type="checkbox" id="customCheck1"/>
                                          <Form.Check.Label htmlFor="customCheck1">Remember Me</Form.Check.Label>
                                       </Form.Check>
                                       <Link to="/auth/recoverpw">Forgot Password?</Link>
                                    </Col>
                                 </Row>
                                 <Form.Group className="d-flex justify-content-center">
                                    <Button variant="btn btn-primary" type="submit" >Submit form</Button>
                                 </Form.Group>
                              </Form>

                           </Card.Body>
                        </Card>
                     </Col>
                  </Row>
               </Col>
               <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden bgrt_img">
                  <Image src={auth1} className="Image-fluid gradient-main animated-scaleX bgrt_img" alt="images" />
               </Col>

            </Row>
         </section>
      </>
   )
}


const mapStateToProps = (state) => {
   return {
      showLoading: state.auth.showLoading
   }
}

export default connect(mapStateToProps)(Login);