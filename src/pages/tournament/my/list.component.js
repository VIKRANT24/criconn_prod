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




const MyTournamentList =(props,{navigation}) =>{

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
         <td>{idx}</td>
          <td>{item.mainTournamentid}</td>
     
          <td>
          <td>{item.TournamentName}</td>
          </td>
       </tr>
      )
   })

   const fetchMyTournament = () => {
      console.log('Component : My Tournament List')
     
      store.dispatch(loadingToggleAction(true))
      let data = {
        user_id : 'Yfsjt4BrMYaDguXsHYZJ1UIgPmA2'//sessionStorage.getItem('user_uid')
      }
      console.log("Request : " + JSON.stringify(data))
      ApiService.postData(API_NAME.MY_TOURNAMENT,data).then(
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
      fetchMyTournament();
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
                        <h4 className="card-title">My Tournament List</h4>
                     </div>
                     <div id="datatable_filter" style={{display:'none'}} class="dataTables_filter"><label><input type="search" onChange={handleSearchChange} class="form-control form-control-sm" placeholder="Search..." aria-controls="datatable" spellcheck="false" data-ms-editor="true" /></label></div>
                  </Card.Header>
                  <Card.Body className="px-0">
                     <div className="table-responsive">
                        <table id="user-list-table" className="table table-striped" role="grid" data-toggle="data-table">
                           <thead>
                              <tr className="ligth">
                              <th>Sr</th>
                                 <th>Id</th>
                                 <th min-width= "100px">Tournament Name</th>
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


export default connect(mapStateToProps)(MyTournamentList);