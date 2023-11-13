import React, { useEffect } from 'react'
import { Row, Col, Form, Button,Modal } from 'react-bootstrap'
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

import Select from 'react-select';

const TournamentAdd = (props) => {




   const [value, setValue] = React.useState('');
   const [ballType, setBallType] = React.useState('');
   const [tournamentType, setTournamentType] = React.useState('');
   const [noOfGroup, setNoOfGroup] = React.useState('');
   const [tournaments, setTournaments] = React.useState([])
   const [flag, setFlag] = React.useState(false);
   const [grounds, setGrounds] = React.useState(false);
   const [showModal, setShowModal] = React.useState(false)
   const [tourCategory, setTourCategory] = React.useState('');
   const [pitchType, setPitchType] = React.useState('');
   const [placeTour, setPlaceTour] = React.useState('');
   const [newGround, setNewGround] = React.useState('');
   const [selectedGrounds,setSelectedGrounds] = React.useState('');
   const [groundMaster, setGroundMaster] = React.useState([])
   const [commMaster, setCommMaster] = React.useState([])
   const [selectedCommm,setSelectedComm] = React.useState('');
   const [umpireMaster, setUmpireMaster] = React.useState([])
   const [selectedUmpire,setSelectedUmpire] = React.useState('');
   const [banner, setBanner] = React.useState();
   const [bannerName, setBannerName] = React.useState("");
   const [logo, setLogo] = React.useState();
   const [logoName, setLogoName] = React.useState("");
   const [showModalU, setShowModalU] = React.useState(false)
   const [showModalC, setShowModalC] = React.useState(false)

   let history = useNavigate();




   const autoCompleteRef = React.useRef();
   const inputRef = React.useRef();
   const autoCompleteRefAdd = React.useRef();
   const inputRefAdd = React.useRef();
   const options = {
      componentRestrictions: { country: "in" },
      fields: ["address_components", "geometry", "icon", "name"],
      types: ["establishment"]
   };

   const createTournament = (data) => {

      store.dispatch(loadingToggleAction(true))
      console.log(data)

      console.log('Component : Tournament')

      ApiService.postData(API_NAME.ADD_TOURNAMENT, data).then(
         (resData) => {
            store.dispatch(loadingToggleAction(false))
            Alert('00', resData.message)
            document.getElementById("tourForm").reset();
            setBallType('')
            setTournamentType('')
            setNoOfGroup('')
            setTimeout(history('/home/all-tournaments'), 6000);

            if(banner)
            uploadProfile(banner,bannerName)
            if(logo)
            uploadProfile(logo,logoName)



         }
      ).catch((err) => {
         store.dispatch(loadingToggleAction(false))
         Alert('01', err.message)
         document.getElementById("tourForm").reset();
         setBallType('')
         setTournamentType('')
         setNoOfGroup('')

      });
   }

   const uploadProfile =(file,fileName) =>{
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", fileName);
      console.log('Upload Request : '+formData)
      ApiService.postData(API_NAME.UPLOAD_IMAGE+'?filename='+fileName+'&'+'folder=tournament',formData).then(
         (resData) => {
          console.log(resData)
         }
      ).catch((err) => {
         console.log(err)
      });
    }

   const onTournament = (event) => {

      let data1 = selectedGrounds
      const groundIds = []
      data1.forEach(element => {
         groundIds.push(element.value)
      });

      let data2 = selectedUmpire
      const umpires = []
      data2.forEach(element => {
         umpires.push(element.value)
      });

      let data3 = selectedCommm
      const comms = []
      data3.forEach(element => {
         comms.push(element.value)
      });

      event.preventDefault();
      let data = {
         tour_id:'0',
         tour_name:value.tourName[0],
         current_season:1,
         creator_mobile:sessionStorage.getItem('mobile_no'),
         creator_id:sessionStorage.getItem('user_uid'),
         tour_banner:bannerName ? bannerName:'',
         tour_logo:logoName ? logoName:'',
         squad_limit:value.sLimit[0],
         place:placeTour,
         ground_id:groundIds.join(),
         tour_type:tournamentType,
         tour_category:tourCategory,
         pitch_type:pitchType,
         ball_type:ballType,
         umpire_ids:umpires.join(),
         commentator_ids:comms.join(),
         start_date:value.startdate[0],
         end_date:value.enddate[0]
      }
      console.log(data)
     createTournament(data)
   }

   const selectedTournamentId = (id) => {
      if (id === '') {
         setBallType('')
         setTournamentType('')
         setNoOfGroup('')

         document.getElementById('tourName').value = ('')
         document.getElementById('place').value = ('')
         document.getElementById('sLimit').value = ('')
         document.getElementById('startdate').value = ('')
         document.getElementById('enddate').value = ('')
         setFlag(false)
         return;
      }
      else {
         setFlag(true)
         console.log(id)
         let data = tournaments.filter((tournaments) =>
            tournaments.Tournamentid == id)

         setBallType(data[0].Ball_type)
         setTournamentType(data[0].tournament_type)
         setNoOfGroup(data[0].No_of_Groups)

         document.getElementById('tourName').value = (data[0].TournamentName)
         document.getElementById('place').value = (data[0].Place)
         document.getElementById('sLimit').value = (data[0].Squad_limit)
         document.getElementById('startdate').value = (data[0].startdate)
         document.getElementById('enddate').value = (data[0].enddate)


         console.log(data)

      }
   }

   const fetchTournaments = (tag) => {
      store.dispatch(loadingToggleAction(true))
      ApiService.getData(API_NAME.TOURNAMENT_LIST).then(
         (resData) => {

            if (resData.statusCode === '00') {
               store.dispatch(loadingToggleAction(false))
               setTournaments(resData.data)
               console.log('===================================')
            }
            else {
               store.dispatch(loadingToggleAction(false))
               console.log('==================================')
            }


         }
      ).catch((err) => {
         store.dispatch(loadingToggleAction(false))
         console.log('==================================')

      });
   }

   const fetchGrounds = (tag) => {

      ApiService.getData(API_NAME.GROUND_LIST).then(
         (resData) => {

            if (resData.statusCode === '00') {
               var groundData = []
               resData.data.forEach(element => {
                  groundData.push({ value: element.ground_id, label: element.ground_name })
               });
               setGroundMaster(groundData)
               console.log('===================================')
            }
            else {
               console.log('==================================')
            }


         }
      ).catch((err) => {
         console.log('==================================')

      });
   }

   const fetchCommentators = (tag) => {

      ApiService.getData(API_NAME.GET_COMMENTATOR).then(
         (resData) => {

            if (resData.statusCode === '00') {
               var commData = []
               resData.data.forEach(element => {
                  commData.push({ value: element.coment_id, label: element.coment_name })
               });
               setCommMaster(commData)
               console.log('===================================')
            }
            else {
               console.log('==================================')
            }


         }
      ).catch((err) => {
         console.log('==================================')

      });
   }

   const fetchUmpires = (tag) => {

      ApiService.getData(API_NAME.GET_UMPIRE).then(
         (resData) => {

            if (resData.statusCode === '00') {
               var commData = []
               resData.data.forEach(element => {
                  commData.push({ value: element.umpire_id, label: element.umpire_name })
               });
               setUmpireMaster(commData)
               console.log('===================================')
            }
            else {
               console.log('==================================')
            }


         }
      ).catch((err) => {
         console.log('==================================')

      });
   }

   const showEdit = () => {
     

   
      if (showModal)
          setShowModal(false)
      else
      {
          setShowModal(true)
      }
   }

   const showEditUmpire = () => {
     

   
      if (showModalU)
          setShowModalU(false)
      else
      {
          setShowModalU(true)
      }
   }

   const showEditCom = () => {
   
      if (showModalC)
          setShowModalC(false)
      else
      {
          setShowModalC(true)
      }
   }

   const onInputChange = (selected,context) => {
      setSelectedGrounds(selected)
    };

    const onInputChangeUmpire = (selected,context) => {
      setSelectedUmpire(selected)
    };

    const onInputChangeComm = (selected,context) => {
      setSelectedComm(selected)
    };

    const onGroundAdd = (event) => {
     const data = newGround
     let params = {
      ground_name:data.split(',')[0],
      ground_latlong:data.split(',')[1]+','+data.split(',')[2],
      ground_id:data.split(',')[3]
     }
     console.log(params)

     ApiService.postData(API_NAME.ADD_GROUND,params).then(
      (resData) => {

         if (resData.statusCode === '00') {
            Alert('00', resData.message)
            console.log('===================================')
            setShowModal(false)
         }
         else {
            Alert('01', resData.message)
            console.log('==================================')
            setShowModal(false)
         }


      }
   ).catch((err) => {
      console.log('==================================')
      setShowModal(false)

   });

    }

    const onUmpireAdd = (event) => {
   
      let params = {
       umpire_name:value.umpireName[0],
       umpire_mobile:value.umpireMob[0],
       umpire_location:'',
       umpire_image:'',
      }
      console.log(params)
 
      ApiService.postData(API_NAME.ADD_UMPIRE,params).then(
       (resData) => {
 
          if (resData.statusCode === '00') {
             Alert('00', resData.message)
             console.log('===================================')
             setShowModalU(false)
          }
          else {
             Alert('01', resData.message)
             console.log('==================================')
             setShowModalU(false)
          }
 
 
       }
    ).catch((err) => {
       console.log('==================================')
       setShowModalU(false)
 
    });
 
     }

     const onCommAdd = (event) => {
      let params = {
       coment_name:value.comName[0],
       coment_mobile:value.comMob[0],
       coment_location:'',
       coment_image:'',
      }
      console.log(params)
 
      ApiService.postData(API_NAME.ADD_COMMENTATOR,params).then(
       (resData) => {
 
          if (resData.statusCode === '00') {
             Alert('00', resData.message)
             console.log('===================================')
             setShowModalC(false)
          }
          else {
             Alert('01', resData.message)
             console.log('==================================')
             setShowModalC(false)
          }
 
 
       }
    ).catch((err) => {
       console.log('==================================')
       setShowModalC(false)
 
    });
 
     }


  
   

   useEffect(() => {

      // if(tournaments.length==0)
      // {
      // if (sessionStorage.getItem('all_tournament') != '' && sessionStorage.getItem('all_tournament') != undefined)
      //    setTournaments(JSON.parse(sessionStorage.getItem('all_tournament')))
      // else
      //    fetchTournaments()

   
      // }
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
         inputRef.current,
         { types: ['(cities)'] }
      );

      autoCompleteRef.current.addListener("place_changed", async function () {
         const place = await autoCompleteRef.current.getPlace();
         console.log({place})
         console.log(place.name, place.geometry.location.lat(), place.geometry.location.lng(),place.place_id)
         setPlaceTour(place.name)
      });

     
    
      autoCompleteRefAdd.current = new window.google.maps.places.Autocomplete(
         inputRefAdd.current,
        // { types: ['(regions)'] }
      );
      
      autoCompleteRefAdd.current.addListener("place_changed", async function () {
         const place = await autoCompleteRefAdd.current.getPlace();
         console.log({place})
         console.log(place.name, place.geometry.location.lat(), place.geometry.location.lng(),place.place_id)
         setNewGround(place.name+','+ place.geometry.location.lat()+','+ place.geometry.location.lng()+','+place.place_id)
   
      });

      fetchGrounds()
      fetchCommentators()
      fetchUmpires()
     
   }, [showModal,showModalC,showModalU])

   const handleFileRead = async (e,type) => {
      if(type=='logo')
      {
         setLogo(e.target.files[0]);
         setLogoName(e.target.files[0].name);
      }
      else{
         setBanner(e.target.files[0]);
      setBannerName(e.target.files[0].name);
      }
    
    }

    

   return (
      <>
         <ToastContainer />
         <Spinner loading={props.showLoading} />
         <div>
            <Row>

               <Modal show={showModal} onHide={showEdit} scrollable={true} >
                  <Modal.Header className="btnw" closeButton>
                     <Modal.Title as="h5">Add New Ground</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <Row  >
                     <Col md="9" className="mb-3" >
                                 <Form.Control type="text" id="place" ref={inputRefAdd} name="place" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
                        </Col>
                              <Col md="3" className="mb-3">
                              <Button variant="btn btn-primary" type="submit" onClick={onGroundAdd}>Add</Button>
                              </Col>         
                     </Row>
                  </Modal.Body>
               </Modal>

               <Modal show={showModalU} onHide={showEditUmpire} scrollable={true} >
                  <Modal.Header className="btnw" closeButton>
                     <Modal.Title as="h5">Add New Umpire</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <Row  >
                     <Col md="12" className="mb-3">
                                 <Form.Label md="6" htmlFor="validationDefault01">Mobile No.</Form.Label>
                                 <Form.Control type="text"  name="umpireMob" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
                              </Col>  
                              <Col md="12" className="mb-3">
                                 <Form.Label md="6" htmlFor="validationDefault01">Name</Form.Label>
                                 <Form.Control type="text"  name="umpireName" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
                              </Col>      
                              <Col md="12" className="mb-3">
                                 <Form.Label className="custom-file-input">Profile Image</Form.Label>
                                 <Form.Control type="file" accept="image/png, image/gif, image/jpeg"  onChange={e => handleFileRead(e,'banner')}  />
                              </Col>
                              <Col md="12" className="mb-3">
                              <Button variant="btn btn-primary" type="submit" style={{float:'right'}} onClick={onUmpireAdd}>Add</Button>
                              </Col>  
                     </Row>
                  </Modal.Body>
               </Modal>

               <Modal show={showModalC} onHide={showEditCom} scrollable={true} >
                  <Modal.Header className="btnw" closeButton>
                     <Modal.Title as="h5">Add New Commentator</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <Row  >
                     <Col md="12" className="mb-3">
                                 <Form.Label md="6" htmlFor="validationDefault01">Mobile No.</Form.Label>
                                 <Form.Control type="text"  name="comMob" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
                              </Col>  
                              <Col md="12" className="mb-3">
                                 <Form.Label md="6" htmlFor="validationDefault01">Name</Form.Label>
                                 <Form.Control type="text"  name="comName" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
                              </Col>      
                              <Col md="12" className="mb-3">
                                 <Form.Label className="custom-file-input">Profile Image</Form.Label>
                                 <Form.Control type="file" accept="image/png, image/gif, image/jpeg"  onChange={e => handleFileRead(e,'banner')}  />
                              </Col>
                              <Col md="12" className="mb-3">
                              <Button variant="btn btn-primary" type="submit" style={{float:'right'}} onClick={onCommAdd}>Add</Button>
                              </Col>  
                     </Row>
                  </Modal.Body>
               </Modal>

               <Col xl="12">
                  <Card>
                     <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                           <h4 className="card-title">New Tournament</h4>
                        </div>
                        <Row>
                           <Col md="12" className="mb-1">

                              <Form.Control type="text" id="tourName" name="tourName" placeholder='Search Tournaments' onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} />
                           </Col>

                        </Row>
                     </Card.Header>
                     <Card.Body>
                        <Form onSubmit={onTournament.bind(this)} id="tourForm">
                           <Row>
                              <Col md="6" className="mb-3">
                                 <Form.Label md="6" htmlFor="validationDefault01">Creator</Form.Label>
                                 <Form.Control type="text" disabled name="tourName" value={sessionStorage.getItem('full_name')} />
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Label md="6" htmlFor="validationDefault01">Mobile No.</Form.Label>
                                 <Form.Control type="text" disabled name="tourName" value={sessionStorage.getItem('mobile_no')} />
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Label className="custom-file-input">Tournament Banner</Form.Label>
                                 <Form.Control type="file" accept="image/png, image/gif, image/jpeg"  onChange={e => handleFileRead(e,'banner')}  />
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Label className="custom-file-input">Tournament Logo</Form.Label>
                                 <Form.Control type="file" accept="image/png, image/gif, image/jpeg"  onChange={e => handleFileRead(e,'logo')}  />
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Label md="6" htmlFor="validationDefault01">Tournament Name</Form.Label>
                                 <Form.Control type="text" id="tourName" name="tourName" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Label md="6" htmlFor="validationDefault01">Squad Limit</Form.Label>
                                 <Form.Control type="number" min="1" id="sLimit" name="sLimit" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Label htmlFor="validationDefault02">Tournament Start Date</Form.Label>
                                 <Form.Control type="date" min={new Date().toISOString().split('T')[0]} id="startdate" name="startdate" minDate="0" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Label htmlFor="validationDefault02">Tournament End Date</Form.Label>
                                 <Form.Control type="date" min={new Date().toISOString().split('T')[0]} id="enddate" name="enddate" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
                              </Col>

                              <Col md="6" className="mb-3">
                                 <Form.Label md="6" htmlFor="validationDefault01">Place</Form.Label>
                                 <Form.Control type="text" id="place" ref={inputRef} name="place" defaultValue={placeTour} required />
                              </Col>
                              <Col md="5" className="mb-3">
                                 <Form.Group className="form-group">
                                    <Form.Label htmlFor="choices-multiple-default">Ground</Form.Label>
                                    <Select required isMulti
                                       onChange={onInputChange}
                                       placeholder="Select Grounds"
                                       options={groundMaster}
                                      

                                    />
                                 </Form.Group>

                              </Col>
                              <Col md="1" className="mb-3">
                                 <Form.Label md="6" htmlFor="validationDefault01">Add</Form.Label>
                                 <Button variant="btn btn-sm btn-primary" onClick={showEdit}>Other</Button>
                              </Col>

                              <Col md="6" className="mb-3">
                                 <Form.Group className="form-group">
                                    <Form.Label htmlFor="exampleFormControlSelect1"> Tournament Type</Form.Label>
                                    <Form.Select required className="form-select" id="exampleFormControlSelect1" value={tournamentType}
                                       onChange={(e) => setTournamentType(e.currentTarget.value)}>
                                       <option value="">Select Tournament Type</option>
                                       <option value="Knockout Tournament">Knockout Tournament</option>
                                       <option value="League Tournament">League Tournament</option>
                                    </Form.Select>
                                 </Form.Group>
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Group className="form-group">
                                    <Form.Label htmlFor="exampleFormControlSelect1"> Ball Type</Form.Label>
                                    <Form.Select required className="form-select" id="exampleFormControlSelect1" value={ballType}
                                       onChange={(e) => setBallType(e.currentTarget.value)}>
                                       <option value="">Select Ball Type</option>
                                       <option value="Tennis ball">Tennis ball</option>
                                       <option value="Leather ball">Leather ball</option>
                                       <option value="Rubber ball">Rubber ball</option>
                                    </Form.Select>
                                 </Form.Group>
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Group className="form-group">
                                    <Form.Label htmlFor="exampleFormControlSelect1"> Tournament Category</Form.Label>
                                    <Form.Select required className="form-select" id="exampleFormControlSelect1"
                                    onChange={(e) => setTourCategory(e.currentTarget.value)}
                                    >
                                       <option value="">Select Tournament Category</option>
                                       <option value="Open">Open</option>
                                       <option value="Corporate">Corporate</option>
                                       <option value="Community">Community</option>
                                       <option value="School">School</option>
                                       <option value="Series">Series</option>
                                       <option value="College">College</option>
                                       <option value="University">University</option>
                                       <option value="Gramin">Gramin</option>
                                       <option value="Other">Other</option>
                                    </Form.Select>
                                 </Form.Group>
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Group className="form-group">
                                    <Form.Label htmlFor="exampleFormControlSelect1"> Pitch Type</Form.Label>
                                    <Form.Select required className="form-select" id="exampleFormControlSelect1"
                                          onChange={(e) => setPitchType(e.currentTarget.value)}
                                    >
                                       <option value="">Select Pitch Type</option>
                                       <option value="Rough">Rough</option>
                                       <option value="Cement">Cement</option>
                                       <option value="Turf">Turf</option>
                                       <option value="Astroturf">Astroturf</option>
                                       <option value="Matting">Matting</option>

                                    </Form.Select>
                                 </Form.Group>
                              </Col>
                              <Col md="5" className="mb-3">
                                 <Form.Group className="form-group">
                                    <Form.Label htmlFor="choices-multiple-default">Umpire</Form.Label>
                                    <Select required isMulti
                                       onChange={onInputChangeUmpire}
                                       placeholder="Select Umpires"
                                       options={umpireMaster}

                                    />
                                 </Form.Group>

                              </Col>
                              <Col md="1" className="mb-3">
                                 <Form.Label md="6" htmlFor="validationDefault01">Add</Form.Label>
                                 <Button variant="btn btn-sm btn-primary" onClick={showEditUmpire}>Other</Button>
                              </Col>

                              <Col md="5" className="mb-3">
                                 <Form.Group className="form-group">
                                    <Form.Label htmlFor="choices-multiple-default">Commentator</Form.Label>
                                    <Select required isMulti
                                       onChange={onInputChangeComm}
                                       placeholder="Select Commentator"
                                       options={commMaster}

                                    />
                                 </Form.Group>

                              </Col>
                              <Col md="1" className="mb-3">
                                 <Form.Label md="6" htmlFor="validationDefault01">Add</Form.Label>
                                 <Button variant="btn btn-sm btn-primary" onClick={showEditCom}>Other</Button>
                              </Col>
                           </Row>
                           <Form.Group>
                              {flag == true ? <Button variant="btn btn-primary" style={{ float: 'left' }} type="submit">Update</Button> : <Button variant="btn btn-primary" style={{ float: 'left',width:'100%' }} type="submit">Add</Button>}
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

export default connect(mapStateToProps)(TournamentAdd);
