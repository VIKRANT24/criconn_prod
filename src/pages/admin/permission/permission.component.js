
import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import {  useNavigate,useLocation } from 'react-router-dom'
import Card from '../../../components/card/card'

import { loadingToggleAction } from "../../../store/action/common";
import store from "../../../store/store";
import ApiService from '../../../services/service'
import { API_NAME } from '../../../utils/constants';
import Spinner from '../../../components/loader/loader'
import { connect } from 'react-redux'
import Alert from '../../../components/toast/toast'
import { ToastContainer } from 'react-toastify';


const AdminPermission = (props) => {


    let history = useNavigate()
    let location = useLocation();
    //console.logs(itemId)



    //permission
    const [permission, setPermission] = useState([])
    const [editper, setEditPer] = useState([])

    const [defaultper, setDefaultPer] = useState([{
        name: 'Create',
        status: 'false'

    },
    {
        name: 'Update',
        status: 'false'
    },
    {
        name: 'View Tournament',
        status: 'false'

    },
    {
        name: 'My Tournaments',
        status: 'false'

    },
    {
        name: 'Delete Tournament',
        status: 'false'

    },
    {
        name: 'Register User',
        status: 'false'

    },
    {
        name: 'Users list',
        status: 'false'

    },
    {
        name: 'Create Subadmin',
        status: 'false'

    },
    {
        name: 'View All Subadmins',
        status: 'false'

    },
    {
        name: 'Reset Password',
        status: 'false'

    },
    {
        name: 'Add Players',
        status: 'false'

    },
    {
        name: 'View Players',
        status: 'false'

    },
    {
        name: 'Assign User',
        status: 'false'

    },
    {
        name: 'Delete User',
        status: 'false'

    },
    {
        name: 'View Matches',
        status: 'false'

    },
    {
        name: 'Edit Match',
        status: 'false'

    },
    {
        name: 'Edit Team',
        status: 'false'

    },
    {
        name: 'Manage Videos',
        status: 'false'

    },
    {
        name: 'Create Match',
        status: 'false'

    },
    {
        name: 'View Scorecard',
        status: 'false'

    }
    ])

  const onPermissionSelect = (name,event)=>{
    console.log(event.target.checked)
    console.log(name)

    permission.forEach(element => {
        if(element.name===name)
        {
            element.status = JSON.stringify(event.target.checked)
        }
    });
   
  }
    
     React.useEffect(() => {

         if(location.state.per ==="" || location.state.per ===null )
         {
            setPermission(defaultper)
         }
         else
         {
            var dataArray = [] 
            defaultper.filter(per => {
              if((location.state.per).includes(per.name.toLowerCase().replace(/\s+/g, '')))
              {
               per.status = 'true'
              }
              else
              {
               per.status = 'false'
              }
              dataArray.push(per)
           });
           setPermission(dataArray)
         }
         console.log('Default',defaultper)
         console.log('Updated',permission)
     }, [])

     const updatePermission =  ()=>{

        store.dispatch(loadingToggleAction(true))
        const finalPerArray = []
       
        permission.filter(per => {
            if(per.status== 'true')
            {
                finalPerArray.push(per)
            }
        })
        console.log(finalPerArray)

        let updatedPermissions = finalPerArray.map(x => x.name.toLowerCase().replace(/\s+/g, '')).join(", ");
        console.log(updatedPermissions);


        


 
        let params = {
            user_id: location.state.uid,
            permissions : updatedPermissions
         }

         ApiService.postData(API_NAME.EDIT_PERMISSION,params).then(
            (resData) => {
               store.dispatch(loadingToggleAction(false))
               Alert('00', resData.message)

               setTimeout(() => {
                history('/home/admin')
               }, 3000);
               
              
      
            }
         ).catch((err) => {
            store.dispatch(loadingToggleAction(false))
            Alert('01', err.message)
      
         });

           
     }
    


    return (
        <>
           <ToastContainer/>
        <Spinner loading={props.showLoading} />
            <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between flex-wrap">
                            <div className="header-title">
                                <h4 className="card-title mb-0">Permissions</h4>

                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-responsive" style={{height:'400px'}}>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th className="text-center"  >{location.state.name}
                                                       
                                                    </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            permission.map((item, index) =>
                                            (
                                                <tr className="" key={index} >
                                                    <td className="">{item.name}
                                                
                                                    </td>
                                                    
                                                        <td className="text-center" key={index}>
                                                               {
                                                                 item.status ==='true' ?  
                                                                <input className="form-check-input" type="checkbox" defaultChecked onChange={onPermissionSelect.bind(this,item.name)}/> : <input className="form-check-input" type="checkbox"  onChange={onPermissionSelect.bind(this,item.name)}/> 
                                                               }

                                                            
                                                        </td>
                                                    
                                                  
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                
                            </div>
                        </Card.Body>
                        <Card.Footer>
                        <div className="text-center">
                                    <Button onClick={updatePermission} type="button" variant="primary">Save</Button>
                                </div>
                        </Card.Footer>
                    </Card>

                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
       showLoading: state.auth.showLoading
    }
 }

export default connect(mapStateToProps)(AdminPermission);