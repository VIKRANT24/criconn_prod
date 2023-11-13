import React, { useState, useEffect,Fragment } from 'react'
import { Row, Modal, Col, Form, Accordion, Nav, Button, ListGroup, Badge } from 'react-bootstrap'
import vs from '../../../assets/images/home/versus.png'
import team from '../../../assets/images/home/team_bg.png'
import crc from '../../../assets/images/home/crc_bg_1.png'
import Alert from '../../../components/toast/toast'
import { loadingToggleAction } from "../../../store/action/common";
import store from "../../../store/store";
import { API_NAME } from '../../../utils/constants';
import ApiService from '../../../services/service'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Spinner from '../../../components/loader/loader'
import Select,{ components } from 'react-select';
import { useNavigate } from 'react-router-dom';


const EditMatches = (props) => {

    let history = useNavigate() 

    const [showModal, setShowModal] = React.useState(false)
    const [showModal1, setShowModal1] = React.useState(false)
    const [showModal2, setShowModal2] = React.useState(false)
    const [showModal3, setShowModal3] = React.useState(false)
    const [matches, setMatches] = React.useState([]);
    const [tourTeams, setTourTeams] = React.useState([]);
    const [myTeams, setMyTeams] = React.useState([]);
    const [searchTeam, setSearchTeam] = React.useState();
    const [searchMaster, setSearchMaster] = React.useState([]);
    const [placeTour, setPlaceTour] = React.useState('');
    const [value, setValue] = React.useState('');

    const [playerValue, setPlayerValue] = React.useState('');
    const [playerPlace, setPlayerPlace] = React.useState('');

    const autoCompleteRef = React.useRef();
    const inputRef = React.useRef();
    const autoCompleteRefAdd = React.useRef();
    const inputRefAdd = React.useRef();
  

    const [teamA, setTeamA] = React.useState('Team A');
    const [teamAPlace, setTeamAPlace] = React.useState('@India');

    const [teamB, setTeamB] = React.useState('Team B');
    const [teamBPlace, setTeamBPlace] = React.useState('@India');

    const [teams, setTeams] = React.useState('');

    const [playerA, setPlayerA] = React.useState([]);
    const [playerB, setPlayerB] = React.useState([]);

    const [selectedGrounds,setSelectedGrounds] = React.useState('');
    const [groundMaster, setGroundMaster] = React.useState([])
    const [commMaster, setCommMaster] = React.useState([])
    const [selectedCommm,setSelectedComm] = React.useState('');
    const [umpireMaster, setUmpireMaster] = React.useState([])
    const [selectedUmpire,setSelectedUmpire] = React.useState('');

    const [ballType, setBallType] = React.useState('');
    const [matchType, setMatchType] = React.useState('');
    const [pitchType, setPitchType] = React.useState('');
    const [overs, setOvers] = React.useState('');
    const [matchDate, setMatchDate] = React.useState('');

    const [selectedPlayerA,setSelectedPlayerA] = React.useState('');
    const [selectedPlayerB,setSelectedPlayerB] = React.useState('');
 
  

  

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

    const showEdit2 = (team) => {
        setValue([])
        if(team!=undefined)
        {
            setTeams(team)
        }
        setSearchMaster([])
        if (showModal2)
            setShowModal2(false)
        else
            setShowModal2(true)

    }

    const showEdit3 = (team) => {
        
        setTeams(team)
        if (showModal3)
            setShowModal3(false)
        else
            setShowModal3(true)

              
            
           
    }

    const fetchTourTeams = (id) => {
        store.dispatch(loadingToggleAction(true))
        setTourTeams([])
        let params = {
            tourid: id
        }
        console.log('Component : Get My Tournament teams')
        console.log("Request : Post")
        ApiService.postData(API_NAME.GET_TOUR_TEAMS, params).then(
            (resData) => {

                if (resData.statusCode === '00') {
                    store.dispatch(loadingToggleAction(false))
                    // Alert('00', resData.message)
                    console.log('===================================')
                    setTourTeams(resData.data)
                    getMyTeams(sessionStorage.getItem('user_uid'))
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

    const getMyTeams = (id) => {
        store.dispatch(loadingToggleAction(true))
        setMyTeams([])
        let params = {
            user_id: id
        }
        console.log('Component : Get my teams')
        console.log("Request : Post")
        ApiService.postData(API_NAME.GET_MY_TEAMS, params).then(
            (resData) => {

                if (resData.statusCode === '00') {
                    store.dispatch(loadingToggleAction(false))
                    //Alert('00', resData.message)
                    console.log('===================================')
                    setMyTeams(resData.data)

                }
                else {
                    store.dispatch(loadingToggleAction(false))
                    //Alert('01', resData.message)
                    console.log('==================================')
                }


            }
        ).catch((err) => {
            store.dispatch(loadingToggleAction(false))
            Alert('01', err.message)
            console.log('==================================')

        });
    }

    const searchTeams = () => {
        store.dispatch(loadingToggleAction(true))
        setSearchMaster([])
        let params = {
            team_name: searchTeam
        }
        console.log('Component : Search Teams')
        console.log("Request : Post")
        ApiService.postData(API_NAME.SEARCH_TEAMS, params).then(
            (resData) => {
                document.getElementById('ST').value = ''
                if (resData.statusCode === '00') {
                    store.dispatch(loadingToggleAction(false))
                    //Alert('00', resData.message)
                    console.log('===================================')
                    setSearchMaster(resData.data)

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

    const displayMatches = matches
        .map((item, idx) => {
            return (
                <div class="card profile-badges  mb-0" style={{ marginRight: '6%' }}>
                    <div class="card-body">
                        <div class="iq-badges text-left">
                            <div class="badges-icon">
                                <img class="avatar-80 rounded" src="https://templates.iqonic.design/hope-ui/pro/html/social-app/assets/images/profile-badges/01.png" alt="" loading="lazy" />
                                {item.status === undefined || item.status === null ? <span class="badge bg-soft-success rounded-pill p-2 text-success" style={{ float: 'right', marginTop: '45px' }}>Completed</span> : null}
                                {item.status === 'notstarted' ? <span class="badge bg-soft-warning rounded-pill p-2 text-warning" style={{ float: 'right', marginTop: '45px' }}>Upcoming</span> : null}
                                {item.status === 'started' ? <span class="badge bg-soft-danger rounded-pill p-2 text-danger" style={{ float: 'right', marginTop: '45px' }}>Ongoing</span> : null}
                            </div>
                            <h5 class="mb-2">Match No.{idx + 1}</h5>
                            <p class="text-primary"><label style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '60%' }}>{item.team1name === undefined || item.team1name === null ? item.BatFirstName : item.team1name}</label> <h6 style={{ float: 'right' }}> {item.status === undefined || item.status === null ? item.FIScore + "/" + item.FIWickets + " (" + item.FIOvers + " ov)" : ''}</h6><div class="text-info">vs</div> <label style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '60%' }}>{item.team2name === undefined || item.team2name === null ? item.BatSecondName : item.team2name}</label> <h6 style={{ float: 'right' }}> {item.status === undefined || item.status === null ? item.SIScore + "/" + item.SIWickets + " (" + item.SIOvers + " ov)" : ''}</h6></p>
                            {/* <span class="">Started at: 14/Mar/2023 21:41:47</span> */}
                            <div class="text-center">
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-soft-warning">
                        {item.status === undefined || item.status === null ? (item.Winner === item.BatFirst ? item.BatFirstName : item.BatSecondName) + " " + item.Win_Margin : "Started at " + (new Date(item.start_date)).getDate() + "/" + (new Date(item.start_date)).toLocaleString('default', { month: 'short' }) + "/" + (new Date(item.start_date)).getFullYear() + "  " + (new Date(item.start_date)).getHours() + ":" + (new Date(item.start_date)).getMinutes() + ":" + (new Date(item.start_date)).getSeconds()}
                    </div>
                </div>
            )
        })

    const tab1 = () => {
        document.getElementById("nav-home").classList.add("active");
        document.getElementById("nav-profile").classList.remove("active");
        document.getElementById("nav-contact").classList.remove("active");
        document.getElementById("nav-add").classList.remove("active");
    }

    const tab2 = () => {
        document.getElementById("nav-profile").classList.add("active");
        document.getElementById("nav-contact").classList.remove("active");
        document.getElementById("nav-home").classList.remove("active");
        document.getElementById("nav-add").classList.remove("active");
    }

    const tab3 = () => {


        document.getElementById("nav-profile").classList.remove("active");
        document.getElementById("nav-contact").classList.add("active");
        document.getElementById("nav-home").classList.remove("active");
        document.getElementById("nav-add").classList.remove("active");

    }

    const tab4 = () => {

        document.getElementById("nav-add").classList.add("active");
        document.getElementById("nav-profile").classList.remove("active");
        document.getElementById("nav-contact").classList.remove("active");
        document.getElementById("nav-home").classList.remove("active");

    }

    const playertab1 = () => {
        document.getElementById("nav-player-add").classList.add("active");
        document.getElementById("nav-player-search").classList.remove("active");
      
    }

    const playertab2 = () => {
        document.getElementById("nav-player-add").classList.remove("active");
        document.getElementById("nav-player-search").classList.add("active");
        
    }


    const onAddTeam = (event) => {


        store.dispatch(loadingToggleAction(true))
        let params = {
            user_id: sessionStorage.getItem('user_uid'),
            team_name: value.teamName[0],
            team_place: placeTour,
            team_logo: "demo.png",
            tour_id: sessionStorage.getItem('tournamentId')
        }
        event.preventDefault();
        console.log('Component : Add Teams')
        console.log("Request : Post")
        ApiService.postData(API_NAME.ADD_TEAM, params).then(
            (resData) => {
                document.getElementById('ST').value = ''
                if (resData.statusCode === '00') {
                    store.dispatch(loadingToggleAction(false))
                    Alert('00', resData.message)
                    console.log('===================================')
                    fetchTourTeams(sessionStorage.getItem('tournamentId'))

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

    const onAddPlayer = (event) => {

        event.preventDefault();
        store.dispatch(loadingToggleAction(true))
        let params = {
            player_name:playerValue.pname[0],
            player_mobile:playerValue.pmobile[0],
            player_logo:'',
            player_place:playerPlace,
            player_email:playerValue.pemail[0],
            player_dob:playerValue.pdob[0],
            tour_id:sessionStorage.getItem('tournamentId'),
            team_id:localStorage.getItem('teams')==='A' ? sessionStorage.getItem('teamA_id') : sessionStorage.getItem('teamB_id'),
            is_selected:0
        }
       
        console.log('Component : Add Teams')
        console.log("Request : Post")
        console.log(params)
        ApiService.postData(API_NAME.ADD_PLAYER, params).then(
            (resData) => {
                //document.getElementById('ST').value = ''
                if (resData.statusCode === '00') {
                    store.dispatch(loadingToggleAction(false))
                    Alert('00', resData.message)
                    console.log('===================================')
                    //fetchTourTeams(sessionStorage.getItem('tournamentId'))
                    setShowModal3(false)
                    updatePlayerList(localStorage.getItem('teams')==='A' ? 'A' : 'B')

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

   const onTeamSelect = (item)=>{
    
   
    if(teams === 'A')
    {
        console.log(item)
        sessionStorage.setItem('teamA_id',item.team_id)
        sessionStorage.setItem('teamA_players',JSON.stringify(item.playerData))
        setTeamA(item.team_name)
        setTeamAPlace(item.team_place)
        var dataArray = []
        item.playerData.forEach(element => {
            dataArray.push({value:element.player_id,label:element.player_name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })})
        });
        console.log(dataArray)
        setPlayerA(dataArray)
        console.log(playerA)
        setShowModal2(false)


        if(  sessionStorage.getItem('teamA_id') ===  sessionStorage.getItem('teamB_id'))
        {
            Alert('01', 'Team A and Team B can not be same.')
            setTeamA('Team A')
            setTeamAPlace('@India')
            setPlayerA([])
            sessionStorage.setItem('teamA_id','')
         
        }

    }
    else
    {
        console.log(item)
        sessionStorage.setItem('teamB_id',item.team_id)
        sessionStorage.setItem('teamB_players',JSON.stringify(item.playerData))
        setTeamB(item.team_name)
        setTeamBPlace(item.team_place)
        var dataArray = []
        item.playerData.forEach(element => {
            dataArray.push({value:element.player_id,label:element.player_name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })})
        });
        console.log(dataArray)
        setPlayerB(dataArray)
        console.log(playerB)
        setShowModal2(false)

        if(  sessionStorage.getItem('teamA_id') ===  sessionStorage.getItem('teamB_id'))
        {
            Alert('01', 'Team A and Team B can not be same.')
            setTeamB('Team A')
            setTeamBPlace('@India')
            setPlayerB([])
            sessionStorage.setItem('teamB_id','')
         
        }
    }

    
   
    }

    const updatePlayerList =(type)=>{
        
        let params = {
            team_name: type === 'A' ? teamA : teamB
        }
        console.log('Component : Search Teams to update playerss')
        console.log("Request : Post")
        ApiService.postData(API_NAME.SEARCH_TEAMS, params).then(
            (resData) => {
                //document.getElementById('ST').value = ''
                if (resData.statusCode === '00') {
                    store.dispatch(loadingToggleAction(false))
                    //Alert('00', resData.message)
                    console.log('===================================')

                    var item = resData.data[0]

                    if(type==='A')
                    {
                        sessionStorage.setItem('teamA_id',item.team_id)
                        sessionStorage.setItem('teamA_players',JSON.stringify(item.playerData))
                        setTeamA(item.team_name)
                        setTeamAPlace(item.team_place)
    
                        var dataArray = []
                        item.playerData.forEach(element => {
                            dataArray.push({value:element.player_id,label:element.player_name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })})
                        });
                        console.log(dataArray)
                        setPlayerA(dataArray)
                    }
                    else
                    {
                        sessionStorage.setItem('teamB_id',item.team_id)
                        sessionStorage.setItem('teamB_players',JSON.stringify(item.playerData))
                        setTeamB(item.team_name)
                        setTeamBPlace(item.team_place)

                        var dataArray = []
                        item.playerData.forEach(element => {
                            dataArray.push({value:element.player_id,label:element.player_name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })})
                        });
                        console.log(dataArray)
                        setPlayerB(dataArray)
                    }
                    
                    

                }
                else {
                    store.dispatch(loadingToggleAction(false))
                   // Alert('01', resData.message)
                    console.log('==================================')
                }


            }
        ).catch((err) => {
            store.dispatch(loadingToggleAction(false))
            //Alert('01', err.message)
            console.log('==================================')

        });
    }



   
    const Menu = (props) => {
        console.log(props)
        return (
          <Fragment>
            <components.Menu {...props}>
              <div>
                {props.selectProps.fetchingData ? (
                  <span className="fetching">Fetching data...</span>
                ) : (
                  <div>{props.children}</div>
                )}
                   <Button variant="btn btn-primary" style={{ width:'100%'}} onClick={showEdit3}>Add New Players</Button>
              </div>
            </components.Menu>
          </Fragment>
        );
      };

     
  

      const CustomSelect = ({ options }) => {
        return (
          <div>
            <Select
              isMulti
              placeholder = "Select Team A Players"
              onChange={onInputChangePlayerA}
              value={selectedPlayerA}
              options={options}
              components={{ Menu }}
              noOptionsMessage={() => "Click below button to add new players."}
              onMenuOpen={()=>{localStorage.setItem('teams','A'); console.log('A')}}
            />
          </div>
        );
      };

      const CustomSelectB = ({ options }) => {
        return (
          <div>
            <Select
              isMulti
              placeholder = "Select Team B Players"
              onChange={onInputChangePlayerB}
              value={selectedPlayerB}
              options={options}
              components={{ Menu }}
              noOptionsMessage={() => "Click below button to add new players."}
              onMenuOpen={()=>{console.log('B');localStorage.setItem('teams','B')}}
            />
          </div>
        );
      };

      const fetchGrounds = (tag) => {

        ApiService.getData(API_NAME.GROUND_LIST).then(
           (resData) => {
  
              if (resData.statusCode === '00') {
                 var groundData = []
                 resData.data.forEach(element => {
                    groundData.push({ value: element.id, label: element.ground_name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }) })
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
                    commData.push({ value: element.coment_id, label: element.coment_name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }) })
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
                    commData.push({ value: element.umpire_id, label: element.umpire_name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }) })
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

     const onInputChange = (selected,context) => {
        setSelectedGrounds(selected)
      };
  
      const onInputChangeUmpire = (selected,context) => {
        setSelectedUmpire(selected)
      };
  
      const onInputChangeComm = (selected,context) => {
        setSelectedComm(selected)
      };

      const onInputChangePlayerA = (selected,context) => {
        setSelectedPlayerA(selected)
      };

      const onInputChangePlayerB = (selected,context) => {
        setSelectedPlayerB(selected)
      };

     const onScheduleMatch = (event) => {
        event.preventDefault();
        console.log(pitchType)
        console.log(ballType)
        console.log(matchType)
        console.log(placeTour)
        console.log(overs)
        console.log(selectedGrounds)
        console.log(selectedCommm)
        console.log(selectedUmpire)
        console.log(matchDate)
        console.log(selectedPlayerA)
        console.log(selectedPlayerB)


        if(teamA === 'Team A')
        {
            Alert('01', 'Select Team A')
            return;
        }
        else if(teamB === 'Team B')
        {
            Alert('01', 'Select Team B')
            return;
        }

        if(selectedPlayerA === '' || selectedPlayerA.length===0)
        {
            Alert('01', 'Select Team A Players')
            return;
        }
        else if(selectedPlayerB === '' || selectedPlayerB.length===0)
        {
            Alert('01', 'Select Team B Players')
            return;
        }

        let data1 = selectedPlayerA
        const A_ids = []
        data1.forEach(element => {
            A_ids.push(element.value)
        });

        let data2 = selectedPlayerB
        const B_ids = []
        data2.forEach(element => {
            B_ids.push(element.value)
        });

        let data = new Date(matchDate['startdate'][0])
        let date =  data.getDate() + '/' + (+data.getMonth() + 1) + '/' + data.getFullYear()
        let time = data.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

        let params = {
            tour_id:+sessionStorage.getItem('tournamentId'),
            team_one:+sessionStorage.getItem('teamA_id'),
            team_two:+sessionStorage.getItem('teamB_id'),
            team1_players:A_ids.join(),
            team2_players:B_ids.join(),
            match_type:matchType,
            no_of_overs:overs,
            place:placeTour,
            ground_id:selectedGrounds['value'],
            date_time:date + ' ' + time,
            ball_type:ballType,
            pitch_type:pitchType,
            umpire1_id:selectedUmpire['value'],umpire2_id:selectedUmpire['value'],umpire3_id:selectedUmpire['value'],
            commentator_id:selectedCommm['value'],
            bowler_max_ovr:2,
            power_play:'1-2,3-4,5-6',
            scorer_id:sessionStorage.getItem('user_uid'),
            match_status:'Scheduled',
            added_by:sessionStorage.getItem('user_uid')
            }

            console.log(params)

        ApiService.postData(API_NAME.SCHEDULE_MATCH, params).then(
            (resData) => {
             
                if (resData.statusCode === '00') {
                    store.dispatch(loadingToggleAction(false))
                    Alert('00', resData.message)
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
    
        history('/home/edit-score')


     }

     const fetchMatchDetails = (tag) => {
  
        let params = {
            tourid : sessionStorage.getItem('tournamentId')
        }

        ApiService.postData(API_NAME.FETCH_MATCH_DETAILS,params).then(
           (resData) => {
              debugger;
              if (resData.statusCode === '00') {
               // Alert('00', resData.message)
                 console.log('===================================')
              }
              else {
               // Alert('01', resData.message)
                 console.log('==================================')
              }
  
  
           }
        ).catch((err) => {
           console.log('==================================')
  
        });
     }

     useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            { types: ['(cities)'] }
        );

        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            console.log({ place })
            console.log(place.name, place.geometry.location.lat(), place.geometry.location.lng(), place.place_id)
            setPlaceTour(place.name)
            setPlayerPlace(place.name)
        });

        autoCompleteRefAdd.current = new window.google.maps.places.Autocomplete(
            inputRefAdd.current,
            { types: ['(cities)'] }
         );
         
         autoCompleteRefAdd.current.addListener("place_changed", async function () {
            const place = await autoCompleteRefAdd.current.getPlace();
            console.log({place})
            console.log(place.name, place.geometry.location.lat(), place.geometry.location.lng(),place.place_id)
            setPlaceTour(place.name)
            setPlayerPlace(place.name)
      
         });

        fetchTourTeams(sessionStorage.getItem('tournamentId'))

      

        
        fetchGrounds()
        fetchCommentators()
        fetchUmpires()

        fetchMatchDetails()


    }, [showModal2,showModal3])


    return (
        <>
            <ToastContainer />
            <Spinner loading={props.showLoading} />
            <img src={crc} alt="profile-bg" style={{ height: '10.5vh' }} class="rounded img-fluid w-100" loading="lazy" />
            <Row>
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
                                                        <a href="javascript:void(0)" id="idA">{teamA.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })}</a>
                                                    </h4>
                                                    <h6>{teamAPlace.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })}</h6>
                                                    <p>Lorem Ipsum is simply dummy text of the</p>
                                                </div>
                                            </div>
                                            <div class="btn-group" style={{ width: '100%' }} onClick={() => showEdit2('A')}>
                                                <button type="button" class="btn btn-primary"  style={{ textAlign: 'right' }}>Select Team A</button>
                                                <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <span class="visually-hidden">Toggle Dropdown</span>
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </div>


                                            <div style={{ width: '600px', marginTop: '2vh' }}>
                                            <CustomSelect 
                                           
                                            options={playerA} 
                                            />
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
                                                        <a href="javascript:void(0)">{teamB.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })}</a>
                                                    </h4>
                                                    <h6>{teamBPlace.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })}</h6>
                                                    <p>Lorem Ipsum is simply dummy text of the</p>
                                                </div>
                                                <div class="profile-img">
                                                    <img src="https://templates.iqonic.design/hope-ui/pro/html/social-app/assets/images/profile-badges/04.png" alt="profile-img" class="avatar-90 img-fluid rounded-pill border" loading="lazy" />
                                                </div>
                                            </div>

                                            <div class="btn-group" style={{ width: '100%' }} onClick={() => showEdit2('B')}>
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

                                            <div style={{ width: '600px', marginTop: '2vh' }}>
                                            <CustomSelectB 
                                            
                                            options={playerB} 
                                            />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Row>

            <Form onSubmit={onScheduleMatch.bind(this)} >
                <Row>
                    <Col md="6" className="mb-3">
                        <Form.Group className="form-group">
                            <Form.Label htmlFor="exampleFormControlSelect1"> Match Type</Form.Label>
                            <Form.Select required className="form-select" id="exampleFormControlSelect1" 
                                onChange={(e) => setMatchType(e.currentTarget.value)}>
                                <option value="">Select Match Type</option>
                                <option value="Limited Overs">Limited Overs</option>
                                <option value="Test Match">Test Match</option>
                                <option value="The Hundred">The Hundred</option>
                                <option value="Fair Cricket">Fair Cricket</option>
                                <option value="Box Cricket">Box Cricket</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md="6" className="mb-3">
                        <Form.Label md="6" htmlFor="validationDefault01">No. Of overs</Form.Label>
                        <Form.Control type="number" min="1" id="sLimit" name="sLimit"  onChange={(e) => setOvers(e.currentTarget.value)} required/>
                    </Col>
                    <Col md="6" className="mb-3">
                        <Form.Label md="6" htmlFor="validationDefault01">Place</Form.Label>
                        <Form.Control type="text" id="place" ref={inputRefAdd} name="place" defaultValue={placeTour} required />
                    </Col>
                    <Col md="6" className="mb-3">
                                 <Form.Group className="form-group">
                                    <Form.Label htmlFor="choices-multiple-default">Ground</Form.Label>
                                    <Select required 
                                      onChange={onInputChange}
                                       placeholder="Select Grounds"
                                       options={groundMaster}
                                      

                                    />
                                 </Form.Group>

                              </Col>
                    <Col md="6" className="mb-3">
                        <Form.Label htmlFor="validationDefault02">Date and Time</Form.Label>
                        <Form.Control type="datetime-local" required  id="startdate" name="startdate" minDate="0" onChange={(e) => setMatchDate({ ...value, [e.target.name]: [e.target.value] })} />
                    </Col>

                    <Col md="6" className="mb-3">
                        <Form.Group className="form-group">
                            <Form.Label htmlFor="exampleFormControlSelect1"> Ball Type</Form.Label>
                            <Form.Select required className="form-select" id="exampleFormControlSelect1"
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
                    <Col md="6" className="mb-3">
                        <Form.Group className="form-group">
                            <Form.Label htmlFor="exampleFormControlSelect1">Umpire</Form.Label>
                            <Select required 
                                      onChange={onInputChangeUmpire}
                                       placeholder="Select Umpires"
                                       options={umpireMaster}

                                    />
                        </Form.Group>
                    </Col>
                    <Col md="12" className="mb-3">
                        <Form.Group className="form-group">
                            <Form.Label htmlFor="exampleFormControlSelect1">Commentator</Form.Label>
                            <Select required 
                                      onChange={onInputChangeComm}
                                       placeholder="Select Commentator"
                                       options={commMaster}

                                    />
                        </Form.Group>
                    </Col>

                    <Col>

                        <Button variant="btn btn-primary" style={{ float: 'right', marginBottom: '10px', width: '48%', marginRight: '2%' }} type="submit">Start Match</Button>
                        <Button variant="btn btn-warning" style={{ float: 'right', marginBottom: '10px', width: '48%', marginRight: '2%' }} type="submit">Schedule Match</Button>
                    </Col>
                </Row>


            </Form>

          

            <Modal show={showModal2} onHide={showEdit2}  className="recModal">
                <Modal.Header className="btnw" closeButton>
                    <Modal.Title as="h5">Select Team</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div class="bd-example">
                        <nav style={{ marginBottom: '50px' }}>

                            <Nav justify variant="tabs" defaultActiveKey="link-1">
                                <Nav.Item>
                                    <Nav.Link href="#" onClick={tab1}>Tournament Teams</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1" onClick={tab2}>My Teams</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2" onClick={tab3}>Search</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-3" onClick={tab4}>Add</Nav.Link>
                                </Nav.Item>

                            </Nav>


                        </nav>

                        <div class="tab-content iq-tab-fade-up" id="nav-tab-content">
                            <div class="tab-pane fade show " id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <div class="row">
                                    <Col md="13" className="mb-3">

                                        <Form.Control type="text" id="tourName" placeholder='Search...' name="tourName" />
                                    </Col>
                                    {tourTeams.map((item, idx) => {
                                        return (
                                            <div class="col-lg-3 col-md-6" key={idx} onClick={() => onTeamSelect(item)}>
                                                <div class="card bg-soft-info">
                                                    <div class="card-body">
                                                        <div class="d-flex justify-content-between align-items-center">

                                                            <div class="text-start">
                                                                <h6 class="counter" style={{ visibility: 'visible' }}>{item.team_name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })}</h6>
                                                                {item.playerData.length} Members
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}


                                </div>
                            </div>
                            <div class="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <Accordion defaultActiveKey="0">
                                    {myTeams.map((item, idx) => {
                                        return (
                                            <Accordion.Item eventKey={idx} key={idx}>
                                                <Accordion.Header>{item.team_name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })} <Badge variant="bg-primary" className="bg-primary rounded-pill" onClick={() => onTeamSelect(item)} style={{right: '50px', position: 'absolute'}}>Select</Badge></Accordion.Header>
                                                <Accordion.Body>
                                                    {item.playerData.map((item1, idx) => {
                                                        return (
                                                            <span class="badge rounded-pill bg-info" style={{ marginRight: '5px' }} key={idx}>{item1.player_name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })}</span>
                                                            
                                                        )
                                                    })}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    })}
                                </Accordion>
                            </div>
                            <div class="tab-pane fade show" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                <Row>
                                    <Col md="10" className="mb-3">

                                        <Form.Control type="text" id="ST" placeholder='Search Teams...' name="tourName" onChange={(e) => setSearchTeam(e.target.value)} />
                                    </Col>
                                    <Col md="2" className="mb-3">

                                        <Button variant="btn btn-primary" style={{ float: 'right', }} onClick={searchTeams}>Search</Button>
                                    </Col>
                                </Row>

                                <ListGroup as="ol" className="list-group-numbered">
                                    {searchMaster.map((item, idx) => {
                                        return (
                                            <ListGroup.Item key={idx} as="li" className="d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-bold">{item.team_name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })}</div>
                                                    {item.playerData.length} members
                                                </div>
                                                <Badge variant="bg-primary" className="bg-primary rounded-pill" onClick={() => onTeamSelect(item)}>Select</Badge>
                                            </ListGroup.Item>
                                        )
                                    })}
                                </ListGroup>

                            </div>
                            <div class="tab-pane fade show" id="nav-add" role="tabpanel" aria-labelledby="nav-contact-tab">
                                <Form id="tourForm" onSubmit={onAddTeam.bind(this)}>
                                    <Row>
                                        <Col md="12" className="mb-3">
                                            <Form.Label className="custom-file-input">Team Logo</Form.Label>
                                            <Form.Control type="file" accept="image/png, image/gif, image/jpeg" />
                                        </Col>
                                        <Col md="12" className="mb-3">
                                            <Form.Label md="6" htmlFor="validationDefault01"> Name</Form.Label>
                                            <Form.Control type="text" id="tourName" placeholder='Enter name' name="teamName" onChange={(e) => setValue({ ...value, [e.target.name]: [e.target.value] })} required />
                                        </Col>
                                        <Col md="6" className="mb-3">
                                            <Form.Label md="6" htmlFor="validationDefault01">Place</Form.Label>
                                            <Form.Control type="text" id="place" ref={inputRef} name="place" defaultValue={placeTour} required />
                                       </Col>
                                    </Row>
                                    <Form.Group>
                                        <Button variant="btn btn-primary" style={{ float: 'right', }} type='submit'>Add</Button>
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>

                    </div>

                </Modal.Body>

            </Modal>

            <Modal show={showModal3} onHide={showEdit3} className="recModal">
                <Modal.Header className="btnw" closeButton>
                    <Modal.Title as="h5">Add New Players</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div class="bd-example">
                        <nav style={{ marginBottom: '50px' }}>

                            <Nav justify variant="tabs" defaultActiveKey="#">
                                <Nav.Item>
                                    <Nav.Link href="#" onClick={playertab1}>Add</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1" onClick={playertab2}>Search</Nav.Link>
                                </Nav.Item>
                               

                            </Nav>


                        </nav>

                        <div class="tab-content iq-tab-fade-up" >
                            <div class="tab-pane fade show active" id="nav-player-add" role="tabpanel" aria-labelledby="nav-home-tab" >
                            <Form id="tourForm" onSubmit={onAddPlayer.bind(this)}>
                                    <Row>
                                        <Col md="6" className="mb-3">
                                            <Form.Label className="custom-file-input">Player Profile</Form.Label>
                                            <Form.Control type="file" accept="image/png, image/gif, image/jpeg" />
                                        </Col>
                                        <Col md="6" className="mb-3">
                                            <Form.Label md="6" htmlFor="validationDefault01"> Name</Form.Label>
                                            <Form.Control type="text" id="tourName" placeholder='Enter name' name="pname" onChange={(e) => setPlayerValue({ ...playerValue, [e.target.name]: [e.target.value] })} required />
                                        </Col>
                                        <Col md="6" className="mb-3">
                                            <Form.Label md="6" htmlFor="validationDefault01"> Mobile </Form.Label>
                                            <Form.Control type="text" id="tourName" placeholder='Enter mobile' name="pmobile" onChange={(e) => setPlayerValue({ ...playerValue, [e.target.name]: [e.target.value] })} required />
                                        </Col>
                                        <Col md="6" className="mb-3">
                                            <Form.Label md="6" htmlFor="validationDefault01"> Place</Form.Label>
                                            <Form.Control type="text" id="place" placeholder='Enter place' ref={inputRef} defaultValue={playerPlace} required />
                                        </Col>
                                        <Col md="6" className="mb-3">
                                            <Form.Label md="6" htmlFor="validationDefault01"> Email </Form.Label>
                                            <Form.Control type="email" id="tourName" placeholder='Enter email' name="pemail" onChange={(e) => setPlayerValue({ ...playerValue, [e.target.name]: [e.target.value] })} required />
                                        </Col>
                                        <Col md="6" className="mb-3">
                                        <Form.Label htmlFor="validationDefault02">DOB</Form.Label>
                                        <Form.Control type="date" id="exampleInputdate" name="pdob" onChange={(e) => setPlayerValue({ ...playerValue, [e.target.name]: [e.target.value] })} required />
                                    </Col>
                                    </Row>
                                    <Form.Group>
                                        <Button variant="btn btn-primary" style={{ float: 'right', }} type='submit'>Add</Button>
                                    </Form.Group>
                                </Form>
                            </div>
                            
                            <div class="tab-pane fade show" id="nav-player-search" role="tabpanel" aria-labelledby="nav-contact-tab">
                                <Row>
                                    <Col md="10" className="mb-3">

                                        <Form.Control type="text" id="ST" placeholder='Search Teams...' name="tourName" onChange={(e) => setSearchTeam(e.target.value)} />
                                    </Col>
                                    <Col md="2" className="mb-3">

                                        <Button variant="btn btn-primary" style={{ float: 'right', }} onClick={searchTeams}>Search</Button>
                                    </Col>
                                </Row>

                                <ListGroup as="ol" className="list-group-numbered">
                                    {searchMaster.map((item, idx) => {
                                        return (
                                            <ListGroup.Item key={idx} as="li" className="d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-bold">{item.team_name}</div>
                                                    {item.playerData.length} members
                                                </div>
                                                <Badge variant="bg-primary" className="bg-primary rounded-pill">Select</Badge>
                                            </ListGroup.Item>
                                        )
                                    })}
                                </ListGroup>

                            </div>
                            
                        </div>

                    </div>

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
