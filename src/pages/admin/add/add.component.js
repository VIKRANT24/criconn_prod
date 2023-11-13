import React from 'react'
import {Row,Col,Form,Button} from 'react-bootstrap'
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
import Select from 'react-select';



const AdminAdd = (props)=>{

  const [value, setValue] = React.useState('');
  const [file, setFile] = React.useState();
   const [fileName, setFileName] = React.useState("");
  let history = useNavigate();

  const getPermission=(event)=>{
   console.log(event)
  }

  const createAdmin = (uid)=>{
     
   store.dispatch(loadingToggleAction(true))

   let dataArray = []
   selectedOptions.forEach(element => {
      dataArray.push(element.value)
   });
   console.log(dataArray)



   let params = {
      user_id: uid,
      username: value.username[0],
      password: value.pass[0],
      full_name:value.fullname[0],
      mobile_no:value.mobile[0],
      permissions:dataArray.join(),
      filename:value.mobile[0]+'.png'

   }

   console.log('Component : SubAdmin')
   console.log("Request : " + JSON.stringify(params))

   ApiService.postData(API_NAME.ADD_SUB_ADMIN,params).then(
      (resData) => {
         store.dispatch(loadingToggleAction(false))
         Alert('00', resData.message)
         // history('/home/admin');
         setTimeout( history('/home/admin'), 6000);
        
         if(file!='')
         uploadProfile()

      }
   ).catch((err) => {
      store.dispatch(loadingToggleAction(false))
      Alert('01', err.message)

   });
}

  const  onAddAdmin = (event)=>{
   event.preventDefault();
   console.log(selectedOptions)

   if(selectedOptions.length===0)
   {
      Alert('01','Please select permissions')
      return;
   }


 
   let data = {
      username: value.username[0],
      pass: value.pass[0],
      cnpass: value.cnpass[0],
      fullname:value.fullname[0],
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

            createAdmin(data.user.uid) 
           
          
         }
       ).catch((err) => {
         store.dispatch(loadingToggleAction(false))
         Alert('01',err.message)
         console.log('Response: '+JSON.stringify(err))
         console.log('==================================')
       });
   }

   }
   const [selectedOptions, setSelectedOptions] = React.useState([]);

   const handleChange = (options) => {
     setSelectedOptions(options);
   };

   const options = [
      { value: 'create', label: 'Create' },
      { value: 'update', label: 'Update' },
      { value: 'viewtournament', label: 'View Tournament' },
      { value: 'mytournaments', label: 'My Tournaments' },
      { value: 'deletetournament', label: 'Delete Tournament' },
      { value: 'registeruser', label: 'Register User' },
      { value: 'userlist', label: 'User List' },
      { value: 'createsubadmin', label: 'Create Subadmin' },
      { value: 'viewallsubadmins', label: 'View All Subadmins' },
      { value: 'resetpassword', label: 'Reset Password' },
      { value: 'addplayers', label: 'Add Players' },
      { value: 'viewplayers', label: 'View Players' },
      { value: 'assignuser', label: 'Assign User' },
      { value: 'deleteuser', label: 'Delete User' },
      { value: 'viewmatches', label: 'View Matches' },
      { value: 'editmatch', label: 'Edit Match' },
      { value: 'editteam', label: 'Edit Team' },
      { value: 'managevideos', label: 'Manage Videos' },
      { value: 'creatematch', label: 'Create Match' },
      { value: 'viewscorecard', label: 'View Scorecard' },
    ];

    const handleFileRead = async (e) => {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      console.log(file)
      console.log(fileName)
    }

    const uploadProfile =() =>{
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", fileName);
      console.log('Upload Request : '+formData)
      ApiService.postData(API_NAME.UPLOAD_IMAGE+'?filename='+value.mobile[0]+'.png'+'&'+'folder=admin',formData).then(
         (resData) => {
          console.log(resData)
         }
      ).catch((err) => {
         console.log(err)
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
                             <h4 className="card-title">New SubAdmin User</h4>
                          </div>
                       </Card.Header>
                       <Card.Body>
                       <Form onSubmit={onAddAdmin.bind(this)}>
                              <Row>
                              <Col md="6" className="mb-3">
                                    <Form.Label md="6" htmlFor="validationDefault01">Full Name</Form.Label>
                                    <Form.Control type="text"  id="validationDefault01" name="fullname"  onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })}  required/>
                                 </Col>
                                 <Col md="6" className="mb-3">
                                    <Form.Label md="6" htmlFor="validationDefault01">Mobile No</Form.Label>
                                    <Form.Control type="text"  id="validationDefault01" name="mobile"  onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })}  required/>
                                 </Col>
                                 <Col md="6" className="mb-3">
                                    <Form.Label md="6" htmlFor="validationDefault01">New Password</Form.Label>
                                    <Form.Control type="password"  id="validationDefault01" name="pass"  onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })}  required/>
                                 </Col>
                                 <Col md="6" className="mb-3">
                                    <Form.Label  htmlFor="validationDefault02">Confirm Password</Form.Label>
                                    <Form.Control type="password"  id="validationDefault02" name="cnpass"  onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })}  required/>
                                 </Col>
                                 <Col md="6" className="mb-3">
                                    <Form.Label md="6" htmlFor="validationDefault01">Username</Form.Label>
                                    <Form.Control type="email"  id="validationDefault01" name="username"  onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })}  required/>
                                 </Col>
                                 <Col md="6" className="mb-3">
                                 <Form.Group className="form-group">
                                    <Form.Label  htmlFor="choices-multiple-default">Select Permissions</Form.Label>
                                    <Select isMulti
        defaultValue={selectedOptions}
        onChange={handleChange}
        placeholder="..."
        options={options}
      
      />
                                </Form.Group>
                               
                                 </Col>
                                 <Col md="12" className="mb-3">
                                 <Form.Label className="custom-file-input">Image</Form.Label>
                                 <Form.Control type="file" accept="image/png, image/gif, image/jpeg" onChange={handleFileRead}    />
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

export default connect(mapStateToProps)(AdminAdd);