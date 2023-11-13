import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/card/card'
import Alert from '../../../components/toast/toast'

import { loadingToggleAction } from "../../../store/action/common";
import store from "../../../store/store";
import ApiService from '../../../services/service'
import { API_NAME } from '../../../utils/constants';
import { ToastContainer } from 'react-toastify'
import Spinner from '../../../components/loader/loader'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const PlayerAdd = (props) => {
   const [value, setValue] = React.useState('');
   const [role, setRole] = React.useState('');
   const [bowlingStyle, setBowlingStyle] = React.useState('');
   const [battingStyle, setBattingStyle] = React.useState('');
   const [img, setImg] = React.useState('');


   const history = useNavigate();

   const onAddPlayer = (event) => {
      event.preventDefault();
      let email = ""
      if(value.email !== undefined && value.email !== null){
         email= value.email[0];
      }
      let data = {
         playername: value.playername[0],
         playermobile: value.mobileno[0],
         dob: value.dob[0],
         playerrole: role,
         email: email,
         imgdata: img,
         batting: battingStyle,
         bowling: bowlingStyle,
         country:value.country[0],
         state:value.state[0],
         city:value.city[0]
      }
      console.log(data);
      createPlayer(data);
   }

   const createPlayer = (params) => {
      store.dispatch(loadingToggleAction(true))
      console.log('Component : Player')
      console.log("Request : " + JSON.stringify(params))

      ApiService.postData(API_NAME.ADD_PLAYER, params).then(
         (resData) => {
            if(resData.statusCode === '00')
            {
               store.dispatch(loadingToggleAction(false))
               Alert('00', resData.message)
               setTimeout( history('/home/players'), 6000);
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

   const handleFileRead = async (e) => {
      const file = e.target.files[0]
      const base64 = await convertBase64(file)
      setImg(base64)
     // console.log(base64)
    }

    const convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
          resolve(fileReader.result);
        }
        fileReader.onerror = (error) => {
          reject(error);
        }
      })
    }

   return (
      <>
       <ToastContainer />
         <Spinner loading={props.showLoading} />
         <div>
            <Row>

               <Col xl="12">
                  <Card>
                     <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                           <h4 className="card-title">New Player</h4>
                        </div>
                     </Card.Header>
                     <Card.Body>
                        <Form onSubmit={onAddPlayer.bind(this)}>
                           <Row>
                              <Col md="6" className="mb-3">
                                 <Form.Label md="6" htmlFor="validationDefault01">Name</Form.Label>
                                 <Form.Control type="text" id="validationDefault01" name="playername" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Label md="6" htmlFor="validationDefault01">Mobile No</Form.Label>
                                 <Form.Control type="text" id="validationDefault01" name="mobileno" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Label htmlFor="validationDefault02">DOB</Form.Label>
                                 <Form.Control type="date" id="exampleInputdate" name="dob" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Group className="form-group">
                                    <Form.Label htmlFor="exampleFormControlSelect1"> Role</Form.Label>
                                    <Form.Select required className="form-select" id="exampleFormControlSelect1" value={role}
                                       onChange={(e) => setRole(e.currentTarget.value)}>
                                       <option value="">Role</option>
                                       <option value="bat">Batsman</option>
                                       <option value="bowl">Bowler</option>
                                       <option value="all">All Rounder</option>
                                       <option value="wk">Wicket Kepper</option>
                                    </Form.Select>
                                 </Form.Group>
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Group className="form-group">
                                    <Form.Label htmlFor="exampleFormControlSelect1"> Batting Style</Form.Label>
                                    <Form.Select required className="form-select" id="exampleFormControlSelect1" value={battingStyle}
                                       onChange={(e) => setBattingStyle(e.currentTarget.value)}>
                                       <option value="">Batting Style</option>
                                       <option value="right_hand">Right Hand Batsman</option>
                                       <option value="left_hand">Left Hand Batsman</option>
                                    </Form.Select>
                                 </Form.Group>
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Group className="form-group">
                                    <Form.Label htmlFor="exampleFormControlSelect1"> Bowling Style</Form.Label>
                                    <Form.Select required className="form-select" id="exampleFormControlSelect1" value={bowlingStyle}
                                       onChange={(e) => setBowlingStyle(e.currentTarget.value)}>
                                       <option value="">Bowling Style</option>
                                       <option value="right_arm">Right Arm Bowler</option>
                                       <option value="left_arm">Left Arm Bowler</option>
                                    </Form.Select>
                                 </Form.Group>
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Label htmlFor="validationDefault02">Country</Form.Label>
                                 <Form.Control type="date" id="exampleInputdate" name="country" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Label htmlFor="validationDefault02">State</Form.Label>
                                 <Form.Control type="date" id="exampleInputdate" name="state" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Label htmlFor="validationDefault02">City</Form.Label>
                                 <Form.Control type="date" id="exampleInputdate" name="city" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Label htmlFor="validationDefault02">Email</Form.Label>
                                 <Form.Control type="email" id="exampleInputdate" name="email" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} />
                              </Col>
                              <Col md="12" className="mb-3">
                                 <Form.Label className="custom-file-input">Image</Form.Label>
                                 <Form.Control type="file" accept="image/png, image/gif, image/jpeg" onChange={e => handleFileRead(e)} id="customFile1" name="image"  required />
                              </Col>
                           </Row>
                           <Form.Group>
                              <Button variant="btn btn-primary" style={{ float: 'right' }} type="submit">Add</Button>
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

export default connect(mapStateToProps)(PlayerAdd);



