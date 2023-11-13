import { Row, Col, Image, Form, Button, Modal } from 'react-bootstrap'
import React, { useEffect } from 'react'

import Alert from '../../../components/toast/toast'
import { loadingToggleAction } from "../../../store/action/common";
import store from "../../../store/store";
import ApiService from '../../../services/service'
import { API_NAME } from '../../../utils/constants';

import avatars11 from '../../../assets/images/header/profile.png'

import { useState } from 'react';
import ReactPaginate from 'react-paginate';

import { ToastContainer } from 'react-toastify'
import Spinner from '../../../components/loader/loader'
import { connect } from 'react-redux'

import '../../../assets/scss/hope-ui.scss'


import './list.scss'



const PlayerList = (props) => {

    const [showModal, setShowModal] = useState(false)
    const [players, setPlayers] = React.useState([])
    const [search, setNewSearch] = React.useState("");
    const [pageNumber, setPageNumber] = React.useState(0)

    const [name, setName] = useState('')
    const [mob, setMob] = useState('')
    const [dob, setDob] = useState('')
    const [role, setRole] = useState('')
    const [bat, setBat] = useState('')
    const [bowl, setBowl] = useState('')
    const [email, setEmail] = useState('')
    const [img, setImg] = useState('')
    const [id, setId] = useState('')





    const filtered = !search
      ? players
      : players.filter((players) =>
      players.playername.toLowerCase().includes(search.toLowerCase()) ||  players.playermobile.toString().toLowerCase().includes(search.toLowerCase()) || players.playerrole.toString().toLowerCase().includes(search.toLowerCase()) 
   );

    const playersPerPage = 8
   const pagesVisited = pageNumber * playersPerPage

   const pageCount = Math.ceil(filtered.length / playersPerPage)

   const changePage = ({ selected }) => {
      setPageNumber(selected)
   }

   const showEdit = (item) => {
    
    if (showModal)
        setShowModal(false)
    else
    {
        setShowModal(true)
        setImg(item.imgdata)
    }
       
 console.log(item)
 
 if(item!==undefined)
 {

    const today = new Date(item['dob']);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    setName(item['playername'])
    setMob(item['playermobile'])
    setDob(yyyy+'-'+mm+'-'+dd)
    setEmail(item['email'])
    setRole(item['playerrole'])
    setBat(item['batting'])
    setBowl(item['bowling'])
    setImg(item['imgdata'])
    setId(item['playerid'])
 }

       
}

const handleFileRead = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    setImg(base64)
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

const onUpate = (event)=>{
    event.preventDefault();
    const data = {
        playername: document.getElementById('mname').value,
        playermobile: document.getElementById('mmobile').value,
        dob: document.getElementById('mdob').value,
        playerrole: document.getElementById('mrole').value,
        email: document.getElementById('memail').value,
        imgdata: img,
        batting: document.getElementById('mbat').value,
        bowling: document.getElementById('mbowl').value,
        playerid:id
} 

store.dispatch(loadingToggleAction(true))
console.log('Component : Edit  Player')
console.log("Request : " + JSON.stringify(data))

ApiService.postData(API_NAME.EDIT_PLAYER, data).then(
   (resData) => {
      if(resData.statusCode === '00')
      {
         store.dispatch(loadingToggleAction(false))
         Alert('00', resData.message)
         fetchPlayer()
         setShowModal(false)
        
      }
      else
      {
         store.dispatch(loadingToggleAction(false))
         Alert('01', resData.message)
         setShowModal(false)
      }
     

   }
).catch((err) => {
   store.dispatch(loadingToggleAction(false))
   Alert('01', err.message)
   setShowModal(false)

});
     
}

   const displayPlayers = filtered
   .slice(pagesVisited, pagesVisited + playersPerPage)
   .map((item, idx) => {
      return (
        <Col key={idx} lg="3" style={{ backgroundColor: 'rgba(#6c757d , 0.1)', borderRadius: '0.5 rem' }}>
        <div className="col">
            <div className="card iq-product-custom-card animate:hover-media">
                <div className="iq-product-hover-img position-relative animate:hover-media-wrap">
                    <a>
                    {/* <img src={item.imgdata==='' || item.imgdata==null  ?avatars11 : item.imgdata} alt="product-details" className="img-fluid iq-product-img hover-media   " />  */}
                    <img src={avatars11} alt="product-details" className="img-fluid iq-product-img hover-media   " /> 
                    </a>
                    <div className="iq-product-card-hover-effect-1 iq-product-info" >
                        <a role="button" tabindex="0" className="btn btn-icon iq-product-btn rounded-pill wishlist-btn">
                            <span className="btn-inner" onClick={() => showEdit(item)}>
                                
                                <svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" className="text-danger" height="24" viewBox="0 0 24 24" id="edit" fill="currentColor"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                                </svg>
                            </span>
                        </a>
                    </div>

                </div>
                <div className="card-body ">
                 <div class="d-flex gap-3">
                     <div class="date-of-event">
                         <span>{item.dob !=null && !isNaN(new Date(item.dob)) ? (new Date(item.dob).toLocaleString('default', { month: 'short' })):'Jan'}</span>
                         <h5 className="text-primary">{item.dob !=null && !isNaN(new Date(item.dob))  ? (new Date(item.dob).getDate().toString().padStart(2, "0")):'00'}</h5>
                     </div>
                     <div class="events-detail">
                         <h5><a href="../social-app/event-detail.html">{(item.playername).replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})}</a></h5>
                         {item.playerrole==='wk' ? <p >Wicket Keeper</p> : ''}
                        {item.playerrole==='all' ? <p >All Rounder</p> : ''}
                        {item.playerrole==='bowl' ? <p >Bowler</p> : ''}
                        {item.playerrole==='bat' ? <p >Batsman</p> : ''}
                       
                     </div>
                    
                 </div>
                 <div class="d-flex  align-items-center gap-3" style={{marginLeft:'-10px'}}>
                                    <div class="bg-soft-primary p-2 rounded">
                                    <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0317 12.9724C15.0208 16.9604 15.9258 12.3467 18.4656 14.8848C20.9143 17.3328 22.3216 17.8232 19.2192 20.9247C18.8306 21.237 16.3616 24.9943 7.6846 16.3197C-0.993478 7.644 2.76158 5.17244 3.07397 4.78395C6.18387 1.67385 6.66586 3.08938 9.11449 5.53733C11.6544 8.0765 7.04266 8.98441 11.0317 12.9724Z" fill="currentColor"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h6 className='text-warning'>{item.playermobile}</h6>
                                        
                                    </div>
                                </div>

                </div>
            </div>
        </div>
    </Col>
      )
   })

   

    const fetchPlayer = () => {
        store.dispatch(loadingToggleAction(true))
        console.log('Component : Player List')
        console.log("Request : Get")
        ApiService.getData(API_NAME.PLAYER).then(
           (resData) => {
  
              if(resData.statusCode==='00')
              {
                 store.dispatch(loadingToggleAction(false))
                 Alert('00', resData.message)
                 console.log('===================================')
                 setPlayers(resData.data)
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
  
     useEffect(() => {
        fetchPlayer();
     }, [])

  
     const handleSearchChange = (e) => {
        console.log(e.target.value)
        setNewSearch(e.target.value);
        setPageNumber(0)
     }

    return (
        <>
         <ToastContainer />
         <Spinner loading={props.showLoading} />
        <Row>


            <Form id="exform">
                <Row style={{ marginTop:'50px' }} className='justify-content-end'>
                   { players.length > 0 ?<Col md="3" className="mb-3" >
                        <input class="form-control form-control-lg" placeholder="Search Players..." id="name" type="text"  onChange={handleSearchChange} aria-label=".form-control-lg example"  />
                    </Col> : ''}
                </Row>
            </Form>

            {displayPlayers}



            <Modal show={showModal} onHide={showEdit} scrollable={true} >
                    <Modal.Header className="btnw" closeButton>
                        <Modal.Title as="h5">Edit Player</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

       

                        <Form onSubmit={onUpate}>
                            <Row>
                                <Col md="12" className="mb-3" style={{ textAlign: 'center' }}>
                                <Image style={{ width: '80px' }} className="  img-fluid rounded-circle card-img" src={avatars11} alt="profile-pic" />
                                    {/* <Image style={{ width: '80px' }} className="  img-fluid rounded-circle card-img" src={img===''?avatars11 : img} alt="profile-pic" /> */}
                                </Col>
                                <Col md="12" className="mb-3">
                                    <Form.Label md="6" htmlFor="validationDefault01">Name</Form.Label>
                                    <Form.Control type="text" defaultValue={name}  id="mname" required />
                                </Col>
                                <Col md="12" className="mb-3">
                                    <Form.Label md="6" htmlFor="validationDefault01">Mobile No</Form.Label>
                                    <Form.Control type="text" defaultValue={mob}   id="mmobile" required />
                                </Col>
                                <Col md="6" className="mb-3">
                                    <Form.Label htmlFor="validationDefault02">DOB</Form.Label>
                                    <Form.Control type="date"    id="mdob" defaultValue={dob} required/>
                                </Col>
                                <Col md="6" className="mb-3">
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="exampleFormControlSelect1"> Role</Form.Label>
                                        <select required className="form-select" defaultValue={role} id="mrole">
                                            <option >Select role</option>
                                            <option value="bat">Batsman</option>
                                       <option value="bowl">Bowler</option>
                                       <option value="all">All Rounder</option>
                                       <option value="wk">Wicket Kepper</option>
                                        </select>
                                    </Form.Group>
                                </Col>
                                <Col md="6" className="mb-3">
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="exampleFormControlSelect1"> Batting Style</Form.Label>
                                        <select className="form-select" defaultValue={bat} id="mbat">
                                            <option>Select batting style</option>
                                            <option value="right_hand">Right Hand Batsman</option>
                                       <option value="left_hand">Left Hand Batsman</option>
                                        </select>
                                    </Form.Group>
                                </Col>
                                <Col md="6" className="mb-3">
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="exampleFormControlSelect1"> Bowling Style</Form.Label>
                                        <select className="form-select" defaultValue={bowl} id="mbowl">
                                            <option>Select bowling style</option>
                                            <option value="right_arm">Right Arm Bowler</option>
                                       <option value="left_arm">Left Arm Bowler</option>
                                        </select>
                                    </Form.Group>
                                </Col>
                                <Col md="12" className="mb-3">
                                    <Form.Label htmlFor="validationDefault02">Email</Form.Label>
                                    <Form.Control type="email" defaultValue={email} id="memail"/>
                                </Col>
                                <Col md="6" className="mb-3">
                                    <Form.Label className="custom-file-input">Image</Form.Label>
                                    <Form.Control type="file" onChange={e => handleFileRead(e)} id="mimg" />
                                </Col>

                            </Row>
                            <Form.Group>
                                <Button variant="btn btn-primary" style={{ float: 'right' }} type="submit">Update</Button>

                            </Form.Group>
                            <div style={{ marginTop: '40px' }}></div>
                        </Form>

                    </Modal.Body>
                    {/* <Modal.Footer>
                <Button variant="secondary" >Close</Button>
                <Button variant="primary" >Save changes</Button>
            </Modal.Footer> */}
                </Modal>



          
          

        </Row>
        {filtered.length > 0 ? <ReactPaginate
               previousLabel={"Previous"}
               nextLabel={"Next"}
               pageCount={pageCount}
               onPageChange={changePage}
               breakClassName={'page-item'}
               breakLinkClassName={'page-link'}
               containerClassName={'pagination'}
               pageClassName={'page-item'}
               pageLinkClassName={'page-link'}
               previousClassName={'page-item'}
               previousLinkClassName={'page-link'}
               nextClassName={'page-item'}
               nextLinkClassName={'page-link'}
               activeClassName={'active'}
               className="pagination pagination-md flex-wrap justify-content-center"
            /> : ' '}
    
</>


    )
}

const mapStateToProps = (state) => {
    return {
       showLoading: state.auth.showLoading
    }
 }

export default connect(mapStateToProps)(PlayerList);