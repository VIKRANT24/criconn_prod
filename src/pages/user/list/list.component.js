import React, { useEffect } from 'react'
import { Row, Col, Image, Form, Button, Modal } from 'react-bootstrap'
import Card from '../../../components/card/card'

// img
import shap1 from '../../../assets/images/header/profile.png'

import { ToastContainer } from 'react-toastify'
import Spinner from '../../../components/loader/loader'
import { connect } from 'react-redux'

import Alert from '../../../components/toast/toast'
import { loadingToggleAction } from "../../../store/action/common";
import store from "../../../store/store";
import ApiService from '../../../services/service'
import { API_NAME } from '../../../utils/constants';

import ReactPaginate from 'react-paginate';

import './list.scss'


const UserList = (props) => {

   const [users, setUsers] = React.useState([])
   const [value, setValue] = React.useState('');
   const [uid, setUid] = React.useState('');
   const [search, setNewSearch] = React.useState("");
   const [pageNumber, setPageNumber] = React.useState(0)
   const [showModal, setShowModal] = React.useState(false)

   
   const filtered = !search
   ? users
   : users.filter((users) =>
       users.username.toLowerCase().includes(search.toLowerCase())
     );
   


      const usersPerPage = 5
      const pagesVisited = pageNumber * usersPerPage
   
      const pageCount = Math.ceil(filtered.length / usersPerPage)
   
      const changePage = ({ selected }) => {
         setPageNumber(selected)
      }

      const showEdit = (id) => {
         if (showModal)
             setShowModal(false)
         else
             setShowModal(true)
         
         setUid(id)    
     }

      const displayUsers = filtered
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map((item, idx) => {
         return (
            <tr key={idx}>
               <td className="text-center"><Image className="bg-soft-primary rounded img-fluid avatar-40 me-3" src={shap1} alt="profile" /></td>
               <td>{item.username}</td>
               {item.password === '' ? <td><div>-</div></td> : <td><div className="showhim"><div className='showme'>{item.password}</div><div className="ok">****</div></div></td>}
               {item.TournamentName === '' || item.TournamentName === null || item.TournamentName === undefined ? <td>-</td> : <td>{item.TournamentName}</td>}
               {item.userstate === 'Active' ? <td><span className='badge bg-success'  >{item.userstate}</span></td> : <td><span className='badge bg-danger'  >{item.userstate}</span></td>}
               <td  onClick={() => showEdit(item.user_id)}><div className="flex align-items-center list-user-action">
               
                   <span className="btn-inner">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" className="text-secondary" height="24" viewBox="0 0 24 24" id="edit" fill="currentColor"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>                                    
                   </span>
                
              
             </div></td>
            </tr>
         )
      })

   const fetchUsers = () => {
      store.dispatch(loadingToggleAction(true))
      console.log('Component : User List')
      console.log("Request : Get")
      ApiService.getData(API_NAME.USER).then(
         (resData) => {

            if(resData.statusCode==='00')
            {
               store.dispatch(loadingToggleAction(false))
               Alert('00', resData.message)
               console.log('===================================')
               setUsers(resData.data)
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

   const handleSearchChange = (e)=>{
     console.log(e.target.value)
     setNewSearch(e.target.value);
     setPageNumber(0)
   }

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
         user_id: uid,
         password: value.newpass[0]
      }

      console.log('Component : User List')
      console.log("Request : " + JSON.stringify(params))

      ApiService.postData(API_NAME.RESET_PASSWORD,params).then(
         (resData) => {
            if(resData.statusCode==0)
            {
               store.dispatch(loadingToggleAction(false))
               Alert('00', resData.message)
               setPageNumber(0)
               setShowModal(false)
               setUsers([])
               fetchUsers()
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

      });
   }

   useEffect(() => {
      fetchUsers();
   }, [])

   return (
      <>
         <ToastContainer />
         <Spinner loading={props.showLoading} />
         <div>
            <Row>
               <Col sm="12">
                  <Card>
                     <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                           <h4 className="card-title">Scorer List</h4>
                        </div>
                        <div id="datatable_filter" class="dataTables_filter"><label><input type="search" onChange={handleSearchChange} class="form-control form-control-sm" placeholder="Search..." aria-controls="datatable" spellcheck="false" data-ms-editor="true"/></label></div>
                     </Card.Header>
                     <Card.Body className="px-0">
                        <div className="table-responsive">
                           <table id="user-list-table" className="table table-striped" role="grid" data-toggle="data-table">
                              <thead>
                                 <tr className="ligth">
                                    <th>Profile</th>
                                    <th>User</th>
                                    <th>Password</th>
                                    <th>Tournament</th>
                                    <th>Status</th>
                                    <th>Reset Password</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {displayUsers}
                              </tbody>
                           </table>
                        </div>
                     </Card.Body>
                  </Card>
               </Col>

               <Modal show={showModal} onHide={showEdit} >
                    <Modal.Header className="btnw" closeButton>
                        <Modal.Title as="h5">Reset Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form onSubmit={onResetPassword.bind(this)}>
                            <Row>
                                <Col md="12" className="mb-3">
                                    <Form.Label md="6" htmlFor="validationDefault01">New Password</Form.Label>
                                    <Form.Control type="password" id="validationDefault01" name="newpass" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required  />
                                </Col>
                                <Col md="12" className="mb-3">
                                    <Form.Label md="6" htmlFor="validationDefault01">Confirm Password</Form.Label>
                                    <Form.Control type="password" id="validationDefault01" name="cnpass"  onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })}  required />
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
         </div>
      </>
   )

}

const mapStateToProps = (state) => {
   return {
      showLoading: state.auth.showLoading
   }
}

export default connect(mapStateToProps)(UserList);