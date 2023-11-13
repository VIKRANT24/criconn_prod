import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Select from 'react-select';
import Alert from '../../../components/toast/toast'
import { loadingToggleAction } from "../../../store/action/common";
import store from "../../../store/store";
import { API_NAME } from '../../../utils/constants';
import ApiService from '../../../services/service'
// img

import Card from '../../../components/card/card'
const EditTPreMatch = () => {
    const [showModal2, setShowModal2] = React.useState(false)

    const showEdit2 = (id) => {
        if (showModal2)
            setShowModal2(false)
        else
            setShowModal2(true)


    }

    return (
        <>


            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body card-thumbnail" style={{ textAlign: 'center' }}>
                        <span class="text-primary">ABC Tigers</span>
                        <h4 class="mt-2" style={{ marginBottom: '1vh' }}>MI vs CSK</h4>
                        <div class="d gap-3">
                            <a style={{ marginRight: '1vh' }} href="../blog/blog-detail.html" class="iq-blog-adventure fs-6">Match 1</a><span> | </span>
                            <a style={{ marginLeft: '1vh', verticalAlign: 'middle' }} href="../blog/blog-detail.html" class="iq-blog-adventure text-warning fs-6"><marquee width="30%" >This match has not started yet. Scorecard will be display once match has started</marquee></a>
                        </div>

                        <Row>
                            <div class="col-md-6" style={{ marginTop: '5vh' }}>
                                <div class="card-header d-flex justify-content-between p-4 border-bottom bg-soft-primary">
                                    <div class="header-title" style={{ width: '100%', textAlign: 'center' }}>
                                        <h4 class="card-title text-primary">MI</h4>
                                    </div>
                                </div>
                                <div class="table-responsive" style={{ height: '350px' }}>
                                    <table class="table table-borderless iq-file-manager-table mb-0">

                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="d-flex align-items-center gap-2">
                                                        <span class="avatar-40 rounded-pill iq-recently-badge">
                                                            <img class="rounded-circle bg-soft-primary img-fluid avatar-40 mb-2" src="https://templates.iqonic.design/hope-ui/pro/html/assets/images/table/1.png" alt="profile" loading="lazy" />
                                                        </span>
                                                        <h6 class=" mb-0">Vikrant Rane</h6>
                                                    </div>
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" style={{ float: 'left', marginLeft: '-30px' }} />
                                                    <a href="#" class="d-flex align-items-center text-danger" style={{ marginTop: '-2px' }}>
                                                        <span class="btn-inner">
                                                            <svg class="icon-19" width="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                            </svg>
                                                        </span>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="d-flex align-items-center gap-2">
                                                        <span class="avatar-40 rounded-pill iq-recently-badge">
                                                            <img class="rounded-circle bg-soft-primary img-fluid avatar-40 mb-2" src="https://templates.iqonic.design/hope-ui/pro/html/assets/images/table/1.png" alt="profile" loading="lazy" />
                                                        </span>
                                                        <h6 class=" mb-0">Vikrant Rane</h6>
                                                    </div>
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" style={{ float: 'left', marginLeft: '-30px' }} />
                                                    <a href="#" class="d-flex align-items-center text-danger" style={{ marginTop: '-2px' }}>
                                                        <span class="btn-inner">
                                                            <svg class="icon-19" width="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                            </svg>
                                                        </span>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="d-flex align-items-center gap-2">
                                                        <span class="avatar-40 rounded-pill iq-recently-badge">
                                                            <img class="rounded-circle bg-soft-primary img-fluid avatar-40 mb-2" src="https://templates.iqonic.design/hope-ui/pro/html/assets/images/table/1.png" alt="profile" loading="lazy" />
                                                        </span>
                                                        <h6 class=" mb-0">Vikrant Rane</h6>
                                                    </div>
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" style={{ float: 'left', marginLeft: '-30px' }} />
                                                    <a href="#" class="d-flex align-items-center text-danger" style={{ marginTop: '-2px' }}>
                                                        <span class="btn-inner">
                                                            <svg class="icon-19" width="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                            </svg>
                                                        </span>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="d-flex align-items-center gap-2">
                                                        <span class="avatar-40 rounded-pill iq-recently-badge">
                                                            <img class="rounded-circle bg-soft-primary img-fluid avatar-40 mb-2" src="https://templates.iqonic.design/hope-ui/pro/html/assets/images/table/1.png" alt="profile" loading="lazy" />
                                                        </span>
                                                        <h6 class=" mb-0">Vikrant Rane</h6>
                                                    </div>
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" style={{ float: 'left', marginLeft: '-30px' }} />
                                                    <a href="#" class="d-flex align-items-center text-danger" style={{ marginTop: '-2px' }}>
                                                        <span class="btn-inner">
                                                            <svg class="icon-19" width="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                            </svg>
                                                        </span>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="d-flex align-items-center gap-2">
                                                        <span class="avatar-40 rounded-pill iq-recently-badge">
                                                            <img class="rounded-circle bg-soft-primary img-fluid avatar-40 mb-2" src="https://templates.iqonic.design/hope-ui/pro/html/assets/images/table/1.png" alt="profile" loading="lazy" />
                                                        </span>
                                                        <h6 class=" mb-0">Vikrant Rane</h6>
                                                    </div>
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" style={{ float: 'left', marginLeft: '-30px' }} />
                                                    <a href="#" class="d-flex align-items-center text-danger" style={{ marginTop: '-2px' }}>
                                                        <span class="btn-inner">
                                                            <svg class="icon-19" width="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                            </svg>
                                                        </span>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="card-footer">
                                    <button type="submit" style={{ width: '100%' }} class="btn btn-primary" onClick={() => showEdit2()}>Add Player</button>
                                </div>

                            </div>

                            <div class="col-md-6" style={{ marginTop: '5vh' }}>
                                <div class="card-header d-flex justify-content-between p-4 border-bottom bg-soft-primary">
                                    <div class="header-title" style={{ width: '100%', textAlign: 'center' }}>
                                        <h4 class="card-title text-primary">CSK</h4>
                                    </div>
                                </div>
                                <div class="table-responsive" style={{ height: '350px' }}>
                                    <table class="table table-borderless iq-file-manager-table mb-0">

                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="d-flex align-items-center gap-2">
                                                        <span class="avatar-40 rounded-pill iq-recently-badge">
                                                            <img class="rounded-circle bg-soft-primary img-fluid avatar-40 mb-2" src="https://templates.iqonic.design/hope-ui/pro/html/assets/images/table/1.png" alt="profile" loading="lazy" />
                                                        </span>
                                                        <h6 class=" mb-0">Vikrant Rane</h6>
                                                    </div>
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" style={{ float: 'left', marginLeft: '-30px' }} />
                                                    <a href="#" class="d-flex align-items-center text-danger" style={{ marginTop: '-2px' }}>
                                                        <span class="btn-inner">
                                                            <svg class="icon-19" width="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                            </svg>
                                                        </span>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="d-flex align-items-center gap-2">
                                                        <span class="avatar-40 rounded-pill iq-recently-badge">
                                                            <img class="rounded-circle bg-soft-primary img-fluid avatar-40 mb-2" src="https://templates.iqonic.design/hope-ui/pro/html/assets/images/table/1.png" alt="profile" loading="lazy" />
                                                        </span>
                                                        <h6 class=" mb-0">Vikrant Rane</h6>
                                                    </div>
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" style={{ float: 'left', marginLeft: '-30px' }} />
                                                    <a href="#" class="d-flex align-items-center text-danger" style={{ marginTop: '-2px' }}>
                                                        <span class="btn-inner">
                                                            <svg class="icon-19" width="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                            </svg>
                                                        </span>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="d-flex align-items-center gap-2">
                                                        <span class="avatar-40 rounded-pill iq-recently-badge">
                                                            <img class="rounded-circle bg-soft-primary img-fluid avatar-40 mb-2" src="https://templates.iqonic.design/hope-ui/pro/html/assets/images/table/1.png" alt="profile" loading="lazy" />
                                                        </span>
                                                        <h6 class=" mb-0">Vikrant Rane</h6>
                                                    </div>
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" style={{ float: 'left', marginLeft: '-30px' }} />
                                                    <a href="#" class="d-flex align-items-center text-danger" style={{ marginTop: '-2px' }}>
                                                        <span class="btn-inner">
                                                            <svg class="icon-19" width="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                            </svg>
                                                        </span>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="d-flex align-items-center gap-2">
                                                        <span class="avatar-40 rounded-pill iq-recently-badge">
                                                            <img class="rounded-circle bg-soft-primary img-fluid avatar-40 mb-2" src="https://templates.iqonic.design/hope-ui/pro/html/assets/images/table/1.png" alt="profile" loading="lazy" />
                                                        </span>
                                                        <h6 class=" mb-0">Vikrant Rane</h6>
                                                    </div>
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" style={{ float: 'left', marginLeft: '-30px' }} />
                                                    <a href="#" class="d-flex align-items-center text-danger" style={{ marginTop: '-2px' }}>
                                                        <span class="btn-inner">
                                                            <svg class="icon-19" width="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                            </svg>
                                                        </span>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="d-flex align-items-center gap-2">
                                                        <span class="avatar-40 rounded-pill iq-recently-badge">
                                                            <img class="rounded-circle bg-soft-primary img-fluid avatar-40 mb-2" src="https://templates.iqonic.design/hope-ui/pro/html/assets/images/table/1.png" alt="profile" loading="lazy" />
                                                        </span>
                                                        <h6 class=" mb-0">Vikrant Rane</h6>
                                                    </div>
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" style={{ float: 'left', marginLeft: '-30px' }} />
                                                    <a href="#" class="d-flex align-items-center text-danger" style={{ marginTop: '-2px' }}>
                                                        <span class="btn-inner">
                                                            <svg class="icon-19" width="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                            </svg>
                                                        </span>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="card-footer">
                                    <button type="submit" style={{ width: '100%' }} class="btn btn-primary" onClick={() => showEdit2()}>Add Player</button>
                                </div>

                            </div>


                        </Row>

                    </div>



                </div>


            </div>

            <Modal show={showModal2} onHide={showEdit2} className="">
                <Modal.Header className="btnw" closeButton>
                    <Modal.Title as="h5">Add Player</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form >
                           <Row>
                              <Col md="6" className="mb-3">
                                 <Form.Label md="6" htmlFor="validationDefault01">Name</Form.Label>
                                 <Form.Control type="text" id="validationDefault01" name="playername"  required />
                              </Col>
                              <Col md="6" className="mb-3">
                                 <Form.Label md="6" htmlFor="validationDefault01">Mobile No</Form.Label>
                                 <Form.Control type="text" id="validationDefault01" name="mobileno"  required />
                              </Col>
                             
                              <Col md="6" className="mb-3">
                                 <Form.Group className="form-group">
                                    <Form.Label htmlFor="exampleFormControlSelect1"> Role</Form.Label>
                                    <Form.Select required className="form-select" id="exampleFormControlSelect1" 
                                       >
                                       <option value="">Select Role</option>
                                       <option value="bat">Batsman</option>
                                       <option value="bowl">Bowler</option>
                                       <option value="all">All Rounder</option>
                                       <option value="wk">Wicket Kepper</option>
                                    </Form.Select>
                                 </Form.Group>
                              </Col>
                            
                           </Row>
                           <Form.Group>
                              <Button variant="btn btn-primary" style={{ float: 'right' }} type="submit">Add</Button>
                           </Form.Group>
                        </Form>

                </Modal.Body>

            </Modal>


        </>
    )
}

export default EditTPreMatch
