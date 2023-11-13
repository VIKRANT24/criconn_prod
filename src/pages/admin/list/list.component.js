import React from 'react'
import {Row,Col} from 'react-bootstrap'
import {Link,useNavigate} from 'react-router-dom'
import Card from '../../../components/card/card'

import { ToastContainer } from 'react-toastify'
import Spinner from '../../../components/loader/loader'
import { connect } from 'react-redux'

import Alert from '../../../components/toast/toast'
import { loadingToggleAction } from "../../../store/action/common";
import store from "../../../store/store";
import ApiService from '../../../services/service'
import { API_NAME } from '../../../utils/constants';

import ReactPaginate from 'react-paginate';




const AdminList =(props,{navigation}) =>{

   const [admins, setAdmins] = React.useState([])
   const [search, setNewSearch] = React.useState("");
   const [pageNumber, setPageNumber] = React.useState(0)
   let history = useNavigate()


   const filtered = !search
      ? admins
      : admins.filter((admins) =>
         admins.username.toLowerCase().includes(search.toLowerCase())
      );



   const adminsPerPage = 5
   const pagesVisited = pageNumber * adminsPerPage

   const pageCount = Math.ceil(filtered.length / adminsPerPage)

   const changePage = ({ selected }) => {
      setPageNumber(selected)
   }

   const gotoPermission = (name,permissions,id)=>{
      history('/home/admin-permission', {state:{name:name,per:permissions,uid:id}});
   }

   const displayAdmins = filtered
   .slice(pagesVisited, pagesVisited + adminsPerPage)
   .map((item, idx) => {
      return (
         <tr key={idx}>
         <td>{item.id}</td>
          <td>{item.username}</td>
     
          <td>
             <div className="flex align-items-center list-user-action" onClick={gotoPermission.bind(this,item.username, item.permissions,item.user_id)}>
                <Link className="btn btn-sm btn-icon btn-success" data-toggle="tooltip" data-placement="top"  title="Add" data-original-title="Add" >
                   <span className="btn-inner">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" id="view"><path d="M12 5C7.064 5 3.308 8.058 1 12c2.308 3.942 6.064 7 11 7s8.693-3.058 11-7c-2.307-3.942-6.065-7-11-7zm0 12c-4.31 0-7.009-2.713-8.624-5C4.991 9.713 7.69 7 12 7c4.311 0 7.01 2.713 8.624 5-1.614 2.287-4.313 5-8.624 5z"></path><circle cx="12" cy="12" r="3"></circle></svg>                                      
                   </span>
                </Link>{' '}
              
             </div>
          </td>
       </tr>
      )
   })

   const fetchAdmins = () => {
      console.log('Component : Admin List')
      console.log("Request : Get")
      store.dispatch(loadingToggleAction(true))
      ApiService.getData(API_NAME.SUB_ADMIN).then(
         (resData) => {
   
            if (resData.statusCode === '00') {
               store.dispatch(loadingToggleAction(false))
               Alert('00', resData.message)
               console.log('==================================')
               setAdmins(resData.data)
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
   
   const handleSearchChange = (e) => {
      console.log(e.target.value)
      setNewSearch(e.target.value);
      setPageNumber(0)
   }
   
   React.useEffect(() => {
      fetchAdmins();
   }, [])

  return(
     <>
     <ToastContainer />
         <Spinner loading={props.showLoading} />
       <div>
         <Row>
            <Col sm="12">
               <Card>
                  <Card.Header className="d-flex justify-content-between">
                     <div className="header-title">
                        <h4 className="card-title">Sub-Admin List</h4>
                     </div>
                     <div id="datatable_filter" class="dataTables_filter"><label><input type="search" onChange={handleSearchChange} class="form-control form-control-sm" placeholder="Search..." aria-controls="datatable" spellcheck="false" data-ms-editor="true" /></label></div>
                  </Card.Header>
                  <Card.Body className="px-0">
                     <div className="table-responsive">
                        <table id="user-list-table" className="table table-striped" role="grid" data-toggle="data-table">
                           <thead>
                              <tr className="ligth">
                              <th>Sr</th>
                                 <th>Username</th>
                                 <th min-width= "100px">Action</th>
                              </tr>
                           </thead>
                           <tbody>
                           { displayAdmins }
                           </tbody>
                        </table>
                     </div>
                  </Card.Body>
               </Card>
            </Col>
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


export default connect(mapStateToProps)(AdminList);