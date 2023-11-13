import React, { useState, useEffect } from 'react'
import { Row, Modal, Col, Form, Button } from 'react-bootstrap'
import Alert from '../../../components/toast/toast'
import { loadingToggleAction } from "../../../store/action/common";
import store from "../../../store/store";
import { API_NAME } from '../../../utils/constants';
import ApiService from '../../../services/service'
import nodata from '../../../assets/images/home/nodata.jpg'
import { ToastContainer } from 'react-toastify'
import Spinner from '../../../components/loader/loader'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
const EditMatches = (props) => {

    let history = useNavigate() 

    const [showModal, setShowModal] = React.useState(false)
    const [showModal1, setShowModal1] = React.useState(false)
    const [showModal2, setShowModal2] = React.useState(false)
    const [matches, setMatches] = React.useState([]);
    

    const showEdit = (id) => {
        if (showModal)
            setShowModal(false)
        else
            setShowModal(true)


    }

    const showEdit1 = (id) => {
        if (showModal1)
            setShowModal1(false)
        else
            setShowModal1(true)


    }

    const showEdit2 = (id) => {
        if (showModal2)
            setShowModal2(false)
        else
            setShowModal2(true)


    }

    const fetchTournamentMatch = (tourid) => {
        store.dispatch(loadingToggleAction(true))
        setMatches([])
        let params = {
            tourid: tourid
         }
        console.log('Component : Match List')
        console.log("Request : Post")
        ApiService.postData(API_NAME.FETCH_MATCH_DETAILS,params).then(
           (resData) => {
  
              if(resData.statusCode==='00')
              {
                 store.dispatch(loadingToggleAction(false))
                 Alert('00', resData.message)
                 console.log('===================================')
                 setMatches(resData.data)
              }
              else
              {
                 store.dispatch(loadingToggleAction(false))
                 Alert('01', resData.message)
                 console.log('==================================')
              }
            
  
           }
        ).catch((err) => {
           store.dispatch(loadingToggleAction(false))
           Alert('01', err.message)
           console.log('==================================')
  
        });
     }

     const gotoScore =()=>{
        history('/home/edit-score')
     }

     const displayMatches = matches
     .map((item, idx) => {
        return (
            <div class="card profile-badges  mb-0" style={{ marginRight: '6%' }}>
            <div class="card-body" onClick={gotoScore}>
                <div class="iq-badges text-left">
                    <div class="badges-icon">
                        <img class="avatar-80 rounded" src="https://templates.iqonic.design/hope-ui/pro/html/social-app/assets/images/profile-badges/01.png" alt="" loading="lazy" />
                        {item.match_status === undefined || item.match_status === null?<span class="badge bg-soft-success rounded-pill p-2 text-success" style={{ float: 'right', marginTop: '45px' }}>Completed</span>:null}
                        {item.match_status === 'Scheduled'?<span class="badge bg-soft-warning rounded-pill p-2 text-warning" style={{ float: 'right', marginTop: '45px' }}>Upcoming</span>:null}
                        {item.match_status === 'started'?<span class="badge bg-soft-danger rounded-pill p-2 text-danger" style={{ float: 'right', marginTop: '45px' }}>Ongoing</span>:null}
                    </div>
                    <h5 class="mb-2">Match No.{idx+1}</h5>
                    <p class="text-primary"><label style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '60%' }}>{(item.team1_name).replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})}</label><div class="text-info">vs</div> <label style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '60%' }}>{(item.team2_name).replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})}</label></p>
                    {/* <span class="">Started at: 14/Mar/2023 21:41:47</span> */}
                    <div class="text-center">
                    </div>
                </div>
            </div>
            <div class="card-footer text-light bg-primary">
               {"Started at " +item.date_time}
            </div>
        </div>
        )
     })

     const createMatch =()=>
     {
        history('/home/create-matches')
     }

     useEffect(() => {
        fetchTournamentMatch(sessionStorage.getItem('tournamentId'));
     }, [])

    return (
        <>
        <ToastContainer />
            <Spinner loading={props.showLoading} />
           

            

            {/* <img src={crc} alt="profile-bg" style={{ height: '10.5vh' }} class="rounded img-fluid w-100" loading="lazy" /> */}
            {/* <Row>
                <div class="col-md-4">
                    <div class="card card-block card-stretch card-height">
                        <div class="card-body profile-page p-0">
                            <div class="profile-header-image">
                                <div class="position-relative">
                                    <img src={team} alt="profile-bg" class="rounded img-fluid w-100" loading="lazy" />
                                </div>
                                <div class="profile-info p-4">
                                    <div class="user-detail">
                                        <div class="d-flex flex-wrap justify-content-between align-items-start">
                                            <div class="profile-detail d-flex gap-4">
                                                <div class="profile-img">
                                                    <img src="https://templates.iqonic.design/hope-ui/pro/html/social-app/assets/images/profile-badges/04.png" alt="profile-img" class="avatar-90 img-fluid rounded-pill border" loading="lazy" />
                                                </div>
                                                <div class="user-data-block">
                                                    <h4>
                                                        <a href="javascript:void(0)">Team A</a>
                                                    </h4>
                                                    <h6>@India</h6>
                                                    <p>Lorem Ipsum is simply dummy text of the</p>
                                                </div>
                                            </div>
                                            <div class="btn-group" style={{ width: '100%' }}>
                                                <button type="button" class="btn btn-primary" style={{ textAlign: 'right' }}>Select Team A</button>
                                                <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <span class="visually-hidden">Toggle Dropdown</span>
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4" style={{ margin: 'auto' }}>
                    <div style={{ height: '1.5vh' }}></div>
                    <div class="position-relative" style={{ textAlign: 'center' }}>
                        <img src={vs} loading="lazy" style={{ width: '50%' }} />
                    </div>
                    <div style={{ height: '4.5vh' }}></div>
                </div>

                <div class="col-md-4">
                    <div class="card card-block card-stretch card-height">
                        <div class="card-body profile-page p-0">
                            <div class="profile-header-image">
                                <div class="position-relative">
                                    <img src={team} alt="profile-bg" class="rounded img-fluid w-100" loading="lazy" />
                                </div>
                                <div class="profile-info p-4">
                                    <div class="user-detail">
                                        <div class="d-flex flex-wrap justify-content-between align-items-start">
                                            <div class="profile-detail d-flex gap-4">

                                                <div class="user-data-block" style={{ textAlign: 'right' }}>
                                                    <h4>
                                                        <a href="javascript:void(0)">Team B</a>
                                                    </h4>
                                                    <h6>@India</h6>
                                                    <p>Lorem Ipsum is simply dummy text of the</p>
                                                </div>
                                                <div class="profile-img">
                                                    <img src="https://templates.iqonic.design/hope-ui/pro/html/social-app/assets/images/profile-badges/04.png" alt="profile-img" class="avatar-90 img-fluid rounded-pill border" loading="lazy" />
                                                </div>
                                            </div>

                                            <div class="btn-group" style={{ width: '100%' }} onClick={() => showEdit2()}>
                                                <button type="button" class="btn btn-primary" style={{ textAlign: 'right' }} >Select Team B</button>
                                                <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <span class="visually-hidden">Toggle Dropdown</span>
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Row>

            <div class="d-flex justify-content-between align-items-center flex-wrap" style={{ marginTop: '5vh' }}>
                <h4 class="mb-0">Matches</h4>


                <div class="d-flex gap-2">
                    <a class="btn btn-primary btn-icon btn-sm rounded-pill" onClick={() => showEdit()} role="button">
                        <span class="btn-inner">
                            <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.33049 2.00049H16.6695C20.0705 2.00049 21.9905 3.92949 22.0005 7.33049V16.6705C22.0005 20.0705 20.0705 22.0005 16.6695 22.0005H7.33049C3.92949 22.0005 2.00049 20.0705 2.00049 16.6705V7.33049C2.00049 3.92949 3.92949 2.00049 7.33049 2.00049ZM12.0495 17.8605C12.4805 17.8605 12.8395 17.5405 12.8795 17.1105V6.92049C12.9195 6.61049 12.7705 6.29949 12.5005 6.13049C12.2195 5.96049 11.8795 5.96049 11.6105 6.13049C11.3395 6.29949 11.1905 6.61049 11.2195 6.92049V17.1105C11.2705 17.5405 11.6295 17.8605 12.0495 17.8605ZM16.6505 17.8605C17.0705 17.8605 17.4295 17.5405 17.4805 17.1105V13.8305C17.5095 13.5095 17.3605 13.2105 17.0895 13.0405C16.8205 12.8705 16.4805 12.8705 16.2005 13.0405C15.9295 13.2105 15.7805 13.5095 15.8205 13.8305V17.1105C15.8605 17.5405 16.2195 17.8605 16.6505 17.8605ZM8.21949 17.1105C8.17949 17.5405 7.82049 17.8605 7.38949 17.8605C6.95949 17.8605 6.59949 17.5405 6.56049 17.1105V10.2005C6.53049 9.88949 6.67949 9.58049 6.95049 9.41049C7.21949 9.24049 7.56049 9.24049 7.83049 9.41049C8.09949 9.58049 8.25049 9.88949 8.21949 10.2005V17.1105Z" fill="currentColor" />
                            </svg>
                        </span>
                    </a>
                    <button class="btn btn-primary btn-icon btn-sm rounded-pill delete-btn" onClick={() => showEdit1()} type="button">
                        <span class="btn-inner">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 5C2 4.44772 2.44772 4 3 4H8.66667H21C21.5523 4 22 4.44772 22 5V8H15.3333H8.66667H2V5Z" fill="currentColor" stroke="currentColor" />
                                <path d="M6 8H2V11M6 8V20M6 8H14M6 20H3C2.44772 20 2 19.5523 2 19V11M6 20H14M14 8H22V11M14 8V20M14 20H21C21.5523 20 22 19.5523 22 19V11M2 11H22M2 14H22M2 17H22M10 8V20M18 8V20" stroke="currentColor" />
                            </svg>
                        </span>
                    </button>
                </div>



            </div> */}

<Form id="exform">
                <Row style={{ marginTop:'50px' }} className='justify-content-end'>
                   <Col md="3" className="mb-3" >
                   <Button variant="btn btn-primary" style={{ float: 'right' }} onClick={createMatch}>Create Match</Button>
                    </Col> 
                </Row>
            </Form>
            { matches.length == 0 ? <img src={nodata} style={{width:'100%',height:'800px'}}/> : '' }

            <div class="row my-5" >
                <div class="d-grid d-grid-template-1fr-22" style={{ marginTop: '3vh' }}>
                    {displayMatches}
                </div>
            </div>

          

            <Modal show={showModal} onHide={showEdit} className="recModal">
                <Modal.Header className="btnw" closeButton>
                    <Modal.Title as="h5">Statistics</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form id="tourForm">
                        <Row>

                            <Col md="6" className="mb-3">
                                <Form.Group className="form-group">

                                    <Form.Select required className="form-select" id="exampleFormControlSelect1"
                                    >
                                        <option value="Knockout Tournament">Batting Records</option>
                                        <option value="League Tournament">Bowling Records</option>
                                        <option value="Knockout Tournament">Wicket Keeping Records</option>
                                        <option value="League Tournament">Fielding Records</option>
                                        <option value="Knockout Tournament">Partnership Records</option>
                                        <option value="League Tournament">Team Records</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md="6" className="mb-3">
                                <Form.Group className="form-group">

                                    <Form.Select required className="form-select" id="exampleFormControlSelect1"
                                    >
                                        <option value="1">Most Runs</option>
                                        <option value="2">Highest scores</option>
                                        <option value="3">Highest averages</option>
                                        <option value="4">Highest strike rates</option>
                                        <option value="5">Highest strike rates in a innings</option>
                                        <option value="6">Most 30s</option>
                                        <option value="7">Most 50s</option>
                                        <option value="8">Most 100s</option>
                                        <option value="9">Most ducks</option>
                                        <option value="10">Fastest 50s</option>
                                        <option value="5">Fastest 100s</option>
                                        <option value="6">Most sixes</option>
                                        <option value="7">Most sixes in an innings</option>
                                        <option value="6">Most fours</option>
                                        <option value="7">Most fours in an innings</option>
                                        <option value="10">Most runs from 4s and 6s in an innings</option>

                                    </Form.Select>
                                </Form.Group>
                            </Col>

                        </Row>
                        <div class="card-body">
                        <div class="mb-2 d-flex justify-content-between align-items-center">
                            <span class="text-primary">Most Runs [ Batting Records ]</span>
                            <span class="badge rounded-pill bg-primary" style={{ marginRight: '5px' }}>Show</span>
                        </div>
                        
                        
                    </div>
                        <table class="table table-dark table-borderless">
                            <tbody>
                                <tr>
                                    <th>Sr</th>
                                    <th >Player</th>
                                    <th >Team</th>
                                    <th>Mat</th>
                                    <th>Inns</th>
                                    <th >Runs</th>
                                    <th>BF</th>
                                    <th>HS</th>
                                </tr>

                                <tr>
                                    <td><span>1</span></td>
                                    <td >Ajaz Quereshi</td>
                                    <td >Shirshat Sports</td>
                                    <td class="tb_right">4</td>
                                    <td class="tb_right">4</td>
                                    <td class="tb_right">69</td>
                                    <td class="tb_right">34</td>
                                    <td class="tb_right">19 </td>
                                </tr>
                                <tr>
                                    <td ><span>2</span></td>
                                    <td>Mangesh Vaity</td>
                                    <td>Rajmudra Group Vikhrolians</td>
                                    <td class="tb_right" >3</td>
                                    <td class="tb_right" >3</td>
                                    <td class="tb_right">53</td>
                                    <td class="tb_right" >24</td>
                                    <td class="tb_right" >26*</td>
                                </tr>
                                <tr>
                                    <td ><span>3</span></td>
                                    <td>Munna Shaikh</td>
                                    <td>All Monster Umar 11</td>
                                    <td class="tb_right" >1</td>
                                    <td class="tb_right" >2</td>
                                    <td class="tb_right">46</td>
                                    <td class="tb_right" >28</td>
                                    <td class="tb_right" >28*</td>
                                </tr>
                                <tr>
                                    <td ><span>4</span></td>
                                    <td>Pradeep Patil</td>
                                    <td>Xi Warriors Winners</td>
                                    <td class="tb_right" >1</td>
                                    <td class="tb_right" >1</td>
                                    <td class="tb_right">42</td>
                                    <td class="tb_right" >16</td>
                                    <td class="tb_right" >42 </td>
                                </tr>
                                <tr>
                                    <td ><span>5</span></td>
                                    <td>Krishna Satpute</td>
                                    <td>Shirshat Sports</td>
                                    <td class="tb_right" >4</td>
                                    <td class="tb_right" >4</td>
                                    <td class="tb_right">42</td>
                                    <td class="tb_right" >26</td>
                                    <td class="tb_right" >27 </td>
                                </tr>
                                <tr>
                                    <td ><span>6</span></td>
                                    <td>Rahul Jogadiya</td>
                                    <td>Trident Navi Mumbai</td>
                                    <td class="tb_right" >2</td>
                                    <td class="tb_right" >2</td>
                                    <td class="tb_right">41</td>
                                    <td class="tb_right" >21</td>
                                    <td class="tb_right" >35 </td>
                                </tr>
                                <tr>
                                    <td ><span>7</span></td>
                                    <td>Yogesh Penkar</td>
                                    <td>Shirshat Sports</td>
                                    <td class="tb_right" >4</td>
                                    <td class="tb_right" >4</td>
                                    <td class="tb_right">41</td>
                                    <td class="tb_right" >26</td>
                                    <td class="tb_right" >23 </td>
                                </tr>
                                <tr>
                                    <td ><span>8</span></td>
                                    <td>Nikhil Jadhav</td>
                                    <td>Rajmudra Group Vikhrolians</td>
                                    <td class="tb_right" >3</td>
                                    <td class="tb_right" >3</td>
                                    <td class="tb_right">37</td>
                                    <td class="tb_right" >24</td>
                                    <td class="tb_right" >31*</td>
                                </tr>
                                <tr>
                                    <td ><span>9</span></td>
                                    <td>Shreyash Kadam</td>
                                    <td>Kandhari Kings</td>
                                    <td class="tb_right" >2</td>
                                    <td class="tb_right" >2</td>
                                    <td class="tb_right">33</td>
                                    <td class="tb_right" >14</td>
                                    <td class="tb_right" >27*</td>
                                </tr>
                                <tr>
                                    <td ><span>10</span></td>
                                    <td>Thomas Dias</td>
                                    <td>Piramitar Gujarat</td>
                                    <td class="tb_right" >2</td>
                                    <td class="tb_right" >2</td>
                                    <td class="tb_right">33</td>
                                    <td class="tb_right" >15</td>
                                    <td class="tb_right" >32*</td>
                                </tr>


                            </tbody>
                        </table>

                    </Form>


                </Modal.Body>

            </Modal>

            <Modal show={showModal1} onHide={showEdit1} className="recModal">
                <Modal.Header className="btnw" closeButton>
                    <Modal.Title as="h5">Points Table</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form id="tourForm">
                      
                        <div class="card-body">
                        <div class="mb-2 d-flex justify-content-between align-items-center">
                            <span class="text-primary">Group A</span>
                            <span class="badge rounded-pill bg-primary" style={{ marginRight: '5px' }}>Show</span>
                        </div>
                        
                        
                    </div>
                        <table class="table table-dark table-borderless">
                            <tbody>
                                <tr>
                                    <th>Team</th>
                                    <th >Matches</th>
                                    <th >Win</th>
                                    <th>Loss</th>
                                    <th>Tie</th>
                                    <th >NR</th>
                                    <th>Points</th>
                                    <th>NRR</th>
                                </tr>
                                <tr>
   <td>Panvel</td>
   <td >4</td>
   <td >2</td>
   <td >2</td>
   <td >0</td>
   <td >0</td>
   <td >4</td>
   <td class="tb_right">2.250</td>
</tr><tr>
   <td>Navi Mumbai</td>
   <td >4</td>
   <td >2</td>
   <td >2</td>
   <td >0</td>
   <td >0</td>
   <td >4</td>
   <td class="tb_right">2.250</td>
</tr>

                              


                            </tbody>
                        </table>

                    </Form>


                </Modal.Body>

            </Modal>

            <Modal show={showModal2} onHide={showEdit2} className="recModal">
                <Modal.Header className="btnw" closeButton>
                    <Modal.Title as="h5">Match Settings For Standard Tournament (Can Be Export In The Application)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form id="tourForm">
                        <Row>
                        <Col md="6" className="mb-3">
                                 <Form.Label htmlFor="validationDefault02">Overs</Form.Label>
                                 <Form.Control type="number" id="exampleInputdate" name="email" />
                              </Col>

                            <Col md="6" className="mb-3">
                                <Form.Group className="form-group">
                                <Form.Label htmlFor="validationDefault02">Match State</Form.Label>
                                    <Form.Select required className="form-select" id="exampleFormControlSelect1"
                                    >
                                        
                                        <option value="League Tournament">Group Match</option>
                                        <option value="Knockout Tournament">Quater-Final</option>
                                        <option value="League Tournament">Semi-Final</option>
                                        <option value="Knockout Tournament">Final</option>
                                  
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md="6" className="mb-3">
                                <Form.Group className="form-group">
                                <Form.Label htmlFor="validationDefault02">Match Status</Form.Label>
                                    <Form.Select required className="form-select" id="exampleFormControlSelect1"
                                    >
                                     
                                        <option value="2">Started</option>
                                        <option value="3">Not Started</option>
                                        <option value="4">Completed</option>
                                

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md="6" className="mb-3">
                                <Form.Group className="form-group">
                                <Form.Label htmlFor="validationDefault02">Match Format</Form.Label>
                                    <Form.Select required className="form-select" id="exampleFormControlSelect1"
                                    >
                                     
                                        <option value="2">T10</option>
                                        <option value="3">T20</option>
                                        <option value="4">Others</option>
                                

                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md="12" className="mb-3">
                                 <Form.Label htmlFor="validationDefault02">Match Date & Time</Form.Label>
                                 <Form.Control type="datetime-local" id="exampleInputdate" name="dob"  />
                              </Col>
                              
                           
                            <Form.Group>
                              <Button variant="btn btn-primary" style={{ float: 'right' }} type="submit">Start Match</Button>
                           </Form.Group>

                        </Row>
                     
                    </Form>
                  

                </Modal.Body>

            </Modal>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
       showLoading: state.auth.showLoading
    }
 }

export default connect(mapStateToProps)(EditMatches);


// import React, { useState, useEffect } from 'react'
// import { Row, Col, Form, Modal, Button } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
// import Select from 'react-select';
// import Alert from '../../../components/toast/toast'
// import { loadingToggleAction } from "../../../store/action/common";
// import store from "../../../store/store";
// import { API_NAME } from '../../../utils/constants';
// import ApiService from '../../../services/service'
// import { ToastContainer } from 'react-toastify'
// import Spinner from '../../../components/loader/loader'
// import { connect } from 'react-redux'
// // img

// import Card from '../../../components/card/card'
// const EditTeams = (props) => {
//     const [show, AccountShow] = useState('A');
//     const [color, setColor] = useState('#1300FF');
//     const [tcolor, setTcolor] = useState('#ffffff');
//     const [teamName, setTeamName] = useState('');
//     const [showModal, setShowModal] = React.useState(false);
//     const [teams, setTeams] = React.useState([]);
//     const [teamId, setSelectedTeamId] = React.useState({});
//     const [tournamentList, settournamentList] = React.useState([]);
//     const [playerList, setPlayerList] = React.useState([]);
//     const [squadList, setSquadList] = React.useState([]);
//     const [tournamentId, setTournamentId] = useState('');
//     const [img, setImg] = React.useState('');
//     const [updateFlag, setUpdateFlag] = useState(false);
//     const options = [
//         { value: 'create', label: 'Create' },
//         { value: 'update', label: 'Update' },
//         { value: 'viewtournament', label: 'View Tournament' },
//     ]
//     const [value, setValue] = React.useState('');
//     const [role, setRole] = React.useState('');
//     const [bowlingStyle, setBowlingStyle] = React.useState('');
//     const [battingStyle, setBattingStyle] = React.useState('');
//     const [playerimg, setPlayerimg] = React.useState('');
//     const [selectedOptions,setSelectedOptions] = React.useState('');
//     const [showModal1, setShowModal1] = React.useState(false);
//     const [showModal2, setShowModal2] = React.useState(false);
//     const [playerId, setPlayerId] = useState('');
//     const [players, setPlayers] = React.useState([])

//     const [search, setNewSearch] = React.useState("");

//     const showEdit = (id) => {
//         if(document.getElementById("teamDD").value=='')
//         {
//             Alert('01', 'Please select team first')
//             return;
//         }
//         if (showModal)
//             setShowModal(false)
//         else
//         {
//             settournamentList(JSON.parse(sessionStorage.getItem("all_tournament")))
//             //setTeams([])
//             setShowModal(true)
//             setPlayerList([])
           
//         }
          
//     }

//     const showEdit1 = (id) => {
//         if (showModal1)
//             setShowModal1(false)
//         else

//         {
//             setShowModal1(true)
           
//         }
          
//     }

//     const showEdit2 = (id) => {
//         if (showModal2)
//             setShowModal2(false)
//         else
//         {
//             setShowModal2(true)
           
//         }
          
//     }

//     const onInputChange = (selected,context) => {

//         if(context.action=='clear')
//         return;
      
//         if(context.action!='remove-value')
//         {
//             setSelectedOptions(selected)
//             console.log(selected)
//             addRemovePlayerFromSquad(context.option.value,"yes")
//         }
//         else
//         {
//             console.log(context.removedValue)
//             //addRemovePlayerFromSquad(context.removedValue.value,"no")
//             setPlayerId(context.removedValue.value)
//             showEdit1()
//         }
//       };

//       const removePlayer =()=>{
//         store.dispatch(loadingToggleAction(true))
//         let params = {
//             "playerid":playerId,
//             "teamid":sessionStorage.getItem('teamId'),
//             "tourid":sessionStorage.getItem('tournamentId')
//         }
//         console.log('Component : Player')
//         console.log("Request : " + JSON.stringify(params))
      
//         ApiService.postData(API_NAME.REMOVE_PLAYER_SQUAD, params).then(
//             (resData) => {
//                 if (resData.statusCode === '00') {
//                     setShowModal1(false)
//                     store.dispatch(loadingToggleAction(false))
//                     setSelectedOptions([])
//                     fetchTournamentTeam(sessionStorage.getItem('tournamentId'));
//                     fetchSquadPlayers()
                    
//                 }
//                 else {
//                     setShowModal1(false)
//                     store.dispatch(loadingToggleAction(false))
//                     fetchTournamentTeam(sessionStorage.getItem('tournamentId'));
//                     fetchSquadPlayers()
//                     Alert('01', resData.message)
//                 }
      
      
//             }
//         ).catch((err) => {
//             store.dispatch(loadingToggleAction(false))
//             Alert('01', err.message)
      
//         });
//       }

//       const addRemovePlayerFromSquad =(id,tag)=>{
//         let playerListData = { }
//         store.dispatch(loadingToggleAction(true))
//         setTeams([])
//         let params = {
//             "tourid": sessionStorage.getItem('tournamentId'),
//             "teamid": sessionStorage.getItem('teamId'),
//             "playerid": id,
//             "playing11": tag 
//         }
//         console.log('Component : Add Remove Squad in Team')
//         console.log("Request : Post")
//         ApiService.postData(API_NAME.ADD_IN_PLAYING_SQUAD, params).then(
//             (resData) => {
//                 setShowModal1(false)
//                 if (resData.statusCode === '00') {
//                     store.dispatch(loadingToggleAction(false))
//                     if(tag=="no"){
//                     Alert('00', 'Player has been removed from Playing 11')
//                     }else{
//                     Alert('00', 'Player has been added to Playing 11')
//                     }
//                     console.log('===================================')
//                     fetchTournamentTeam(sessionStorage.getItem('tournamentId'));
//                     fetchSquadPlayers()
//                     if(localStorage.getItem('stepFlag')==='1')
//                     {
//                         localStorage.setItem('stepFlag',0)
//                         AccountShow('Image')
//                     }
                   
//                 }
//                 else {
//                     store.dispatch(loadingToggleAction(false))
//                     Alert('01', resData.message)
//                     fetchTournamentTeam(sessionStorage.getItem('tournamentId'));
//                     fetchSquadPlayers()
//                     console.log('==================================')
//                 }


//             }
//         ).catch((err) => {
//             store.dispatch(loadingToggleAction(false))
//             Alert('01', err.message)
//             console.log('==================================')

//         });
//       }

//     const selectedTeamId = (teamId) => {
      
//         if (teamId === '') {
//             setTeamName('')
//             setImg('')
//             setColor('#1300FF')
//             setTcolor('#ffffff')
//             document.getElementById("customFile1").value = "";
//             setUpdateFlag(false)
//             setSelectedTeamId('')
//             setSquadList([])
//             return;
//             //
            
//         }
//         var selectedTeamDetails = teams.find(item => item.teamid == teamId);
//         if (selectedTeamDetails.teamname != null && selectedTeamDetails.teamname != undefined && selectedTeamDetails.teamname != "") {
//             setColor(selectedTeamDetails.teamcolor);
//             setTcolor(selectedTeamDetails.textcolor);
//             setTeamName(selectedTeamDetails.teamname);
//             setImg(selectedTeamDetails.logopath);
//             console.log(color)
//             sessionStorage.setItem('teamId',teamId)
//         }
//         setUpdateFlag(true)
//         setSelectedTeamId(teamId)
//         fetchSquadPlayers()
//         setSelectedOptions([])
//     }

//     const selectedTournament = (tourid) => {
//         if (tourid != null && tourid != undefined && tourid.toString() != "") {
//             setTournamentId(tourid)
//             fetchTournamentTeam(tourid);
//         }
//     }

//     const fetchSquadPlayers = ()=>{
//        // store.dispatch(loadingToggleAction(true))
//         setSquadList([])
//         let params = {
//             tourid: sessionStorage.getItem('tournamentId'),
//             teamid: sessionStorage.getItem('teamId')
//         }
//         console.log('Request' + params)
//         ApiService.postData(API_NAME.TEAM_PLAYER, params).then(
//             (resData) => {

//                 if (resData.statusCode === '00') {
//                     store.dispatch(loadingToggleAction(false))
//                     var squadData = []
//                     var selsquadData = []
//                     resData.data.forEach(element => {
//                          squadData.push({value:element.playerid,label : element.playername})
//                          if(element.playing11==='yes')
//                          selsquadData.push({value:element.playerid,label : element.playername})
//                     });
//                     setSquadList(squadData)
//                     setSelectedOptions(selsquadData)
//                    // Alert('00', resData.message)
//                     console.log('===================================')
//                 }
//                 else {
//                     store.dispatch(loadingToggleAction(false))
//                    // Alert('01', resData.message)
//                     console.log('==================================')
//                 }


//             }
//         ).catch((err) => {
//             store.dispatch(loadingToggleAction(false))
//             Alert('01', err.message)
//             console.log('==================================')

//         });
//     }

//     const fetchTeamPlayers = (teamId) => {
//         store.dispatch(loadingToggleAction(true))
//         setPlayerList([])
//         let params = {
//             tourid: tournamentId,
//             teamid: teamId
//         }
//         console.log('Component : Player List')
//         console.log("Request : Post")
//         ApiService.postData(API_NAME.TEAM_PLAYER, params).then(
//             (resData) => {

//                 if (resData.statusCode === '00') {
//                     store.dispatch(loadingToggleAction(false))
//                     Alert('00', resData.message)
//                     console.log('===================================')
//                     setPlayerList(resData.data)
//                 }
//                 else {
//                     store.dispatch(loadingToggleAction(false))
//                     Alert('01', resData.message)
//                     console.log('==================================')
//                 }


//             }
//         ).catch((err) => {
//             store.dispatch(loadingToggleAction(false))
//             Alert('01', err.message)
//             console.log('==================================')

//         });
//     }

//     const fetchTournamentTeam = (tourid) => {
//         store.dispatch(loadingToggleAction(true))
//         setTeams([])
//         let params = {
//             tourid: tourid
//         }
//         console.log('Component : Team List')
//         console.log("Request : Post")
//         ApiService.postData(API_NAME.TOURNAMENT_TEAM, params).then(
//             (resData) => {

//                 if (resData.statusCode === '00') {
//                     store.dispatch(loadingToggleAction(false))
//                     // Alert('00', resData.message)
//                     console.log('===================================')
//                     setTeams(resData.data)

//                     setColor(resData.data[0].teamcolor);
//                     setTcolor(resData.data[0].textcolor);
//                     setTeamName(resData.data[0].teamname);
//                     setImg(resData.data[0].logopath);
//                     sessionStorage.setItem('teamId',resData.data[0].teamid)
                    
                    
                       
                    
                  
//                 }
//                 else {
//                     store.dispatch(loadingToggleAction(false))
//                     Alert('01', resData.message)
//                     console.log('==================================')
//                 }


//             }
//         ).catch((err) => {
//             store.dispatch(loadingToggleAction(false))
//             Alert('01', err.message)
//             console.log('==================================')

//         });
//     }

//     const addTournamentTeam = () => {

//         if (teamName === '') {
//             Alert('01', 'Please enter Team Name')
//             return;
//         }
//         // else if (img === '') {
//         //     Alert('01', 'Please upload Team Logo')
//         //     return;
//         // }
//         store.dispatch(loadingToggleAction(true))
//         setTeams([])
//         let params = {
//             tourid: sessionStorage.getItem('tournamentId'),
//             teamname: teamName,
//             logopath: '',
//             teamcolor: color,
//             textcolor: tcolor
//         }
//         console.log('Component : Add Team in Tournament')
//         console.log("Request : Post")
//         ApiService.postData(API_NAME.ADD_TOURNAMENT_TEAM, params).then(
//             (resData) => {

//                 setTeamName('')
//                 setImg('')
//                 setColor('#1300FF')
//                 setTcolor('#ffffff')
//                 document.getElementById("customFile1").value = "";

//                 if (resData.statusCode === '00') {
//                     store.dispatch(loadingToggleAction(false))
//                     Alert('00', resData.message)
//                     console.log('===================================')
//                     AccountShow('Account')
//                     setSelectedTeamId(resData.data.teamId)
//                     fetchTournamentTeam(sessionStorage.getItem('tournamentId'));
//                     sessionStorage.setItem('teamId',resData.data.teamId)
//                 }
//                 else {
//                     store.dispatch(loadingToggleAction(false))
//                     Alert('01', resData.message)
//                     console.log('==================================')
//                     fetchTournamentTeam(sessionStorage.getItem('tournamentId'));
//                 }




//             }
//         ).catch((err) => {
//             store.dispatch(loadingToggleAction(false))
//             Alert('01', err.message)
//             console.log('==================================')
//             setTeamName('')
//             setImg('')
//             setColor('#1300FF')
//             setTcolor('#ffffff')

//         });
//     }

//     const updateTournamentTeam = () => {
//         console.log(teamId)

//         if (teamName === '') {
//             Alert('01', 'Please enter Team Name')
//             return;
//         }
//         // else if (img === '') {
//         //     Alert('01', 'Please upload Team Logo')
//         //     return;
//         // }
//         store.dispatch(loadingToggleAction(true))
//         setTeams([])
//         let params = {
//             id: teamId,
//             teamname: teamName,
//             logopath: img,
//             teamcolor: color,
//             textcolor: tcolor
//         }
//         console.log('Component : Add Team in Tournament')
//         console.log("Request : Post")
//         ApiService.postData(API_NAME.UPDATE_TOURNAMENT_TEAM, params).then(
//             (resData) => {

//                 setTeamName('')
//                 setImg('')
//                 setColor('#1300FF')
//                 setTcolor('#ffffff')
//                 document.getElementById("customFile1").value = "";

//                 if (resData.statusCode === '00') {
//                     store.dispatch(loadingToggleAction(false))
//                     Alert('00', resData.message)
//                     console.log('===================================')
//                     AccountShow('Account')
//                     setSelectedTeamId(teamId)
//                     fetchTournamentTeam(sessionStorage.getItem('tournamentId'));
//                     sessionStorage.setItem('teamId',teamId)
//                 }
//                 else {
//                     store.dispatch(loadingToggleAction(false))
//                     Alert('01', resData.message)
//                     console.log('==================================')
//                     fetchTournamentTeam(sessionStorage.getItem('tournamentId'));
//                 }




//             }
//         ).catch((err) => {
//             store.dispatch(loadingToggleAction(false))
//             Alert('01', err.message)
//             console.log('==================================')
//             setTeamName('')
//             setImg('')
//             setColor('#1300FF')
//             setTcolor('#ffffff')

//         });
//     }

//     const importTeam = (event,) => {
//         if(event!=null && event!=undefined){
//         event.preventDefault();
//         }
//         if (teamId === "") {
//             Alert('01', 'Please select Team to import players ')
//             return
//         }
//         console.log(playerList)
//         let playerListData = [];
//         playerList.filter(data => {
//             playerListData.push({ "tourid": sessionStorage.getItem('tournamentId'), "teamid": teamId, "playerid": data.playerid, "playing11": "no" })
//         })
//         store.dispatch(loadingToggleAction(true))
//         setTeams([])
//         let params = {
//             squadPlayers: playerListData,
//         }
//         console.log('Component : Add Squad in Team')
//         console.log("Request : Post")
//         ApiService.postData(API_NAME.ADD_SQUAD_IN_TEAM, params).then(
//             (resData) => {

//                 if (resData.statusCode === '00') {
//                     store.dispatch(loadingToggleAction(false))
//                     Alert('00', resData.message)
//                     console.log('===================================')
//                     fetchTournamentTeam(sessionStorage.getItem('tournamentId'));
//                     setShowModal(false)
//                     setTimeout(() => {
//                         fetchSquadPlayers()
//                     }, 3000);
//                     if(localStorage.getItem('stepFlag')==='1')
//                     {
//                         localStorage.setItem('stepFlag',0)
//                         AccountShow('Image')
//                     }
                   
//                 }
//                 else {
//                     store.dispatch(loadingToggleAction(false))
//                     Alert('01', resData.message)
//                     console.log('==================================')
//                 }


//             }
//         ).catch((err) => {
//             store.dispatch(loadingToggleAction(false))
//             Alert('01', err.message)
//             console.log('==================================')

//         });
//     }

//     const addPlayersToSquad = () => {
//         let playerListData = [];
//         selectedOptions.filter(data => {
//             playerListData.push({ "tourid": sessionStorage.getItem('tournamentId'), "teamid": sessionStorage.getItem('teamId'), "playerid": data.value, "playing11": "yes" })
//         })
//         store.dispatch(loadingToggleAction(true))
//         setTeams([])
//         let params = {
//             squadPlayers: playerListData,
//         }
//         console.log('Component : Add Squad in Team')
//         console.log("Request : Post")
//         ApiService.postData(API_NAME.ADD_SQUAD_IN_TEAM, params).then(
//             (resData) => {

//                 if (resData.statusCode === '00') {
//                     store.dispatch(loadingToggleAction(false))
//                     Alert('00', resData.message)
//                     console.log('===================================')
//                     fetchTournamentTeam(sessionStorage.getItem('tournamentId'));
//                     fetchSquadPlayers()
                    
                    
                   
//                 }
//                 else {
//                     store.dispatch(loadingToggleAction(false))
//                     Alert('01', resData.message)
//                     console.log('==================================')
//                 }


//             }
//         ).catch((err) => {
//             store.dispatch(loadingToggleAction(false))
//             Alert('01', err.message)
//             console.log('==================================')

//         });
//     }

//     const onSearchPlayer =()=>{
//         showEdit2()
//     }

//     const onAddPlayer = () => {
//         let email = ""
//         let playerName = value.playername
//         if (teamId === "") {
//             Alert('01', 'Please select Team')
//             return
//         }
//         if (value.email !== undefined && value.email !== null) {
//             email = value.email[0];
//         }
//         if (playerName === '' || playerName === undefined) {
//             Alert('01', 'Please enter Player Name')
//             return;
//         }
       
//         else if (value.mobileno[0] === '' || value.mobileno[0] === undefined) {
//             Alert('01', 'Please enter Mobile No')
//             return;
//         }
//         else if (value.dob[0] === '' || value.dob[0] === undefined) {
//             Alert('01', 'Please enter DOB')
//             return;
//         }
//         else if (role === '') {
//             Alert('01', 'Please select Role')
//             return;
//         }
//         else if (battingStyle === '') {
//             Alert('01', 'Please select Batting Style')
//             return;
//         }
//         else if (bowlingStyle === '') {
//             Alert('01', 'Please select Bowling Style')
//             return;
//         }
//         // else if (playerimg === '') {
//         //     Alert('01', 'Please upload Player Image')
//         //     return;
//         // }
//         let data = {
//             playername: value.playername[0],
//             playermobile: value.mobileno[0],
//             dob: value.dob[0],
//             playerrole: role,
//             email: email,
//             imgdata: playerimg,
//             batting: battingStyle,
//             bowling: bowlingStyle
//         }
//         console.log(data);
//         createPlayer(data);
//     }

//     const createPlayer = (params) => {
//         store.dispatch(loadingToggleAction(true))
//         console.log('Component : Player')
//         console.log("Request : " + JSON.stringify(params))

//         ApiService.postData(API_NAME.ADD_PLAYER, params).then(
//             (resData) => {
//                 document.getElementById('n').value = ''
//                 document.getElementById('m').value = ''
//                 document.getElementById('d').value = ''
//                 document.getElementById('r').value = ''
//                 document.getElementById('b').value = ''
//                 document.getElementById('bo').value = ''
//                 document.getElementById('e').value = ''
//                 setBattingStyle('')
//                 setBowlingStyle('')
//                 setRole('')
               
//                 if (resData.statusCode === '00') {
//                     store.dispatch(loadingToggleAction(false))
//                     var playerData = {"tourid": sessionStorage.getItem('tournamentId'), "teamid": teamId, "playerid": resData.data.playerId, "playing11": "no"}
//                     setPlayerList([])
//                     playerList.push(playerData)
//                     localStorage.setItem('stepFlag',1)
//                     importTeam()
//                     setTimeout(() => {
//                         fetchSquadPlayers()
//                     }, 3000);

                 
                    

                   
//                 }
//                 else {
//                     store.dispatch(loadingToggleAction(false))
//                     Alert('01', resData.message)
//                 }


//             }
//         ).catch((err) => {
//             store.dispatch(loadingToggleAction(false))
//             Alert('01', err.message)

//         });
//     }

//     const handleFileRead = async (e) => {
//         const file = e.target.files[0]
//         const base64 = await convertBase64(file)
//         setImg(base64)
//         setPlayerimg(base64)
//         // console.log(base64)
//     }

//     const convertBase64 = (file) => {
//         return new Promise((resolve, reject) => {
//             const fileReader = new FileReader();
//             fileReader.readAsDataURL(file)
//             fileReader.onload = () => {
//                 resolve(fileReader.result);
//             }
//             fileReader.onerror = (error) => {
//                 reject(error);
//             }
//         })
//     }
//     const displayPlayers = playerList
//         .map((item, idx) => {
//             return (
//                 <span class="badge rounded-pill bg-info" style={{ marginRight: '5px' }}>{item.playername}</span>
//             )
//         })


//         const fetchPlayerList = ()=>{
//             store.dispatch(loadingToggleAction(true))
//         console.log('Component : Player List')
//         console.log("Request : Get")
//         ApiService.getData(API_NAME.PLAYER).then(
//            (resData) => {
  
//               if(resData.statusCode==='00')
//               {
//                  store.dispatch(loadingToggleAction(false))
//                //  Alert('00', resData.message)
//                  console.log('===================================')
//                  setPlayers(resData.data)
//               }
//               else
//               {
//                  store.dispatch(loadingToggleAction(false))
//                 // Alert('01', resData.message)
//                  console.log('==================================')
//               }
            
  
//            }
//         ).catch((err) => {
//            store.dispatch(loadingToggleAction(false))
//            Alert('01', err.message)
//            console.log('==================================')
  
//         });
//         }

//         const filtered = !search
//         ? players
//         : players.filter((players) =>
//         players.playername.toLowerCase().includes(search.toLowerCase())
//      );

//      const onSearchAdd = (item)=>{
//         var playerData = {"tourid": sessionStorage.getItem('tournamentId'), "teamid": teamId, "playerid": item.playerid, "playing11": "no"}
//         setPlayerList([])
//         playerList.push(playerData)
//         importTeam()
//         setShowModal2(false)
//         setTimeout(async () => {
//             await fetchSquadPlayers()
//             setNewSearch('')
//             AccountShow('Image')
//         }, 3000);
//      }

//         const displayAllPlayers = filtered
//         .map((item, idx) => {
//             return (
//                 <li class="list-group-item d-flex justify-content-between align-items-start">
//                 <div class="ms-2 me-auto">
//                     <div class="fw-bold">{item.playername}</div>
//                     {item.playermobile}
//                 </div>
//                 <span class="badge bg-primary rounded-pill"  onClick={() => onSearchAdd(item)}>Add</span>
//             </li>

//             )
//         })

//         const handleSearchChange = (e) => {
//             console.log(e.target.value)
//             setNewSearch(e.target.value);
//          }
    

       

//     useEffect(() => {
//         fetchTournamentTeam(sessionStorage.getItem('tournamentId'));
//         fetchSquadPlayers()
//         fetchPlayerList()
//     }, [])

//     return (
//         <>
//             <ToastContainer />
//             <Spinner loading={props.showLoading} />
//             <div>
//                 <Row>
//                     <Col sm="12" lg="12">
//                         <Card>
//                             <Card.Header className="d-flex justify-content-between">
//                                 <div className="header-title">
//                                     <h4 className="card-title">Teams Wizard</h4>
//                                 </div>

//                                 <Row>
//                                     <Col md="8" className="mb-1">

//                                         <select class="form-select form-select-sm" id="teamDD" aria-label=".form-select-sm example" onChange={(e) => selectedTeamId(e.currentTarget.value)}>
//                                             <option value=''>Select Team</option>
//                                             {teams.map(({ teamid, teamname }, index) => <option value={teamid} selected={teamid===+sessionStorage.getItem('teamId')}>{teamname}</option>)}
//                                         </select>
//                                     </Col>
//                                     <Col md="4" className="mb-1">

//                                         <button type="button" class="btn btn-primary btn-sm" onClick={() => showEdit()}>Import</button>
//                                     </Col>
//                                 </Row>


//                             </Card.Header>
//                             <Card.Body>
//                                 <Form id="form-wizard1" className="text-center mt-3">
//                                     <ul id="top-tab-list" className="p-0 row list-inline">
//                                         <li className={` ${show === 'Image' ? ' active done' : ''} ${show === 'Personal' ? ' active done' : ''} ${show === 'Account' ? ' active done' : ''} ${show === 'A' ? 'active' : ''} col-lg-4 col-md-6 text-start mb-2 active`} id="account">
//                                             <Link to="#">
//                                                 <div className="iq-icon me-3">
//                                                     <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                         <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor"></path>
//                                                         <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor"></path>
//                                                         <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor"></path>
//                                                         <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor"></path>
//                                                         <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor"></path>
//                                                         <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor"></path>
//                                                     </svg>
//                                                 </div>
//                                                 <span>Add Teams</span>
//                                             </Link>
//                                         </li>
//                                         <li id="personal" className={`${show === 'Personal' ? ' active done' : ''} ${show === 'Image' ? ' active done' : ''} ${show === 'Account' ? 'active ' : ''} col-lg-4 col-md-6 mb-2 text-start`}>
//                                             <Link to="#">
//                                                 <div className="iq-icon me-3">
//                                                     <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                                     </svg>
//                                                 </div>
//                                                 <span>Add Players</span>
//                                             </Link>
//                                         </li>
//                                         <li id="payment" className={`${show === 'Image' ? ' active done' : ''} ${show === 'Personal' ? 'active' : ''} col-lg-4 col-md-6 mb-2 text-start`}>
//                                             <Link to="#">
//                                                 <div className="iq-icon me-3">
//                                                     <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                                                     </svg>
//                                                 </div>
//                                                 <span>Select Players</span>
//                                             </Link>
//                                         </li>

//                                     </ul>
//                                     <fieldset className={`${show === 'A' ? 'd-block' : 'd-none'}`}>
//                                         <div className="form-card text-start">
//                                             <div className="row">

//                                                 {/* <div className="col-5">
//                                                 <h2 className="steps">Step 1 - 4</h2>
//                                             </div> */}
//                                             </div>
//                                             <div className="row">
//                                                 <Form >
//                                                     <Row>
//                                                         <Col md="6" className="mb-3">
//                                                             <Form.Label md="6" htmlFor="validationDefault01">Name</Form.Label>
//                                                             <Form.Control type="text" id="validationDefault01" name="teamname" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
//                                                         </Col>
//                                                         <Col md="6" className="mb-3">
//                                                             <Form.Label md="6" htmlFor="validationDefault01">Color</Form.Label>
//                                                             <Form.Control type="color" style={{ width: '100%' }} value={color} onChange={(e) => setColor(e.target.value)} name="themeColor" />
//                                                         </Col>

//                                                         <Col md="6" className="mb-3">
//                                                             <Form.Label htmlFor="validationDefault02">Text</Form.Label>
//                                                             <Form.Control type="color" style={{ width: '100%' }} value={tcolor} onChange={(e) => setTcolor(e.target.value)} name="textColor" />
//                                                         </Col>
//                                                         <Col md="6" className="mb-3">
//                                                             <Form.Label className="custom-file-input">Logo</Form.Label>
//                                                             <Form.Control type="file" accept="image/png, image/gif, image/jpeg" onChange={(e) => handleFileRead(e)} id="customFile1" name="image" />

//                                                         </Col>
//                                                     </Row>
//                                                     <Form.Group>
//                                                         {updateFlag === false ? <Button variant="btn btn-primary" style={{ float: 'right' }} onClick={addTournamentTeam}>Add</Button> : <Button variant="btn btn-primary" style={{ float: 'right' }} onClick={updateTournamentTeam}>Update</Button>}
//                                                         <button type="button" name="previous" className="btn btn-warning previous action-button-previous float-end me-1" value="Skip" onClick={() => AccountShow('Account')} >Skip</button>
//                                                     </Form.Group>
//                                                 </Form>
//                                             </div>
//                                         </div>
//                                     </fieldset>
//                                     <fieldset className={`${show === 'Account' ? 'd-block' : 'd-none'}`}>
//                                         <div className="form-card text-start">

//                                             <Form>
//                                                 <Row>
//                                                     <Col md="6" className="mb-3" >
//                                                         <Form.Label md="6" htmlFor="validationDefault01">Name</Form.Label>
//                                                         <Form.Control type="text" id="n" name="playername" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
//                                                     </Col>
//                                                     <Col md="6" className="mb-3">
//                                                         <Form.Label md="6"  htmlFor="validationDefault01">Mobile No</Form.Label>
//                                                         <Form.Control type="tel" id="m" maxlength="10" minlength="10"  name="mobileno" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
//                                                     </Col>
//                                                     <Col md="6" className="mb-3">
//                                                         <Form.Label htmlFor="validationDefault02">DOB</Form.Label>
//                                                         <Form.Control type="date" id="d" name="dob" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
//                                                     </Col>
//                                                     <Col md="6" className="mb-3">
//                                                         <Form.Group className="form-group">
//                                                             <Form.Label htmlFor="exampleFormControlSelect1"> Role</Form.Label>
//                                                             <Form.Select required className="form-select" id="r" value={role}
//                                                                 onChange={(e) => setRole(e.currentTarget.value)}>
//                                                                 <option value="">Role</option>
//                                                                 <option value="bat">Batsman</option>
//                                                                 <option value="bowl">Bowler</option>
//                                                                 <option value="all">All Rounder</option>
//                                                                 <option value="wk">Wicket Kepper</option>
//                                                             </Form.Select>
//                                                         </Form.Group>
//                                                     </Col>
//                                                     <Col md="6" className="mb-3">
//                                                         <Form.Group className="form-group">
//                                                             <Form.Label htmlFor="exampleFormControlSelect1"> Batting Style</Form.Label>
//                                                             <Form.Select required className="form-select" id="b" value={battingStyle}
//                                                                 onChange={(e) => setBattingStyle(e.currentTarget.value)}>
//                                                                 <option value="">Batting Style</option>
//                                                                 <option value="right_hand">Right Hand Batsman</option>
//                                                                 <option value="left_hand">Left Hand Batsman</option>
//                                                             </Form.Select>
//                                                         </Form.Group>
//                                                     </Col>
//                                                     <Col md="6" className="mb-3">
//                                                         <Form.Group className="form-group">
//                                                             <Form.Label htmlFor="exampleFormControlSelect1"> Bowling Style</Form.Label>
//                                                             <Form.Select required className="form-select" id="bo" value={bowlingStyle}
//                                                                 onChange={(e) => setBowlingStyle(e.currentTarget.value)}>
//                                                                 <option value="">Bowling Style</option>
//                                                                 <option value="right_arm">Right Arm Bowler</option>
//                                                                 <option value="left_arm">Left Arm Bowler</option>
//                                                             </Form.Select>
//                                                         </Form.Group>
//                                                     </Col>
//                                                     <Col md="6" className="mb-3">
//                                                         <Form.Label htmlFor="validationDefault02">Email</Form.Label>
//                                                         <Form.Control type="email" id="e" name="email" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} />
//                                                     </Col>
//                                                     <Col md="6" className="mb-3">
//                                                         <Form.Label className="custom-file-input">Image</Form.Label>
//                                                         <Form.Control type="file" accept="image/png, image/gif, image/jpeg" onChange={e => handleFileRead(e)} id="customFile1" name="image"  />
//                                                     </Col>
//                                                 </Row>
//                                                 <Form.Group>
//                                                 <button type="button" name="next" className="btn btn-primary next action-button float-start" onClick={onSearchPlayer} >Search</button>
//                                                     <button type="button" name="next" className="btn btn-primary next action-button float-end" value="Next" onClick={onAddPlayer} >Add</button>
//                                                     <button type="button" name="previous" className="btn btn-dark previous action-button-previous float-end me-1" value="Previous" onClick={() => AccountShow('A')} >Previous</button>
//                                                     <button type="button" name="previous" className="btn btn-warning previous action-button-previous float-end me-1" value="Skip" onClick={() => AccountShow('Image')} >Skip</button>
//                                                 </Form.Group>
//                                             </Form>
//                                         </div>

//                                     </fieldset>
//                                     <fieldset className={`${show === 'Image' ? 'd-block' : 'd-none'}`}>
//                                         <div className="form-card text-start">
//                                             <Form >
//                                                 <Row>
//                                                     <Col md="6" className="mb-3">
//                                                         <Form.Group className="form-group">
//                                                             <Form.Label htmlFor="choices-multiple-default">Select Players (Squad Limit : {sessionStorage.getItem('squadLimit')})</Form.Label>
//                                                             <Select isMulti

//                                                                 placeholder="....."
//                                                                 options={squadList}
//                                                                 defaultValue={selectedOptions}
//                                                                 value={selectedOptions}
//                                                                 onChange={onInputChange}
//                                                                 isOptionDisabled={() => selectedOptions.length >= +sessionStorage.getItem('squadLimit')}
//                                                                 clos
                                                                
                                                                
//                                                             />
//                                                         </Form.Group>

//                                                     </Col>
//                                                     <Col md="6" className="mb-3">
//                                                         {/* <Form.Label md="6" htmlFor="validationDefault01">Search Player</Form.Label>
//                                                         <Form.Control type="email" id="validationDefault01" name="username" /> */}
//                                                     </Col>


//                                                 </Row>

//                                             </Form>
//                                         </div>
//                                         <button type="button" name="next" className="btn btn-primary next action-button float-end" value="Submit" onClick={() =>addPlayersToSquad()} >Submit</button>
//                                         <button type="button" name="previous" className="btn btn-dark previous action-button-previous float-end me-1" value="Previous" onClick={() => AccountShow('Account')} >Previous</button>
//                                     </fieldset>

//                                 </Form>
//                             </Card.Body>
//                         </Card>
//                     </Col>

//                 </Row>

//             </div>

//             <Modal show={showModal} onHide={showEdit} >
//                 <Modal.Header className="btnw" closeButton>
//                     <Modal.Title as="h5">Import Teams</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form onSubmit={importTeam.bind(this)}>
//                         <Row>


//                             <Col md="12" className="mb-3">
//                                 <Form.Group className="form-group">
//                                     <Form.Label htmlFor="exampleFormControlSelect1"> Tournaments</Form.Label>
//                                     <Form.Select required className="form-select" id="exampleFormControlSelect1" onChange={(e) => selectedTournament(e.currentTarget.value)}>
//                                         <option value=''>Select Tournament</option>
//                                         {tournamentList.map(({ Tournamentid, TournamentName }, index) => <option value={Tournamentid} >{TournamentName}</option>)}
//                                     </Form.Select>
//                                 </Form.Group>
//                             </Col>

//                             <Col md="12" className="mb-3">
//                                 <Form.Group className="form-group">
//                                     <Form.Label htmlFor="exampleFormControlSelect1"> Teams</Form.Label>
//                                     <Form.Select required className="form-select" id="exampleFormControlSelect1" onChange={(e) => fetchTeamPlayers(e.currentTarget.value)}>
//                                         <option value=''>Select Team</option>
//                                         {teams.map(({ teamid, teamname }, index) => <option value={teamid} >{teamname}</option>)}
//                                     </Form.Select>
//                                 </Form.Group>
//                             </Col>

//                             <Col md="12" className="mb-3">
//                                 <Form.Group className="form-group">
//                                     <Form.Label htmlFor="exampleFormControlSelect1"> Players</Form.Label>
//                                     <div class="bd-example">
//                                         {displayPlayers}
//                                     </div>
//                                 </Form.Group>
//                             </Col>

//                         </Row>
//                         <Form.Group>
//                             <Button variant="btn btn-primary" style={{ float: 'right' }} type="submit">Import</Button>

//                         </Form.Group>
//                         <div style={{ marginTop: '40px' }}></div>
//                     </Form>

//                 </Modal.Body>
//                 {/* <Modal.Footer>
//                 <Button variant="secondary" >Close</Button>
//                 <Button variant="primary" >Save changes</Button>
//             </Modal.Footer> */}
//             </Modal>

//             <Modal show={showModal1} onHide={showEdit1} >
// <Modal.Header className="btnw" closeButton>
//     <Modal.Title as="h5">What do you want to do ?</Modal.Title>
// </Modal.Header>
// <Modal.Body>
//     <Form onSubmit={importTeam.bind(this)}>
//         <Row>


//             <Col md="6" className="mb-3">
//             <Button variant="btn btn-warning" style={{ float: 'right' }} onClick={()=>addRemovePlayerFromSquad(playerId,'no')}>Remove from playing 11</Button>
//             </Col>

//             <Col md="6" className="mb-3">
//             <Button variant="btn btn-danger" style={{ float: 'right' }} onClick={removePlayer} >Remove from team squad</Button>
//             </Col>

           

//         </Row>
 
//         <div style={{ marginTop: '40px' }}></div>
//     </Form>

// </Modal.Body>

// </Modal>

// <Modal show={showModal2} onHide={showEdit2} >
//                 <Modal.Header className="btnw" closeButton>
//                     <Modal.Title as="h5">Add Player</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                 <div class="mb-3">
//             <input type="text" class="form-control form-control-lg" placeholder='Search....' aria-label="Large file input example" onChange={handleSearchChange}/>
//         </div>

//                 <ol class="list-group list-group-numbered" style={{height:'300px',overflow:'scroll'}}>
//         {displayAllPlayers}
       
//     </ol>

//                 </Modal.Body>
    
//             </Modal>

//         </>
//     )
// }

// const mapStateToProps = (state) => {
//     return {
//         showLoading: state.auth.showLoading
//     }
// }

// export default connect(mapStateToProps)(EditTeams);
