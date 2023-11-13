//node imports
import React, { useState, useContext, memo, Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Accordion, useAccordionButton, AccordionContext, Tooltip, OverlayTrigger } from 'react-bootstrap'


function CustomToggle({ children, eventKey, onClick }) {

    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(eventKey, (active) => onClick({ state: !active, eventKey: eventKey }));

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <Link to="#" aria-expanded={isCurrentEventKey ? 'true' : 'false'} className="nav-link" role="button" onClick={(e) => {
            decoratedOnClick(isCurrentEventKey)
        }}>
            {children}
        </Link>
    );
}

const VerticalNav = memo((props) => {


    const [activeMenu, setActiveMenu] = useState(false)
    const [active, setActive] = useState('')
    //location
    let location = useLocation();
    return (
        <Fragment>
            <Accordion as="ul" className="navbar-nav iq-main-menu">
                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Home</span>
                        <span className="mini-icon">-</span>
                    </Link>
                </li>

                <li className={`${location.pathname === '/home/dashboard' ? 'active' : ''} nav-item `}>
                    <Link className={`${location.pathname === '/home/dashboard' ? 'active' : ''} nav-link `} aria-current="page" to="/home/dashboard" onClick={() => { }}>
                        <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip>Dashboard</Tooltip>}
                        >
                            <i className="icon">
                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor"></path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor"></path>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Dashboard</span>
                    </Link>
                </li>

                <li><hr className="hr-horizontal" /></li>
                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Modules</span>
                        <span className="mini-icon">-</span>
                    </Link>
                </li>
                <Accordion.Item as="li" eventKey="sidebar-special" bsPrefix={`nav-item ${active === 'special' ? 'active' : ''} `} onClick={() => setActive('special')}>
                    <CustomToggle eventKey="sidebar-special" onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip>Tournaments</Tooltip>}
                        >
                            <i className="icon">
                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M21,4H18V3a1,1,0,0,0-1-1H7A1,1,0,0,0,6,3V4H3A1,1,0,0,0,2,5V8a4,4,0,0,0,4,4H7.54A6,6,0,0,0,11,13.91V16H10a3,3,0,0,0-3,3v2a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V19a3,3,0,0,0-3-3H13V13.91A6,6,0,0,0,16.46,12H18a4,4,0,0,0,4-4V5A1,1,0,0,0,21,4ZM6,10A2,2,0,0,1,4,8V6H6V8a6,6,0,0,0,.35,2Zm8,8a1,1,0,0,1,1,1v1H9V19a1,1,0,0,1,1-1ZM16,8A4,4,0,0,1,8,8V4h8Zm4,0a2,2,0,0,1-2,2h-.35A6,6,0,0,0,18,8V6h2Z" fill="currentColor"></path>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Tournaments</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>

                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-special" >
                        <ul className="sub-nav">

                            <li className="nav-item">
                                <Link className={`${location.pathname === '/home/add-tournament' ? 'active' : ''} nav-link`} to="/home/add-tournament">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip>Add New Tournament</Tooltip>}
                                    >
                                        <i className="sidenav-mini-icon"> A </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Add New Tournament</span>
                                </Link>
                            </li>


                            <li className="nav-item">
                                <Link className={`${location.pathname === '/home/all-tournaments' ? 'active' : ''} nav-link`} to="/home/all-tournaments">

                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip>View Tournament</Tooltip>}
                                    >
                                        <i className="sidenav-mini-icon"> V </i>
                                    </OverlayTrigger>
                                    <span className="item-name">View Tournament</span>
                                </Link>
                            </li>


                            <li className="nav-item">
                                <Link className={`${location.pathname === '/home/my-tournaments' ? 'active' : ''} nav-link`} to="/home/my-tournaments">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip>My Tournament</Tooltip>}
                                    >
                                        <i className="sidenav-mini-icon"> M </i>
                                    </OverlayTrigger>
                                    <span className="item-name">My Tournament</span>
                                </Link>
                            </li>

                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>

                {/* <Accordion.Item as="li" eventKey="sidebar-table" bsPrefix={`nav-item ${active === 'table' ? 'active' : ''} `} onClick={() => setActive('table')}>
                 <CustomToggle eventKey="sidebar-table" onClick={(activeKey) => setActiveMenu(activeKey)}>
                 <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip>Matches</Tooltip>}
                        >
                        <i className="icon">
                        <svg class="icon-24" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M7.24512 14.7815L10.2383 10.8914L13.6524 13.5733L16.5815 9.79297" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <circle cx="19.9954" cy="4.20027" r="1.9222" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>                                    <path d="M14.9248 3.12012H7.65704C4.6456 3.12012 2.77832 5.25284 2.77832 8.26428V16.3467C2.77832 19.3581 4.60898 21.4817 7.65704 21.4817H16.2612C19.2726 21.4817 21.1399 19.3581 21.1399 16.3467V9.30776" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg>                            
                        </i>
                        </OverlayTrigger>
                        <span className="item-name">Matches</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-table">
                        <ul className="sub-nav">
                        <li className="nav-item">
                                <Link className={`${location.pathname === '/home/edit-matches' ? 'active' : ''} nav-link`} to="/home/edit-matches">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip>Edit Matches</Tooltip>}
                                    >
                                        <i className="sidenav-mini-icon"> E </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Edit Matches</span>
                                </Link>
                            </li>


                            <li className="nav-item">
                                <Link className={`${location.pathname === '/home/edit-teams' ? 'active' : ''} nav-link`} to="/home/edit-teams">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip>Edit Teams</Tooltip>}
                                    >
                                        <i className="sidenav-mini-icon"> E </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Edit Teams</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item> */}

                <Accordion.Item as="li" className={`${activeMenu === '0' ? 'active' : ''}`} eventKey="sidebar-auth" bsPrefix={`nav-item ${active === 'auth' ? 'active' : ''} `} onClick={() => setActive('auth')}>
                    <CustomToggle eventKey="sidebar-auth" onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip>Players</Tooltip>}
                        >
                            <i className="icon">
                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.989 19.129c0-2.246-2.187-3.389-4.317-4.307-2.123-.914-2.801-1.684-2.801-3.334 0-.989.648-.667.932-2.481.12-.752.692-.012.802-1.729 0-.684-.313-.854-.313-.854s.159-1.013.221-1.793c.064-.817-.398-2.56-2.301-3.095-.332-.341-.557-.882.467-1.424-2.24-.104-2.761 1.068-3.954 1.93-1.015.756-1.289 1.953-1.24 2.59.065.78.223 1.793.223 1.793s-.314.17-.314.854c.11 1.718.684.977.803 1.729.284 1.814.933 1.492.933 2.481 0 1.65-.212 2.21-2.336 3.124C.663 15.53 0 17 .011 19.129.014 19.766 0 20 0 20h16s-.011-.234-.011-.871zm2.539-5.764c-1.135-.457-1.605-1.002-1.605-2.066 0-.641.418-.432.602-1.603.077-.484.447-.008.518-1.115 0-.441-.202-.551-.202-.551s.103-.656.143-1.159c.05-.627-.364-2.247-2.268-2.247-1.903 0-2.318 1.62-2.269 2.247.042.502.144 1.159.144 1.159s-.202.109-.202.551c.071 1.107.441.631.518 1.115.184 1.172.602.963.602 1.603 0 1.064-.438 1.562-1.809 2.152-.069.029-.12.068-.183.102 1.64.712 4.226 1.941 4.838 4.447H20v-2.318c0-1-.273-1.834-1.472-2.317z" fill="currentColor"></path>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Players</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-auth">
                        <ul className="sub-nav">

                            <li className="nav-item">
                                <Link className={`${location.pathname === '/home/add-player' ? 'active' : ''} nav-link`} to="/home/add-player">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip>Add New Player</Tooltip>}
                                    >
                                        <i className="sidenav-mini-icon"> A </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Add New Player</span>
                                </Link>
                            </li>


                            <li className="nav-item">
                                <Link className={`${location.pathname === '/home/players' ? 'active' : ''} nav-link`} to="/home/players">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip>View Player</Tooltip>}
                                    >
                                        <i className="sidenav-mini-icon"> V </i>
                                    </OverlayTrigger>
                                    <span className="item-name">View Player</span>
                                </Link>
                            </li>

                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>
                <li><hr className="hr-horizontal" /></li>
                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Settings</span>
                        <span className="mini-icon">-</span>
                    </Link>
                </li>

                <Accordion.Item as="li" eventKey="sidebar-widget" bsPrefix={` ${location.pathname === '/dashboard/widget/widgetbasic' || location.pathname === '/dashboard/widget/widgetchart' || location.pathname === '/dashboard/widget/widgetcard' ? 'active' : '' || active === 'widget' ? 'active' : ''} nav-item`} onClick={() => setActive('widget')}>
                    <CustomToggle eventKey="sidebar-widget" active={activeMenu === 'sidebar-widget' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip>Users</Tooltip>}
                        >
                            <i className="icon">
                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor"></path>
                                    <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor"></path>
                                    <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor"></path>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Scorers</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-widget">
                        <ul className="sub-nav">

                            <li className="nav-item">
                                <Link className={`${location.pathname === '/home/add-user' ? 'active' : ''} nav-link`} to="/home/add-user">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip>Add New Scorer</Tooltip>}
                                    >
                                        <i className="sidenav-mini-icon"> A </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Add New Scorer</span>
                                </Link>
                            </li>


                            <li className="nav-item">
                                <Link className={`${location.pathname === '/home/user' ? 'active' : ''} nav-link`} to="/home/user">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip>View Scorers</Tooltip>}
                                    >
                                        <i className="sidenav-mini-icon"> V </i>
                                    </OverlayTrigger>
                                    <span className="item-name">View Scorers</span>
                                </Link>
                            </li>

                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>
                <Accordion.Item as="li" eventKey="sidebar-maps" bsPrefix={`nav-item ${active === 'maps' ? 'active' : ''} `} onClick={() => setActive('maps')} >
                    <CustomToggle eventKey="sidebar-maps" active={activeMenu === 'sidebar-maps' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip>Sub Admin</Tooltip>}
                        >
                            <i className="icon">
                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.7688 8.71387H16.2312C18.5886 8.71387 20.5 10.5831 20.5 12.8885V17.8254C20.5 20.1308 18.5886 22 16.2312 22H7.7688C5.41136 22 3.5 20.1308 3.5 17.8254V12.8885C3.5 10.5831 5.41136 8.71387 7.7688 8.71387ZM11.9949 17.3295C12.4928 17.3295 12.8891 16.9419 12.8891 16.455V14.2489C12.8891 13.772 12.4928 13.3844 11.9949 13.3844C11.5072 13.3844 11.1109 13.772 11.1109 14.2489V16.455C11.1109 16.9419 11.5072 17.3295 11.9949 17.3295Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M17.523 7.39595V8.86667C17.1673 8.7673 16.7913 8.71761 16.4052 8.71761H15.7447V7.39595C15.7447 5.37868 14.0681 3.73903 12.0053 3.73903C9.94257 3.73903 8.26594 5.36874 8.25578 7.37608V8.71761H7.60545C7.20916 8.71761 6.83319 8.7673 6.47754 8.87661V7.39595C6.4877 4.41476 8.95692 2 11.985 2C15.0537 2 17.523 4.41476 17.523 7.39595Z" fill="currentColor"></path>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Sub Admin</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-maps">
                        <ul className="sub-nav">

                            <li className="nav-item">
                                <Link className={`${location.pathname === '/home/add-admin' ? 'active' : ''} nav-link`} to="/home/add-admin">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip>Add New Sub Admin</Tooltip>}
                                    >
                                        <i className="sidenav-mini-icon"> A </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Add New Sub Admin</span>
                                </Link>
                            </li>


                            <li className="nav-item">
                                <Link className={`${location.pathname === '/home/admin' ? 'active' : ''} nav-link`} to="/home/admin">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip>View Sub Admins</Tooltip>}
                                    >
                                        <i className="sidenav-mini-icon"> V </i>
                                    </OverlayTrigger>
                                    <span className="item-name">View Sub Admins</span>
                                </Link>
                            </li>

                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>
                <li className={`${location.pathname === '/home/reset-password' ? 'active' : ''} nav-item `}>
                    <Link className={`${location.pathname === '/home/reset-password' ? 'active' : ''} nav-link `} aria-current="page" to="/home/reset-password" onClick={() => { }}>
                        <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip>Reset Password</Tooltip>}
                        >
                            <i className="icon">
                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M19,20H5a4,4,0,0,1-4-4V12A4,4,0,0,1,5,8H19a4,4,0,0,1,4,4v4A4,4,0,0,1,19,20ZM5,10a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V12a2,2,0,0,0-2-2Z"></path><path d="M19,10H5V8A7,7,0,0,1,19,8ZM7,8H17A5,5,0,0,0,7,8Z"></path><path d="M19,9H5a3,3,0,0,0-3,3v4a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V12A3,3,0,0,0,19,9ZM6,15a1,1,0,1,1,1-1A1,1,0,0,1,6,15Zm4,0a1,1,0,1,1,1-1A1,1,0,0,1,10,15Zm4,0a1,1,0,1,1,1-1A1,1,0,0,1,14,15Zm4,0a1,1,0,1,1,1-1A1,1,0,0,1,18,15Z" fill="currentColor"></path>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Reset Password</span>
                    </Link>
                </li>
            </Accordion>
        </Fragment>
    )
})

export default VerticalNav
