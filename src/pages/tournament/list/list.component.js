
import { Row, Col, Form, Button, InputGroup, FormControl, Modal, FormCheck } from 'react-bootstrap'
import Card from '../../../components/card/card';
import "./list.css"
import React, { useEffect } from 'react'

import Alert from '../../../components/toast/toast'
import { loadingToggleAction } from "../../../store/action/common";
import store from "../../../store/store";
import ApiService from '../../../services/service'
import { API_NAME } from '../../../utils/constants';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

import { ToastContainer } from 'react-toastify'
import Spinner from '../../../components/loader/loader'
import { connect } from 'react-redux'

import logo from '../../../assets/images/home/tour_bg.png'
import { useNavigate } from 'react-router-dom';
import nodata from '../../../assets/images/home/nodata.jpg'




const TournamentList = (props) => {


    let history = useNavigate() 

    const [showModal, setShowModal] = useState(false)
    const [tournaments, setTournaments] = React.useState([])
    const [pageNumber, setPageNumber] = React.useState(0)
    const [search, setNewSearch] = React.useState("");
    const [users, setUsers] = React.useState([])
    const [delPage, setDelPage] = React.useState(0)

    const [selectUser, setSelectUser] = React.useState([])
    const [selectTour, setSelectTour] = React.useState('')


   // const filtered = tournaments
    const filtered = !search
      ? tournaments
      : tournaments.filter((tournaments) =>
      tournaments.tour_name.toLowerCase().includes(search.toLowerCase())
   );

    const tournamentPerPage = 6
    const pagesVisited = pageNumber * tournamentPerPage

    const pageCount = Math.ceil(filtered.length / tournamentPerPage)

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const showEdit = (tour) => {
        document.activeElement.blur();
        setSelectTour(tour)
        if (showModal)
            setShowModal(false)
        else
            setShowModal(true)
    }

    const [role, setRole] = useState([
        {
            name: 'Admin',
            status: true
        },
    ])

    const fetchUsers = () => {
        store.dispatch(loadingToggleAction(true))
        console.log('Component : User List')
        console.log("Request : Get")
        ApiService.getData(API_NAME.USER).then(
            (resData) => {

                if (resData.statusCode === '00') {
                    store.dispatch(loadingToggleAction(false))
                    // Alert('00', resData.message)
                    console.log('===================================')
                    setUsers(resData.data)
                }
                else {
                    store.dispatch(loadingToggleAction(false))
                    //  Alert('01', resData.message)
                    console.log('==================================')
                }


            }
        ).catch((err) => {
            store.dispatch(loadingToggleAction(false))
            Alert('01', err.message)
            console.log('==================================')

        });
    }

    const fetchTournaments = (tag) => {
        store.dispatch(loadingToggleAction(true))
        console.log('Component : Tournament List')
        console.log("Request : Post")
        const params = {
            user_id :sessionStorage.getItem('user_uid')
        }
        ApiService.postData(API_NAME.TOURNAMENT_LIST,params).then(
            (resData) => {

                if (resData.statusCode === '00') {
                    store.dispatch(loadingToggleAction(false))
                    if (tag)
                    Alert('00', resData.message)
                    console.log('===================================')
                    setTournaments(resData.data)
                   // setUsers(resData.userList)
                    //sessionStorage.setItem("all_tournament",JSON.stringify(resData.data))
                }
                else {
                    store.dispatch(loadingToggleAction(false))
                    Alert('01', 'No record found. Please try again later.')
                    console.log('==================================')
                }


            }
        ).catch((err) => {
            store.dispatch(loadingToggleAction(false))
            Alert('01', err.message)
            console.log('==================================')

        });
    }

    const deleteTournament = (tourId) => {
        let params = {
            tour_id: tourId
        }
        store.dispatch(loadingToggleAction(true))
        console.log('Component : Tournament List')
        console.log("Request : Post")
        ApiService.postData(API_NAME.DELETE_TOURNAMENT, params).then(
            (resData) => {

                if (resData.statusCode === '00') {
                    store.dispatch(loadingToggleAction(false))
                    Alert('00', resData.message)
                    fetchTournaments(0);
                    setPageNumber(0);
                    setDelPage(0);
                    console.log('===================================')
                }
                else {
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

    const onUserSelect=(user)=>{
        setSelectUser(user)
    }

    const onUserAssign=(event)=>{
        event.preventDefault();
        console.log(selectUser)
        console.log(selectTour)

        let params = {
            user_id:selectUser,
            tourid: selectTour
        }
        store.dispatch(loadingToggleAction(true))
        console.log('Component : Tournament List')
        console.log("Request : " + JSON.stringify(params))
        ApiService.postData(API_NAME.ASSIGN_USER, params).then(
            (resData) => {

                if (resData.statusCode === '00') {
                    store.dispatch(loadingToggleAction(false))
                    Alert('00', resData.message)
                    fetchTournaments(0);
                    setPageNumber(0);
                    setDelPage(0);
                    setShowModal(false)
                    console.log('===================================')
                }
                else {
                    store.dispatch(loadingToggleAction(false))
                    Alert('01', resData.message)
                    setShowModal(false)
                    console.log('==================================')
                }

            }
        ).catch((err) => {
            setShowModal(false)
            store.dispatch(loadingToggleAction(false))
            Alert('01', err.message)
            console.log('==================================')

        });


        
        //api calling
    }

    const onDeleteUser = (user_id)=>
    {
    

        let params = {
            user_id:user_id,
            tourid: '-'
        }
        store.dispatch(loadingToggleAction(true))
        console.log('Component : Tournament List')
        console.log("Request : " + JSON.stringify(params))
        ApiService.postData(API_NAME.ASSIGN_USER, params).then(
            (resData) => {

                if (resData.statusCode === '00') {
                    store.dispatch(loadingToggleAction(false))
                    Alert('00', 'Delete user successfully')
                    fetchTournaments(0);
                    setPageNumber(0);
                    setDelPage(0);
                    setShowModal(false)
                    console.log('===================================')
                }
                else {
                    store.dispatch(loadingToggleAction(false))
                    Alert('01', resData.message)
                    setShowModal(false)
                    console.log('==================================')
                }

            }
        ).catch((err) => {
            setShowModal(false)
            store.dispatch(loadingToggleAction(false))
            Alert('01', err.message)
            console.log('==================================')

        });
    }

    const gotoDetail = (id,limit)=>{
       history('/home/tournament-matches')
       sessionStorage.setItem('tournamentId',id)
       sessionStorage.setItem('squadLimit',limit)
    }

    useEffect(() => {
        fetchTournaments(1);
        // fetchUsers();
    }, [])

    const handleSearchChange = (e) => {
        console.log(e.target.value)
        setNewSearch(e.target.value);
        setPageNumber(0)
     }



    const displayTournament = filtered
        .slice(pagesVisited, pagesVisited + tournamentPerPage)
        .map((item, idx) => {
            return (
                <Col lg="4" key={idx}>
                    <Card className="cardbg">
                        <div class="card-header card-thumbnail">
                            <img src={logo} alt="02" class="img-fluid w-100 rounded object-cover " loading="eager" />
                        </div>
                        <div class={"text-primary " + (item.TournamentState == 'finished' ? 'iq-ribbon-effect-green' : 'iq-ribbon-effect-red')}><span style={{ fontSize: '8px', color: '#fff' }}>{item.TournamentState == 'finished' ? 'COMPLETED' : 'ONGOING'}</span></div>
                        <Card.Body>

                            <div>
                                
                                <div class="d-flex align-items-start justify-content-between mb-2">
                                <small class="text-primary">
                                    {(new Date(item.start_date)).toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </small>
                    
                    <div class="d-flex align-items-start justify-content-between">
                    <a class="badge rounded-pill bg-soft-primary text-primary" href="javascript:void(0);"  onClick={() => gotoDetail(item.tour_id,item.squad_limit)}>
                        View
                    </a>
                    <a class="badge rounded-pill bg-soft-warning text-danger" href="javascript:void(0);" style={{marginLeft:'10px'}} onClick={() => deleteTournament(item.Tournamentid)}>
                        Delete
                    </a>
                    </div>
                   
                </div>
                                <a href="../blog/blog-detail.html" class="iq-title">
                                    <h4 class="mt-2 mb-3 text-ellipsis short-2" data-bs-toggle="tooltip" data-bs-original-title="The Ultimate Travel Guide: What To Do, See &amp; Eat.">{item.tour_name}</h4>
                                </a>
                                <div class="d-flex gap-3">
                                    <a href="../blog/blog-detail.html" class="iq-blog-adventure">{(item.tour_type).replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})}</a><span> | </span>
                                    <a href="../blog/blog-detail.html" class="iq-blog-adventure text-primary">{(item.place).replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})}</a>
                                </div>
                                {/* <Form action="#" style={{ marginTop: '30px' }}>
                                    <InputGroup className="mb-3"  onFocus={() => showEdit(item.Tournamentid)} >
                                        <FormControl type="text" placeholder="Assign user" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                        <Button type="button" className="input-group-text btn-primary" id="basic-addon2">
                                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm6 10a1 1 0 0 0 1-1 7 7 0 0 0-14 0 1 1 0 0 0 1 1z" fill="currentColor"></path>
                                            </svg>
                                        </Button>
                                    </InputGroup>
                                </Form> */}



                                <table class="table table-borderless iq-file-manager-table mb-0 mytbl" >

                                    <tbody>
                                        



                                    </tbody>
                                </table>

                            </div>


                        </Card.Body>
                    </Card>
                </Col>
            )
        })
    return (
     
        <>
            <ToastContainer />
            <Spinner loading={props.showLoading} />
            { tournaments.length == 0 ? <img src={nodata} style={{width:'100%',height:'800px'}}/> : '' }
            <Form id="exform">
                <Row style={{ marginTop:'50px' }} className='justify-content-end'>
                   { tournaments.length > 0 ?<Col md="3" className="mb-3" >
                        <input class="form-control form-control-lg" placeholder="Search Tournaments..." id="name" type="text"  onChange={handleSearchChange} aria-label=".form-control-lg example"  />
                    </Col> : ''}
                </Row>
            </Form>

            <Row>
                {displayTournament}
                <Modal show={showModal} onHide={showEdit} scrollable={true} >
                    <Modal.Header className="btnw" closeButton>
                        <Modal.Title as="h5">Select User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>
                            <Row>
                                <Col sm="12">
                                    <Card>

                                        <Card.Body>
                                            <div className="table-responsive">
                                                <table className="table table-bordered">

                                                    <tbody>
                                                
                                                    </tbody>
                                                </table>

                                            </div>
                                        </Card.Body>
                                    </Card>

                                </Col>
                            </Row>
                            <Form.Group>
                                <Button variant="btn btn-primary" style={{ float: 'right' }} onClick={onUserAssign}>Add</Button>

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
                forcePage={delPage}
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

export default connect(mapStateToProps)(TournamentList);