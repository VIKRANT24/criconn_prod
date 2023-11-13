import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Modal, Button, OverlayTrigger, ListGroup, Nav, SplitButton,Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Select from 'react-select';
import Alert from '../../../components/toast/toast'
import { loadingToggleAction } from "../../../store/action/common";
import store from "../../../store/store";
import { API_NAME } from '../../../utils/constants';
import ApiService from '../../../services/service'

// img

import Card from '../../../components/card/card'
import './edit.scss'

import { ToastContainer } from 'react-toastify'






const EditScore = () => {
  const [showModalTeamSelect, setshowModalTeamSelect] = React.useState(false);
  const [showModalMatchSetting, setshowModalMatchSetting] = React.useState(false);
  const [showModalMatchSetup, setshowModalMatchSetup] = React.useState(false);
  const [showModalEditBall, setshowModalEditBall] = React.useState(false);
  const [showModalSelectBatter, setshowModalSelectBatter] = React.useState(false);
  const [showModalSelectNS, setshowModalSelectNS] = React.useState(false);
  const [showModalSelectBowler, setshowModalSelectBowler] = React.useState(false);
  const [showModalChangeBatter, setshowModalChangeBatter] = React.useState(false);
  const [showModalChangeBowler, setshowModalChangeBowler] = React.useState(false);
  const [showModalNewBatter, setshowModalNewBatter] = React.useState(false);
  const [showModalNewBowler, setshowModalNewBowler] = React.useState(false);
  const [showModalWicket, setshowModalWicket] = React.useState(false);
  const [teamA, setTEAMA] = React.useState([]);
  const [teamB, setTEAMB] = React.useState([]);
  const [showModalEndInnings, setshowModalEndInnings] = React.useState(false);
  const [showModalScorecard, setshowModalScorecard] = React.useState(false);
  const [showModalWide, setshowModalWide] = React.useState(false);

  //logic start
  const [inningNo, setInningNo] = useState(1)
  const [match, setMatch] = useState({ inning1: { batters: [], bowlers: [] }, inning2: { batters: [], bowlers: [] } })
  const [currentRunStack, setCurrentRunStack] = useState([])
  const [totalRuns, setTotalRuns] = useState(0)
  const [extras, setExtras] = useState({ total: 0, wide: 0, noBall: 0 })
  const [runsByOver, setRunsByOver] = useState(0)
  const [wicketCount, setWicketCount] = useState(0)
  const [totalOvers, setTotalOvers] = useState(0)
  const [batters, setBatters] = useState([])
  const [ballCount, setBallCount] = useState(0)
  const [overCount, setOverCount] = useState(0)
  const [recentOvers, setRecentOvers] = useState([])
  const [batter1, setBatter1] = useState({})
  const [batter2, setBatter2] = useState({})
  const [battingOrder, setBattingOrder] = useState(0)
  const [isBatter1Edited, setBatter1Edited] = useState(false)
  const [isBatter2Edited, setBatter2Edited] = useState(false)
  const [isBowlerEdited, setBowlerEdited] = useState(false)
  const [bowler, setBowler] = useState({})
  const [bowlers, setBowlers] = useState([])
  const [inputBowler, setInputBowler] = useState('')
  const [isModalOpen, setModalOpen] = React.useState(false)
  const [outType, setOutType] = React.useState('')
  const [runOutPlayerId, setRunOutPlayerId] = React.useState('')
  const [remainingBalls, setRemainingBalls] = useState(0)
  const [remainingRuns, setRemainingRuns] = useState(0)
  const [strikeValue, setStrikeValue] = React.useState('strike')
  const [isNoBall, setNoBall] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [hasNameSuggested, setNameSuggested] = useState(false)
  const [hasMatchEnded, setMatchEnded] = useState(false)
  const [currentRunBallByBall, setCurrentRunBallByBall] = useState([])
  const [tossWon, setTossWon] = useState('')
  const [electedTo, setElectedTo] = useState('')

  const [scoring_team, setScoring_Team] = useState('')
  const [chessing_team, setChessing_Team] = useState('')

  const [STRIKER, setSTRIKER] = useState('')
  const [NSTRIKER, setNSTRIKER] = useState('')
  const [CBOWLER, setCBOWLER] = useState('')
  const [CBOWLER_ID, setCBOWLER_ID] = useState('')

  const [batterOuts, setbatterOuts] = useState('')
  const [dismissalTypes, setdismissalTypes] = useState('')
  const [bowlerWicketTakers, setbowlerWicketTakers] = useState('')
  const [fielderAssists, setfielderAssists] = useState('')

  const [strikerFlag, setstrikerFlag] = useState(false)
 

  



  const [currentBowlerData, setcurrentBowlerData] = useState({
    id: '',
    name: "",
    over: 0.0,
    maiden: 0,
    runs: 0,
    wicket: 0,
    noBall: 0,
    wide: 0,
    economy: 0,
    ballCount: 0
  })



  const BATTING = 'Batting'
  const YET_TO_BAT = 'Yet to Bat'
  const OUT = 'Out'
  const team_1 = "Mumbai Indians"
  const team_2 = "Royal Challengers Bangalore"
  const data = { "team1": team_1, "team2": team_2, "maxOver": "3", "batting": team_2 }
  let { batting, team1, team2 } = data
  const maxOver = parseInt(data.maxOver)

  class MathUtil {
    static getRandomNo() {
      const min = 100
      const max = 999
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  }


  const handleEndInning = (e) => {
    // const endInningButton = document.getElementById('end-inning')

    if(hasMatchEnded===true)
      return;

    if (batter1.id !== undefined) {
      const { id, name, run, ball, four, six, strikeRate, onStrike } = batter1
      batters.push({
        id,
        name,
        run,
        ball,
        four,
        six,
        strikeRate,
        onStrike,
        battingOrder: batter1.battingOrder,
        battingStatus: BATTING,
      })
    }
    if (batter2.id !== undefined) {
      batters.push({
        id: batter2.id,
        name: batter2.name,
        run: batter2.run,
        ball: batter2.ball,
        four: batter2.four,
        six: batter2.six,
        strikeRate: batter2.strikeRate,
        onStrike: batter2.onStrike,
        battingOrder: batter2.battingOrder,
        battingStatus: BATTING,
      })
    }
    if (bowler.id !== undefined) {
      const currentDisplayOver = Math.round((ballCount === 6 ? 1 : ballCount * 0.1) * 10) / 10
      let isMaidenOver = true
      let countWicket = 0
      let countNoBall = 0
      let countWide = 0
      const deliveries = ['1', '2', '3', '4', '6', 'wd']
      for (let delivery of currentRunStack) {
        delivery = delivery.toString()
        if (deliveries.includes(delivery) || delivery.includes('nb')) {
          isMaidenOver = false
        }
        if (delivery === 'W') {
          countWicket++
        }
        if (delivery.includes('nb')) {
          countNoBall++
        }
        if (delivery.includes('wd')) {
          countWide++
        }
      }
      if (ballCount !== 6) {
        isMaidenOver = false
      }
      const index = bowlers.findIndex((blr) => {
        return blr.id === bowler.id
      })
      if (index !== -1) {
        const existingBowler = bowlers[index]
        const { maiden, wicket, noBall, wide, over } = existingBowler
        const bowlerTotalOver = over + ballCount / 6
        existingBowler.over = existingBowler.over + currentDisplayOver
        existingBowler.maiden = isMaidenOver ? maiden + 1 : maiden
        existingBowler.run = existingBowler.run + runsByOver
        existingBowler.wicket = wicket + countWicket
        existingBowler.noBall = noBall + countNoBall
        existingBowler.wide = wide + countWide
        existingBowler.economy = Math.round((existingBowler.run / bowlerTotalOver) * 100) / 100
        bowlers[index] = existingBowler
        setBowlers(bowlers)
      } else {
        if (ballCount !== 6) {
          bowlers.push({
            id: bowler.id,
            name: bowler.name,
            over: currentDisplayOver,
            maiden: isMaidenOver ? 1 : 0,
            run: runsByOver,
            wicket: countWicket,
            noBall: countNoBall,
            wide: countWide,
            economy: Math.round((runsByOver / (ballCount / 6)) * 100) / 100,
          })
          setBowlers(bowlers)
        }
      }
    }
    if (inningNo === 1) {
      setMatch((state) => {
        const totalFours = batters.map((batter) => batter.four).reduce((prev, next) => prev + next)
        const totalSixes = batters.map((batter) => batter.four).reduce((prev, next) => prev + next)
        return {
          ...state,
          inning1: {
            runs: totalRuns,
            wickets: wicketCount,
            runRate: crr,
            overs: totalOvers,
            four: totalFours,
            six: totalSixes,
            extra: extras,
            batters,
            bowlers,
          },
        }
      })
      setInningNo(2)
      setCurrentRunStack([])
      setTotalRuns(0)
      setExtras({ total: 0, wide: 0, noBall: 0 })
      setRunsByOver(0)
      setWicketCount(0)
      setTotalOvers(0)
      setBallCount(0)
      setOverCount(0)
      setRecentOvers([])
      setBatter1({})
      setBatter2({})
      setBatters([])
      setBowlers([])
      setBattingOrder(0)
      setInputBowler('')
      setBowler({})
      setRemainingBalls(maxOver * 6)
      setRemainingRuns(totalRuns + 1)
      setSTRIKER('')
      setNSTRIKER('')

      setStrikeValue('strike')
      // endInningButton.disabled = true
    } else {
      setMatch((state) => {
        const totalFours = batters.map((batter) => batter.four).reduce((prev, next) => prev + next)
        const totalSixes = batters.map((batter) => batter.four).reduce((prev, next) => prev + next)
        return {
          ...state,
          inning2: {
            runs: totalRuns,
            wickets: wicketCount,
            runRate: crr,
            overs: totalOvers,
            four: totalFours,
            six: totalSixes,
            extra: extras,
            batters,
            bowlers,
          },
        }
      })
      // endInningButton.textContent = 'Reset'
      setMatchEnded(true)
    }
    setshowModalEndInnings(false)
    setshowModalScorecard(true)
    setstrikerFlag(false)



  }
  const handleBatter1Blur = (e) => {
    //let name = e.target.value
    //name = name.charAt(0).toUpperCase() + name.slice(1)
    // e.target.value = name
    // e.target.disabled = true

    let name = e
    name = name.charAt(0).toUpperCase() + name.slice(1)

    if (isBatter1Edited) {
      setBatter1((state) => ({
        ...state,
        name: name,
      }))
      setBatter1Edited(false)
    } else {
      const randomNo = MathUtil.getRandomNo()
      setBatter1({
        id: name + randomNo,
        name: name,
        run: 0,
        ball: 0,
        four: 0,
        six: 0,
        strikeRate: 0,
        onStrike: strikeValue === 'strike' ? true : false,
        battingOrder: battingOrder + 1,
        battingStatus: BATTING,
      })
      setBattingOrder(battingOrder + 1)
    }
  }
  const handleBatter2Blur = (e) => {
    //let name = e.target.value
    //name = name.charAt(0).toUpperCase() + name.slice(1)
    // e.target.value = name
    // e.target.disabled = true

    let name = e
    name = name.charAt(0).toUpperCase() + name.slice(1)
    if (isBatter2Edited) {
      setBatter2((state) => ({
        ...state,
        name: name,
      }))
      setBatter2Edited(false)
    } else {
      const randomNo = MathUtil.getRandomNo()
      setBatter2({
        id: name + randomNo,
        name: name,
        run: 0,
        ball: 0,
        four: 0,
        six: 0,
        strikeRate: 0,
        onStrike: strikeValue === 'non-strike' ? true : false,
        battingOrder: battingOrder + 1,
        battingStatus: BATTING,
      })
      setBattingOrder(battingOrder + 1)
    }
  }
  const handleBowlerBlur = () => {
    let name = CBOWLER
    const id = CBOWLER_ID
    setBowler({
      id,
      name,
    })
    setBowlerData()
  }

  const setBowlerData = () => {
    const index = bowlers.findIndex((blr) => {
      return blr.id === CBOWLER_ID
    })


    if (index !== -1) {
      const existingBowler = bowlers[index]
      const { maiden, wicket, noBall, wide, over, run, name, id } = existingBowler

      setcurrentBowlerData({
        id: id,
        name: name,
        over: over,
        maiden: maiden,
        runs: run,
        wicket: wicket,
        noBall: noBall,
        wide: wide,
        economy: 0,
        ballCount: 0
      })
    }
    else {
      setcurrentBowlerData({
        id: '',
        name: "",
        over: 0.0,
        maiden: 0,
        runs: 0,
        wicket: 0,
        noBall: 0,
        wide: 0,
        economy: 0,
        ballCount: 0
      })
    }

    if (inningNo === 1)
      localStorage.setItem('1_noball', extras.noBall)
    else
      localStorage.setItem('2_noball', extras.noBall)

  }

  const onSuggestionsFetchRequested = (param) => {
    const inputValue = param.value.trim().toLowerCase()
    const suggestionArr = inputValue.length === 0 ? [] : bowlers.filter((bowlerObj) => bowlerObj.name.toLowerCase().includes(inputValue))
    setSuggestions(suggestionArr)
  }
  const getSuggestionValue = (suggestion) => {
    setBowler({
      id: suggestion.id,
      name: suggestion.name,
    })
    setNameSuggested(true)
    return suggestion.name
  }
  const inputProps = {
    value: inputBowler,
    onChange: (e, { newValue }) => {
      setInputBowler(newValue)
    },
    onBlur: handleBowlerBlur,
  }
  const overCompleted = (runsByOverParam, currentRunStackParam) => {
    const bowlerNameElement = document.querySelector('.react-autosuggest__input')
    if (overCount + 1 === maxOver) {
      const endInningButton = document.getElementById('end-inning')
      //  endInningButton.disabled = false
      //handleEndInning()
      setshowModalEndInnings(true)
    } else {
      // bowlerNameElement.disabled = false
    }
    disableAllScoreButtons()
    setRecentOvers((state) => [
      ...state,
      { overNo: overCount + 1, bowler: bowler.name, runs: runsByOverParam, stack: currentRunStackParam },
    ])
    setInputBowler('')
    setBowler({})
    setCurrentRunStack([])
    setRunsByOver(0)
    setBallCount(0)
    setOverCount(overCount + 1)
    const index = bowlers.findIndex((blr) => blr.id === bowler.id)
    let isMaidenOver = true
    let countWicket = 0
    let countNoBall = 0
    let countWide = 0
    const deliveries = ['1', '2', '3', '4', '6', 'wd']
    for (let delivery of currentRunStackParam) {
      delivery = delivery.toString()
      if (deliveries.includes(delivery) || delivery.includes('nb')) {
        isMaidenOver = false
      }
      if (delivery === 'W') {
        countWicket++
      }
      if (delivery.includes('nb')) {
        countNoBall++
      }
      if (delivery.includes('wd')) {
        countWide++
      }
    }
    if (index !== -1) {
      const existingBowler = bowlers[index]
      const { over, maiden, run, wicket, noBall, wide } = existingBowler
      existingBowler.over = over + 1
      existingBowler.maiden = isMaidenOver ? maiden + 1 : maiden
      existingBowler.run = run + runsByOverParam
      existingBowler.wicket = wicket + countWicket
      existingBowler.noBall = noBall + countNoBall
      existingBowler.wide = wide + countWide
      existingBowler.economy = Math.round((existingBowler.run / existingBowler.over) * 100) / 100
      bowlers[index] = existingBowler
      setBowlers(bowlers)
      console.log('Bowlers stats', bowler)
      console.log('Batter1 stats', batter1)
      console.log('Batter2 stats', batter2)

    } else {
      setBowlers((state) => [
        ...state,
        {
          id: bowler.id,
          name: bowler.name,
          over: 1,
          maiden: isMaidenOver ? 1 : 0,
          run: runsByOverParam,
          wicket: countWicket,
          noBall: countNoBall,
          wide: countWide,
          economy: runsByOverParam,
        },
      ])
      console.log('Bowlers stats', bowler)
      console.log('Batter1 stats', batter1)
      console.log('Batter2 stats', batter2)


    }


    console.log("curenttttttt bowlerrrrrr", currentBowlerData)
    //new code
    const existingBowler1 = currentBowlerData
    existingBowler1.over = (+existingBowler1.over).toFixed()
    //new code  

    setcurrentBowlerData({
      id: '',
      name: "",
      over: 0.0,
      maiden: 0,
      runs: 0,
      wicket: 0,
      noBall: 0,
      wide: 0,
      economy: 0,
      ballCount: 0
    })
    setCBOWLER('')

    if (overCount + 1 != maxOver) {
      setshowModalSelectBowler(true)

    }

  }
  const newBatter1 = () => {
    //const batter1NameElement = document.getElementById('batter1Name')
    //batter1NameElement.value = ''
    //batter1NameElement.disabled = false
    const { id, name, run, ball, four, six, strikeRate, onStrike } = batter1
    setBatters((state) => [
      ...state,
      {
        id,
        name,
        run,
        ball,
        four,
        six,
        strikeRate,
        onStrike,
        battingOrder: batter1.battingOrder,
        battingStatus: OUT,
      },
    ])
    setBatter1({})
  }
  const newBatter2 = () => {
    // const batter2NameElement = document.getElementById('batter2Name')
    // batter2NameElement.value = ''
    // batter2NameElement.disabled = false
    const { id, name, run, ball, four, six, strikeRate, onStrike } = batter2
    setBatters((state) => [
      ...state,
      {
        id,
        name,
        run,
        ball,
        four,
        six,
        strikeRate,
        onStrike,
        battingOrder: batter2.battingOrder,
        battingStatus: OUT,
      },
    ])
    setBatter2({})
  }
  const editBatter1Name = () => {
    if (overCount !== maxOver && wicketCount !== 10 && !hasMatchEnded) {
      const batter1NameElement = document.getElementById('batter1Name')
      batter1NameElement.disabled = false
      setBatter1Edited(true)
    }
  }
  const editBatter2Name = () => {
    if (overCount !== maxOver && wicketCount !== 10 && !hasMatchEnded) {
      const batter2NameElement = document.getElementById('batter2Name')
      batter2NameElement.disabled = false
      setBatter2Edited(true)
    }
  }
  const editBowlerName = () => {
    if (overCount !== maxOver && wicketCount !== 10 && !hasMatchEnded) {
      const bowlerNameElement = document.querySelector('.react-autosuggest__input')
      bowlerNameElement.disabled = false
      setBowlerEdited(true)
    }
  }
  const undoWicket = (isNoBallParam) => {
    if (!isNoBallParam) {
      setBallCount(ballCount - 1)
      setTotalOvers(Math.round((totalOvers - 0.1) * 10) / 10)
    }
    setWicketCount(wicketCount - 1)
    const batter = batters[batters.length - 1]
    const { id, name, run, ball, four, six, strikeRate, onStrike } = batter
    if (batter1.name === undefined || batter1.onStrike) {
      // const batter1NameElement = document.getElementById('batter1Name')
      // batter1NameElement.value = batter.name
      // batter1NameElement.disabled = true
      setBatter1({
        id,
        name,
        run,
        ball,
        four,
        six,
        strikeRate,
        onStrike,
        battingOrder: batter.battingOrder,
        battingStatus: BATTING,
      })
      if (!batter.onStrike) {
        changeStrikeRadio()
        setBatter2((state) => ({
          ...state,
          onStrike: true,
        }))
      }
      setSTRIKER(name)

      let indexData = teamA.findIndex(e=>e.player_name===batter.name)
        if(indexData>-1)
        teamA[indexData].is_Batting = "1"
        else
        {
          indexData = teamB.findIndex(e=>e.player_name===batter.name)
          teamB[indexData].is_Batting = "1"
        }

    } else if (batter2.name === undefined || batter2.onStrike) {
      // const batter2NameElement = document.getElementById('batter2Name')
      // batter2NameElement.value = batter.name
      // batter2NameElement.disabled = true
      setBatter2({
        id,
        name,
        run,
        ball,
        four,
        six,
        strikeRate,
        onStrike,
        battingOrder: batter.battingOrder,
        battingStatus: BATTING,
      })
      if (!batter.onStrike) {
        changeStrikeRadio()
        setBatter1((state) => ({
          ...state,
          onStrike: true,
        }))
      }
      setNSTRIKER(name)

      let indexData = teamA.findIndex(e=>e.player_name===batter.name)
      if(indexData>-1)
      teamA[indexData].is_Batting = "1"
      else
      {
        indexData = teamB.findIndex(e=>e.player_name===batter.name)
        teamB[indexData].is_Batting = "1"
      }

    }
    batters.pop()
    setBatters(batters)

    if(inningNo===1)
    {
       if(scoring_team===team_1)
       {
          let indexData = teamA.findIndex(e=>e.player_name===(batter1.onStrike ? STRIKER : NSTRIKER))
          teamA[indexData].is_Batting="0"
       }
       else
       {
        let indexData = teamB.findIndex(e=>e.player_name===(batter1.onStrike ? STRIKER : NSTRIKER))
        teamB[indexData].is_Batting="0"
       }
    }
    else
    {
      if(chessing_team===team_1)
      {
         let indexData = teamA.findIndex(e=>e.player_name===(batter1.onStrike ? STRIKER : NSTRIKER))
         teamA[indexData].is_Batting="0"
      }
      else
      {
       let indexData = teamB.findIndex(e=>e.player_name===(batter1.onStrike ? STRIKER : NSTRIKER))
       teamB[indexData].is_Batting="0"
      }
    }


    const existingBowler = currentBowlerData
    existingBowler.over = (+existingBowler.over - 0.1).toFixed(1)
    existingBowler.wicket = existingBowler.wicket - 1

  }
  const undoRun = (run, isNoBallParam,isWideBallParam) => {
    if (isNoBallParam) {
      setTotalRuns(totalRuns - (run + 1))
      setRunsByOver(runsByOver - (run + 1))
      setExtras((state) => ({
        ...state,
        noBall: state.noBall - 1,
        total: state.total - 1,
      }))

      //current bowler 
      const existingBowler = currentBowlerData
      existingBowler.runs = existingBowler.runs - (run + 1)

    } 
    else if(isWideBallParam)
    {
      setTotalRuns(totalRuns - (run + 1))
      setRunsByOver(runsByOver - (run + 1))
      setExtras((state) => ({
        ...state,
        wide: state.wide - 1,
        total: state.total - 1,
      }))

      //current bowler 
      const existingBowler = currentBowlerData
      existingBowler.runs = existingBowler.runs - (run + 1)
    }
    
    else {
      setTotalRuns(totalRuns - run)
      setRunsByOver(runsByOver - run)
      setBallCount(ballCount - 1)
      setTotalOvers(Math.round((totalOvers - 0.1) * 10) / 10)
      currentRunStack.pop()
      setCurrentRunStack(currentRunStack)
    }
    if(isNoBallParam)
    {
      if (batter1.onStrike) {
        if (run % 2 === 0) {
          setBatter1((state) => {
            const updatedRun = state.run - run
            const updatedBall = state.ball - 1
            const updatedSr = updatedRun / updatedBall
            const sr = Math.round(isNaN(updatedSr) ? 0 : updatedSr * 100 * 100) / 100
            let four = state.four
            if (run === 4) {
              four = four - 1
            }
            let six = state.six
            if (run === 6) {
              six = six - 1
            }
            return {
              ...state,
              run: updatedRun,
              ball: updatedBall,
              four: four,
              six: six,
              strikeRate: sr,
            }
          })
        } else {
          changeStrikeRadio()
          switchBatterStrike()
          setBatter2((state) => {
            const updatedRun = state.run - run
            const updatedBall = state.ball - 1
            const updatedSr = updatedRun / updatedBall
            const sr = Math.round(isNaN(updatedSr) ? 0 : updatedSr * 100 * 100) / 100
            let four = state.four
            if (run === 4) {
              four = four - 1
            }
            let six = state.six
            if (run === 6) {
              six = six - 1
            }
            return {
              ...state,
              run: updatedRun,
              ball: updatedBall,
              four: four,
              six: six,
              strikeRate: sr,
            }
          })
        }
      } else if (batter2.onStrike) {
        if (run % 2 === 0) {
          setBatter2((state) => {
            const updatedRun = state.run - run
            const updatedBall = state.ball - 1
            const updatedSr = updatedRun / updatedBall
            const sr = Math.round(isNaN(updatedSr) ? 0 : updatedSr * 100 * 100) / 100
            let four = state.four
            if (run === 4) {
              four = four - 1
            }
            let six = state.six
            if (run === 6) {
              six = six - 1
            }
            return {
              ...state,
              run: updatedRun,
              ball: updatedBall,
              four: four,
              six: six,
              strikeRate: sr,
            }
          })
        } else {
          changeStrikeRadio()
          switchBatterStrike()
          setBatter1((state) => {
            const updatedRun = state.run - run
            const updatedBall = state.ball - 1
            const updatedSr = updatedRun / updatedBall
            const sr = Math.round(isNaN(updatedSr) ? 0 : updatedSr * 100 * 100) / 100
            let four = state.four
            if (run === 4) {
              four = four - 1
            }
            let six = state.six
            if (run === 6) {
              six = six - 1
            }
            return {
              ...state,
              run: updatedRun,
              ball: updatedBall,
              four: four,
              six: six,
              strikeRate: sr,
            }
          })
        }
      }
    }
    else if(isWideBallParam)
    {
      if (batter1.onStrike) {
        if (run % 2 === 0) {
        }
        else {
          changeStrikeRadio()
          switchBatterStrike()
      }
    }
    else if (batter2.onStrike) {
      if (run % 2 === 0) {
      }
      else {
        changeStrikeRadio()
        switchBatterStrike()
      }
    } 
  }
  else
  {
    if (batter1.onStrike) {
      if (run % 2 === 0) {
        setBatter1((state) => {
          const updatedRun = state.run - run
          const updatedBall = state.ball - 1
          const updatedSr = updatedRun / updatedBall
          const sr = Math.round(isNaN(updatedSr) ? 0 : updatedSr * 100 * 100) / 100
          let four = state.four
          if (run === 4) {
            four = four - 1
          }
          let six = state.six
          if (run === 6) {
            six = six - 1
          }
          return {
            ...state,
            run: updatedRun,
            ball: updatedBall,
            four: four,
            six: six,
            strikeRate: sr,
          }
        })
      } else {
        changeStrikeRadio()
        switchBatterStrike()
        setBatter2((state) => {
          const updatedRun = state.run - run
          const updatedBall = state.ball - 1
          const updatedSr = updatedRun / updatedBall
          const sr = Math.round(isNaN(updatedSr) ? 0 : updatedSr * 100 * 100) / 100
          let four = state.four
          if (run === 4) {
            four = four - 1
          }
          let six = state.six
          if (run === 6) {
            six = six - 1
          }
          return {
            ...state,
            run: updatedRun,
            ball: updatedBall,
            four: four,
            six: six,
            strikeRate: sr,
          }
        })
      }
    } else if (batter2.onStrike) {
      if (run % 2 === 0) {
        setBatter2((state) => {
          const updatedRun = state.run - run
          const updatedBall = state.ball - 1
          const updatedSr = updatedRun / updatedBall
          const sr = Math.round(isNaN(updatedSr) ? 0 : updatedSr * 100 * 100) / 100
          let four = state.four
          if (run === 4) {
            four = four - 1
          }
          let six = state.six
          if (run === 6) {
            six = six - 1
          }
          return {
            ...state,
            run: updatedRun,
            ball: updatedBall,
            four: four,
            six: six,
            strikeRate: sr,
          }
        })
      } else {
        changeStrikeRadio()
        switchBatterStrike()
        setBatter1((state) => {
          const updatedRun = state.run - run
          const updatedBall = state.ball - 1
          const updatedSr = updatedRun / updatedBall
          const sr = Math.round(isNaN(updatedSr) ? 0 : updatedSr * 100 * 100) / 100
          let four = state.four
          if (run === 4) {
            four = four - 1
          }
          let six = state.six
          if (run === 6) {
            six = six - 1
          }
          return {
            ...state,
            run: updatedRun,
            ball: updatedBall,
            four: four,
            six: six,
            strikeRate: sr,
          }
        })
      }
    }
  }
}
  const undoDelivery = () => {
    if (currentRunStack.length > 0) {
      const last = currentRunStack[currentRunStack.length - 1]
      if (typeof last === 'number') {
        const run = parseInt(last)
        undoRun(run, false,false)
        //bowler new code
        const existingBowler = currentBowlerData
        existingBowler.over = (+existingBowler.over - 0.1).toFixed(1)
        existingBowler.runs = existingBowler.runs - run
        setRemainingBalls(remainingBalls + 1)
        setRemainingRuns(remainingRuns + run)

      } else {
        currentRunStack.pop()
        setCurrentRunStack(currentRunStack)
        if (last.includes('wd')) {
          // setTotalRuns(totalRuns - 1)
          // setExtras((state) => ({
          //   ...state,
          //   total: state.total - 1,
          //   wide: state.wide - 1,
          // }))
          // //bowler new code
          // const existingBowler = currentBowlerData
          // existingBowler.runs = existingBowler.runs - 1

          const lastChar = last.substr(last.length - 1)
          const run = parseInt(lastChar)
          setRemainingRuns(remainingRuns + 1 +run)
          undoRun(run, false,true)


        } else if (last === 'W') {
          undoWicket(false)
        } else {
          const lastChar = last.substr(last.length - 1)
          const run = parseInt(lastChar)
          if (isNaN(run)) {
            setTotalRuns(totalRuns - 1)
            setRunsByOver(runsByOver - 1)
            setExtras((state) => ({
              ...state,
              total: state.total - 1,
              noBall: state.noBall - 1,
            }))
            if (last !== 'nb') {
              undoWicket(true)
            }
            //bowler new code
            const existingBowler = currentBowlerData
            existingBowler.runs = existingBowler.runs - 1

          } else {
            setRemainingRuns(remainingRuns + 1 +run)
            undoRun(run, true,false)
            
          }
        }
      }
    }
    else {
      //new code for undo
      if (extras.total > 0 && extras.noBall > 0) {
        let last_stored_nb = inningNo === 1 ? +localStorage.getItem('1_noball') : +localStorage.getItem('2_noball')
        if (last_stored_nb != extras.noBall) {
          setExtras((state) => ({
            ...state,
            total: state.total - 1,
            noBall: state.noBall - 1,
          }))

          setTotalRuns(totalRuns - 1)
          setRunsByOver(runsByOver - 1)

          const existingBowler = currentBowlerData
          existingBowler.runs = existingBowler.runs - 1
        }

      }

    }
    winningMessage = `${inningNo === 1 ? scoring_team : chessing_team} needs ${remainingRuns} ${remainingRuns <= 1 ? 'run' : 'runs'
    } in ${remainingBalls} ${remainingBalls <= 1 ? 'ball' : 'balls'} to win`
  }
  const handleStrikeChange = (e) => {
    changeStrikeRadio(e.target.value)
    if (e.target.value === 'strike') {
      switchBatterStrike('batter1')
    } else {
      switchBatterStrike('batter2')
    }
  }
  const changeStrikeRadio = (strikeParam) => {
    if (strikeParam === undefined) {
      setStrikeValue(strikeValue === 'strike' ? 'non-strike' : 'strike')
    } else {
      setStrikeValue(strikeParam)
    }
  }
  const switchBatterStrike = (strikeParam) => {
    if (strikeParam === undefined) {
      setBatter1((state) => ({
        ...state,
        onStrike: !state.onStrike,
      }))
      setBatter2((state) => ({
        ...state,
        onStrike: !state.onStrike,
      }))
    } else {
      if (strikeParam === 'batter1') {
        setBatter1((state) => ({
          ...state,
          onStrike: true,
        }))
        setBatter2((state) => ({
          ...state,
          onStrike: false,
        }))
      } else if (strikeParam === 'batter2') {
        setBatter1((state) => ({
          ...state,
          onStrike: false,
        }))
        setBatter2((state) => ({
          ...state,
          onStrike: true,
        }))
      }
    }
  }
  const handleRun = (run) => {
    if (isNoBall) {
      setCurrentRunStack((state) => [...state, 'nb' + run])
      console.log('Run Stack', currentRunStack)
      removeNoBallEffect()
    } else {
      setBallCount(ballCount + 1)
      console.log('ballcount', ballCount)
      setCurrentRunStack((state) => [...state, run])
      console.log('Run Stack', currentRunStack)
    }
    setTotalRuns(totalRuns + run)
    console.log('Total Runs', totalRuns)
    setRunsByOver(runsByOver + run)
    console.log('Runs By over', runsByOver)
    if (inningNo === 2) {
      if (!isNoBall) {
        setRemainingBalls(remainingBalls - 1)
        console.log('Remaining Balls', remainingBalls)
      }
      setRemainingRuns(remainingRuns - run)
      console.log('Remaining Runs', remainingRuns)
    }



    if (ballCount === 5) {
      if (isNoBall) {
        if (run % 2 !== 0) {
          changeStrikeRadio()
        }
      } else {
        setTotalOvers(overCount + 1)
        console.log('Total Overs', totalOvers)
        const arr = [...currentRunStack]
        arr.push(run)
        overCompleted(runsByOver + run, arr)
        console.log('Over Completed', overCompleted)
        if (run % 2 === 0) {
          changeStrikeRadio()
        }
      }
    } else {
      if (!isNoBall) {
        setTotalOvers(Math.round((totalOvers + 0.1) * 10) / 10)
        console.log('Total Overs', totalOvers)
      }
      if (run % 2 !== 0) {
        changeStrikeRadio()
      }
    }
    if (batter1.onStrike) {
      setBatter1((state) => {
        const updatedRun = state.run + run
        console.log('Batter1 run', updatedRun)
        const updatedBall = state.ball + 1
        console.log('Batter1 ball', updatedBall)
        const sr = Math.round((updatedRun / updatedBall) * 100 * 100) / 100
        console.log('Batter1 sr', sr)
        let four = state.four
        if (run === 4) {
          four = four + 1
        }
        let six = state.six
        if (run === 6) {
          six = six + 1
        }
        console.log('Batter1 4s', four)
        console.log('Batter1 6s', six)
        return {
          ...state,
          run: updatedRun,
          ball: updatedBall,
          four: four,
          six: six,
          strikeRate: sr,
        }

      })
      if (isNoBall) {
        if (run % 2 !== 0) {
          switchBatterStrike()
        }
      } else {
        if ((ballCount === 5 && run % 2 === 0) || (ballCount !== 5 && run % 2 !== 0)) {
          switchBatterStrike()
        }
      }

      var RUNS = isNoBall ? 'nb' + run : run
      var TEXT = bowler.name + " to " + batter1.name
      var OverBall = (totalOvers + 0.1).toFixed(1)
      setCurrentRunBallByBall((state) => [...state, { TEXT, RUNS, OverBall }])




    } else {
      setBatter2((state) => {
        const updatedRun = state.run + run
        console.log('Batter2 run', updatedRun)
        const updatedBall = state.ball + 1
        console.log('Batter2 ball', updatedBall)
        const sr = Math.round((updatedRun / updatedBall) * 100 * 100) / 100
        console.log('Batter2 sr', sr)
        let four = state.four
        if (run === 4) {
          four = four + 1
        }
        let six = state.six
        if (run === 6) {
          six = six + 1
        }
        console.log('Batter1 4s', four)
        console.log('Batter1 6s', six)
        return {
          ...state,
          run: updatedRun,
          ball: updatedBall,
          four: four,
          six: six,
          strikeRate: sr,
        }
      })
      if ((ballCount === 5 && run % 2 === 0) || (ballCount !== 5 && run % 2 !== 0)) {
        switchBatterStrike()
      }

      var RUNS = isNoBall ? 'nb' + run : run
      var TEXT = bowler.name + " to " + batter2.name
      var OverBall = (totalOvers + 0.1).toFixed(1)
      setCurrentRunBallByBall((state) => [...state, { TEXT, RUNS, OverBall }])
    }


    ///new code for bowler//


    let isMaidenOver = true
    let countWicket = 0
    let countNoBall = 0
    let countWide = 0
    const deliveries = ['1', '2', '3', '4', '6', 'wd']

    let delivery = run.toString()
    // if (deliveries.includes(delivery) || delivery.includes('nb')) {
    //   isMaidenOver = false
    // }
    if (delivery === 'W') {
      countWicket++
    }
    if (delivery.includes('nb')) {
      countNoBall++
    }
    if (delivery.includes('wd')) {
      countWide++
    }

    const existingBowler = currentBowlerData
    const { over, maiden, runs, wicket, noBall, wide } = existingBowler
    if (ballCount < 5 && isNoBall != true)
      existingBowler.over = (+existingBowler.over + 0.1).toFixed(1)
    existingBowler.runs = existingBowler.runs + run
    existingBowler.wicket = wicket + countWicket
    existingBowler.noBall = noBall + countNoBall
    existingBowler.wide = wide + countWide
    existingBowler.economy = existingBowler.runs




    console.log("Current Bowler---" + JSON.stringify(currentBowlerData))
    ///new code for bowler//

    console.log(currentRunBallByBall)


  }
  const handleNoBall = () => {
    if (inningNo === 2) {
      setRemainingRuns(remainingRuns - 1)
    }
    setTotalRuns(totalRuns + 1)
    setRunsByOver(runsByOver + 1)
    setExtras((state) => ({
      ...state,
      total: state.total + 1,
      noBall: state.noBall + 1,
    }))
    addNoBallEffect()
    //new code for current bowler
    const existingBowler = currentBowlerData
    existingBowler.runs = existingBowler.runs + 1
    //new code for current bowler



  }
  const addNoBallEffect = () => {
    const scoreTypesButtons = document.querySelectorAll('.score-types-button')
    for (let i = 0; i < scoreTypesButtons.length; i++) {
      scoreTypesButtons[i].classList.add('score-types-button-noball')
    }
    setNoBall(true)
  }
  const removeNoBallEffect = () => {
    const scoreTypesButtons = document.querySelectorAll('.score-types-button')
    for (let i = 0; i < scoreTypesButtons.length; i++) {
      scoreTypesButtons[i].classList.remove('score-types-button-noball')
    }
    setNoBall(false)
  }
  const handleWide = () => {
    setshowModalWide(false)
    let wideRun = +document.getElementById('wdEx').value
    if (isNoBall) {
      setCurrentRunStack((state) => [...state, 'nb'])
      removeNoBallEffect()
    } else {
      if (inningNo === 2) {
        setRemainingRuns(remainingRuns - (1 + wideRun))
      }
      setCurrentRunStack((state) => [...state, 'wd'+wideRun])
      setTotalRuns(totalRuns + 1 + wideRun)
      setRunsByOver(runsByOver + 1 + wideRun)
      setExtras((state) => ({
        ...state,
        total: state.total + 1 ,
        wide: state.wide + 1 ,
      }))
      //new code for current bowler
      const existingBowler = currentBowlerData
      existingBowler.runs = existingBowler.runs + 1 + wideRun
      //new code for current bowler

      if (batter1.onStrike) {
        if (wideRun % 2 === 0) {
        }
        else {
          changeStrikeRadio()
          switchBatterStrike()
      }
    }
    else if (batter2.onStrike) {
      if (wideRun % 2 === 0) {
      }
      else {
        changeStrikeRadio()
        switchBatterStrike()
      }
    }


    }

    var RUNS = 'wd'
    var TEXT = bowler.name + " to " + batter2.name
    setCurrentRunBallByBall((state) => [...state, { TEXT, RUNS }])

    

  }
  const handleWicket = (isRunOut, playerId) => {
    if(dismissalTypes==='runout')
    {
      isRunOut = true
    }
    
    setRunOutPlayerId('')
    if (ballCount === 5) {
      if (isNoBall) {
        removeNoBallEffect()
        if (isRunOut) {
          setCurrentRunStack((state) => [...state, 'nbW'])
          setWicketCount(wicketCount + 1)
          disableAllScoreButtons()
        } else {
          setCurrentRunStack((state) => [...state, 'nb'])
        }
      } else {
        setTotalOvers(overCount + 1)
        const arr = [...currentRunStack]
        arr.push('W')
        overCompleted(runsByOver, arr)
        setWicketCount(wicketCount + 1)
        disableAllScoreButtons()
        setRemainingBalls(remainingBalls - 1) //7th nov
      }
    } else {
      if (isNoBall) {
        removeNoBallEffect()
        if (isRunOut) {
          setCurrentRunStack((state) => [...state, 'nbW'])
          setWicketCount(wicketCount + 1)
          disableAllScoreButtons()

           //new code
        const existingBowler = currentBowlerData
       // existingBowler.over = (+existingBowler.over + 0.1).toFixed(1)
        existingBowler.wicket = existingBowler.wicket + 1

        } else {
          setCurrentRunStack((state) => [...state, 'nb'])
        }
      } else {
        setBallCount(ballCount + 1)
        setCurrentRunStack((state) => [...state, 'W'])
        setTotalOvers(Math.round((totalOvers + 0.1) * 10) / 10)
        setWicketCount(wicketCount + 1)
        disableAllScoreButtons()
        setRemainingBalls(remainingBalls - 1) //7th nov

        //new code
        const existingBowler = currentBowlerData
        existingBowler.over = (+existingBowler.over + 0.1).toFixed(1)
        existingBowler.wicket = existingBowler.wicket + 1

        let indexData = teamA.findIndex(e=>e.player_name===batterOuts)
        if(indexData>-1)
        teamA[indexData].is_Batting = "3"
        else
        {
          indexData = teamB.findIndex(e=>e.player_name===batterOuts)
          teamB[indexData].is_Batting = "3"
        }
       


      }
    }
    if (isRunOut) {
      if (batter1.name === batterOuts) {
        newBatter1()
        changeStrikeRadio('strike')
        switchBatterStrike('batter1')
        setstrikerFlag(true)
        setshowModalSelectBatter(true)
      } else {
        newBatter2()
        changeStrikeRadio('non-strike')
        switchBatterStrike('batter2')
        setstrikerFlag(true)
        setshowModalSelectNS(true)
      }
    } else {
      if (!isNoBall) {
        if (batter1.onStrike) {
          newBatter1()
          setstrikerFlag(true)
          setshowModalSelectBatter(true)
        } else {
          newBatter2()
          setstrikerFlag(true)
          setshowModalSelectNS(true)
        }
      }
    }
    if (isNoBall) {
      if (isRunOut && wicketCount + 1 === 10) {
        const endInningButton = document.getElementById('end-inning')
        endInningButton.disabled = false
        const bowlerNameElement = document.querySelector('.react-autosuggest__input')
        bowlerNameElement.disabled = true
        const batter1NameElement = document.getElementById('batter1Name')
        batter1NameElement.disabled = true
        const batter2NameElement = document.getElementById('batter2Name')
        batter2NameElement.disabled = true
        setInputBowler('')
      }
    } else {
      if (wicketCount + 1 === 10) {
        const endInningButton = document.getElementById('end-inning')
        endInningButton.disabled = false
        const bowlerNameElement = document.querySelector('.react-autosuggest__input')
        bowlerNameElement.disabled = true
        const batter1NameElement = document.getElementById('batter1Name')
        batter1NameElement.disabled = true
        const batter2NameElement = document.getElementById('batter2Name')
        batter2NameElement.disabled = true
        setInputBowler('')
      }
    }

    

  }
  const handleCloseModal = () => {
    if (outType !== '') {
      if (outType === 'Run Out') {
        if (runOutPlayerId !== '') {
          handleWicket(true, runOutPlayerId)
        }
      } else {
        handleWicket(false, '')
      }
    }
    setModalOpen(false)
    setOutType('')
    setRunOutPlayerId('')
  }
  const handleOutTypeChange = (e) => {
    const outTypeValue = e.target.value
    setOutType(outTypeValue)
    if (outTypeValue === 'Run Out') {
      const runOutPlayerElement = document.getElementById('run-out-player')
      runOutPlayerElement.classList.remove('hide')
      const runOutPlayerErrorElement = document.getElementById('run-out-player-error')
      runOutPlayerErrorElement.classList.remove('hide')
    }
  }
  const handleRunOutPlayerChange = (e) => {
    const playerId = e.target.value
    const runOutPlayerErrorElement = document.getElementById('run-out-player-error')
    runOutPlayerErrorElement.classList.add('hide')
    setRunOutPlayerId(playerId)
  }
  const endMatch = () => {
  handleEndInning()
  
  }
  const disableAllScoreButtons = () => {
    const scoreTypesButtons = document.querySelectorAll('.score-types-button')
    for (let i = 0; i < scoreTypesButtons.length; i++) {
      scoreTypesButtons[i].disabled = true
    }
  }
  const enableAllScoreButtons = () => {
    const scoreTypesButtons = document.querySelectorAll('.score-types-button')
    for (let i = 0; i < scoreTypesButtons.length; i++) {
      scoreTypesButtons[i].disabled = false
    }
  }

  if (batter1.name !== undefined && batter2.name !== undefined && inputBowler !== '') {
    enableAllScoreButtons()
  }
  let rrr = (remainingRuns / (remainingBalls / 6)).toFixed(2)
  rrr = isFinite(rrr) ? rrr : 0
  const overs = overCount + ballCount / 6
  let crr = (totalRuns / overs).toFixed(2)
  crr = isFinite(crr) ? crr : 0
  const inning1 = match.inning1
  const inning2 = match.inning2
  let scoringTeam = batting === team1 ? team1 : team2
  let chessingTeam = scoringTeam === team1 ? team2 : team1
  let winningMessage = `${inningNo === 1 ? scoring_team : chessing_team} needs ${remainingRuns} ${remainingRuns <= 1 ? 'run' : 'runs'
    } in ${remainingBalls} ${remainingBalls <= 1 ? 'ball' : 'balls'} to win`
  if (inningNo === 2) {
    var target = inning1.runs + 1
    if (wicketCount < 10 && overCount <= maxOver && totalRuns >= target) {
      winningMessage = `${chessing_team} won by ${10 - wicketCount} wickets`
      endMatch()
    
    }
    if ((wicketCount >= 10 || overCount >= maxOver) && totalRuns < target - 1) {
      winningMessage = `${scoring_team} won by ${target - totalRuns - 1} runs`
      endMatch()
    
    }
    if (wicketCount < 10 && overCount === maxOver && totalRuns === target - 1) {
      winningMessage = 'Match Tied'
      endMatch()
    
    }
  }

  //logic end


  const showEditTeamSelect = (id) => {
    setshowModalTeamSelect(true)
  }

  const teamtab1 = () => {
    document.getElementById("team1").classList.add("active");
    document.getElementById("team2").classList.remove("active");

  }

  const teamtab2 = () => {
    document.getElementById("team1").classList.remove("active");
    document.getElementById("team2").classList.add("active");

  }

  const showEditMatchSetting = (id) => {
    setshowModalTeamSelect(false)
    setshowModalMatchSetting(true)

  }

  const showEditMatchSetup = (id) => {
    setshowModalMatchSetup(true)
    setshowModalMatchSetting(false)

  }

  const showEditEditBall = (id) => {
    setshowModalEditBall(true)


  }

  const showEditSelectBatter = (id) => {
    setshowModalSelectBatter(true)
    setshowModalMatchSetup(false)





  }

  const showEditSelectNS = (id) => {
    setshowModalSelectBatter(false)
    if(strikerFlag===false)
    setshowModalSelectNS(true)



    inningNo === 1 ?

      scoring_team === team_1 ? teamA.forEach(element => {
        if (element.player_name === STRIKER)
          element.is_Batting = '1'
      }) :
        teamB.forEach(element => {
          if (element.player_name === STRIKER)
            element.is_Batting = '1'
        })

      :
      chessing_team === team_1 ? teamA.forEach(element => {
        if (element.player_name === STRIKER)
          element.is_Batting = '1'
      }) :
        teamB.forEach(element => {
          if (element.player_name === STRIKER)
            element.is_Batting = '1'
        })




    handleBatter1Blur(STRIKER)
    setstrikerFlag(false)




  }

  const showEditSelectBowler = (id) => {
    if(strikerFlag===false)
    setshowModalSelectBowler(true)
    setshowModalSelectNS(false)

    inningNo === 1 ?

      scoring_team === team_1 ? teamA.forEach(element => {
        if (element.player_name === NSTRIKER)
          element.is_Batting = '1'
      }) :
        teamB.forEach(element => {
          if (element.player_name === NSTRIKER)
            element.is_Batting = '1'
        })
      :
      chessing_team === team_1 ? teamA.forEach(element => {
        if (element.player_name === NSTRIKER)
          element.is_Batting = '1'
      }) :
        teamB.forEach(element => {
          if (element.player_name === NSTRIKER)
            element.is_Batting = '1'
        })


    handleBatter2Blur(NSTRIKER)
    setstrikerFlag(false)

  }

  const showEditChangeBatter = (id) => {
    setshowModalChangeBatter(true)


  }
  const showEditChangeBowler = (id) => {
    setshowModalChangeBowler(true)


  }

  const showEditNewBatter = (id) => {
    setshowModalNewBatter(true)


  }
  const showEditNewBowler = (id) => {
    setshowModalNewBowler(true)


  }

  const showEditWicket = (id) => {
    setshowModalWicket(true)


  }

  const onTossWon = (event) => {
    setTossWon(event.target.value)

  }

  const onElectedTo = (event) => {
    setElectedTo(event.target.value)

    batting = event.target.value === team_1 ? team_1 : team_2
    scoringTeam = batting === team1 ? team1 : team2
    chessingTeam = scoringTeam === team1 ? team2 : team1

    setScoring_Team(scoringTeam)
    setChessing_Team(chessingTeam)
  }

  const selectSriker = (event) => {

    setSTRIKER(event.target.value)

  }

  const selectNSriker = (event) => {

    setNSTRIKER(event.target.value)

  }

  const selectBowler = (event) => {

    let bowler_data = (event.target.value).split('$')


    setCBOWLER(bowler_data[0])
    setCBOWLER_ID(bowler_data[1])

  }

  const startMatch = (event) => {
    handleBowlerBlur()
    setshowModalSelectBowler(false)

  }

  const showEditEndInnings = (id) => {
    setshowModalEndInnings(true)
    setshowModalMatchSetup(false)

  }

  const batterOut = (event) => {
    setbatterOuts(event.target.value)
  }

  const dismissalType = (event) => {
    setdismissalTypes(event.target.value)
  }
  const bowlerWicketTaker = (event) => {
    setbowlerWicketTakers(event.target.value)
  }
  const fielderAssist = (event) => {
    setfielderAssists(event.target.value)
  }
  

  const addPlayersT1 = (item)=>{
    var player_id = item.player_id
    var player_name = item.player_name
    var is_Batting = '0'

    let index = teamA.findIndex(e=>e.player_id===player_id)
    if(index===-1)
    {
      teamA.push({player_id,player_name,is_Batting})
      Alert('00', 'Player added to playing 11')
    }
  
    else
    Alert('01', 'Player already added to playing 11')
console.log(teamA)

  }

  const addPlayersT2 = (item)=>{
    var player_id = item.player_id
    var player_name = item.player_name
    var is_Batting = '0'

    let index = teamB.findIndex(e=>e.player_id===player_id)
    if(index===-1)
    {
      teamB.push({player_id,player_name,is_Batting})
      Alert('00', 'Player added to playing 11')
    }
  
    else
    Alert('01', 'Player already added to playing 11')
console.log(teamB)

  }

  const wicketDissmissal = ()=>{
    setshowModalWicket(false);handleWicket(false,'')
  }

  const end2ndInnings = ()=>{
    setshowModalScorecard(false); setshowModalSelectBatter(true) 
  }

  const finalMatchEnd = ()=>{
    setshowModalScorecard(false) 
  }

  const showEditWide = () => {
    setshowModalWide(true)


  }



  useEffect(() => {


    setTEAMA( [
      {
        "player_id": 26,
        "player_name": "Rohit Sharma",
        "team_id": 7,
        "is_Batting": '0'
      },
      {
        "player_id": 27,
        "player_name": "Ishan Kishan",
        "team_id": 7,
        "is_Batting": '0'
      },
      {
        "player_id": 28,
        "player_name": "Suryakumar Yadav",
        "team_id": 7,
        "is_Batting": '0'
      },
      {
        "player_id": 29,
        "player_name": "Harbhajan Singh",
        "team_id": 7,
        "is_Batting": '0'
      },{
        "player_id": 30,
        "player_name": "Zaheer Khan",
        "team_id": 7,
        "is_Batting": '0'
      },{
        "player_id": 31,
        "player_name": "Malinga",
        "team_id": 7,
        "is_Batting": '0'
      }
    ])

    setTEAMB( [
      {
        "player_id": 239,
        "player_name": "Ruturaj Gaikwad",
        "team_id": 8,
        "is_Batting": '0'
      },
      {
        "player_id": 330,
        "player_name": "M S Dhoni",
        "team_id": 8,
        "is_Batting": '0'
      },
      {
        "player_id": 312,
        "player_name": "Ravendra Jadega",
        "team_id": 8,
        "is_Batting": '0'
      },
      {
        "player_id": 328,
        "player_name": "DJ Bravo",
        "team_id": 8,
        "is_Batting": '0'
      },
      {
        "player_id": 388,
        "player_name": "Watson",
        "team_id": 8,
        "is_Batting": '0'
      },
      {
        "player_id": 458,
        "player_name": "Kedar Jadhav",
        "team_id": 8,
        "is_Batting": '0'
      }
    ])

    //setT1(data1)
    //setT2(data2)

    setshowModalTeamSelect(true)
    // handleBatter1Blur('Vikrant')
    // handleBatter2Blur('Saurabh')
    //handleBowlerBlur('Santosh')





  }, [])

  return (
    <>
         <ToastContainer />
      <Row>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary rounded-1 mt-4 scorer" >
          <div class="container-fluid">
            <a class="navbar-brand" style={{ color: '#669dc1' }} href="#">Save & Exit</a>
            <a class="navbar-brand" style={{ fontWeight: 'bold' }} href="#">SCORESHEET</a>
            <ul class="navbar-nav  ">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                      d="M4.8807 14.6713C4.74972 14.2784 4.32498 14.066 3.93202 14.197C3.53906 14.328 3.32669 14.7527 3.45768 15.1457L4.8807 14.6713ZM20.8807 15.1457C21.0117 14.7527 20.7993 14.328 20.4064 14.197C20.0134 14.066 19.5887 14.2784 19.4577 14.6713L20.8807 15.1457ZM4.16919 14.9085C3.45768 15.1457 3.45779 15.146 3.45791 15.1464C3.45796 15.1465 3.45809 15.1469 3.45819 15.1472C3.45839 15.1478 3.45862 15.1485 3.45889 15.1493C3.45942 15.1509 3.46007 15.1528 3.46086 15.1551C3.46242 15.1597 3.4645 15.1657 3.4671 15.1731C3.47229 15.188 3.47955 15.2084 3.48896 15.2341C3.50776 15.2854 3.53515 15.3576 3.57164 15.4477C3.64455 15.6279 3.75414 15.8805 3.90462 16.1814C4.20474 16.7817 4.67217 17.5836 5.34302 18.3886C6.68936 20.0043 8.88337 21.6585 12.1692 21.6585V20.1585C9.45501 20.1585 7.64902 18.8128 6.49536 17.4284C5.91621 16.7334 5.50864 16.0354 5.24626 15.5106C5.11549 15.2491 5.02195 15.0329 4.96206 14.8849C4.93214 14.811 4.91069 14.7543 4.89727 14.7177C4.89056 14.6994 4.88587 14.6861 4.88312 14.6783C4.88175 14.6744 4.88087 14.6718 4.88047 14.6706C4.88027 14.67 4.88019 14.6698 4.88023 14.6699C4.88025 14.67 4.88029 14.6701 4.88037 14.6704C4.88041 14.6705 4.8805 14.6707 4.88052 14.6708C4.88061 14.671 4.8807 14.6713 4.16919 14.9085ZM12.1692 21.6585C15.455 21.6585 17.649 20.0043 18.9954 18.3886C19.6662 17.5836 20.1336 16.7817 20.4338 16.1814C20.5842 15.8805 20.6938 15.6279 20.7667 15.4477C20.8032 15.3576 20.8306 15.2854 20.8494 15.2341C20.8588 15.2084 20.8661 15.188 20.8713 15.1731C20.8739 15.1657 20.876 15.1597 20.8775 15.1551C20.8783 15.1528 20.879 15.1509 20.8795 15.1493C20.8798 15.1485 20.88 15.1478 20.8802 15.1472C20.8803 15.1469 20.8804 15.1465 20.8805 15.1464C20.8806 15.146 20.8807 15.1457 20.1692 14.9085C19.4577 14.6713 19.4578 14.671 19.4579 14.6708C19.4579 14.6707 19.458 14.6705 19.458 14.6704C19.4581 14.6701 19.4581 14.67 19.4582 14.6699C19.4582 14.6698 19.4581 14.67 19.4579 14.6706C19.4575 14.6718 19.4566 14.6744 19.4553 14.6783C19.4525 14.6861 19.4478 14.6994 19.4411 14.7177C19.4277 14.7543 19.4062 14.811 19.3763 14.8849C19.3164 15.0329 19.2229 15.2491 19.0921 15.5106C18.8297 16.0354 18.4222 16.7334 17.843 17.4284C16.6894 18.8128 14.8834 20.1585 12.1692 20.1585V21.6585Z"
                      fill="currentColor"></path>
                    <path d="M21.5182 19.2273C21.4293 19.2235 21.3426 19.1961 21.2671 19.1466L16.3545 15.8925C16.2196 15.8027 16.1413 15.6539 16.1479 15.497C16.1545 15.3401 16.2452 15.1984 16.3872 15.1203L21.557 12.2927C21.7075 12.2108 21.8932 12.2131 22.0416 12.3004C22.1906 12.3871 22.2782 12.5437 22.2712 12.7097L22.0139 18.7914C22.0069 18.9574 21.9064 19.106 21.7506 19.1798C21.6772 19.2151 21.597 19.2306 21.5182 19.2273" fill="currentColor"></path>
                    <path
                      d="M20.0742 10.0265C20.1886 10.4246 20.6041 10.6546 21.0022 10.5401C21.4003 10.4257 21.6302 10.0102 21.5158 9.61214L20.0742 10.0265ZM4.10803 8.88317C3.96071 9.27031 4.15513 9.70356 4.54226 9.85087C4.92939 9.99818 5.36265 9.80377 5.50996 9.41664L4.10803 8.88317ZM20.795 9.81934C21.5158 9.61214 21.5157 9.6118 21.5156 9.61144C21.5155 9.61129 21.5154 9.6109 21.5153 9.61059C21.5152 9.60998 21.515 9.60928 21.5147 9.60848C21.5143 9.60689 21.5137 9.60493 21.513 9.6026C21.5116 9.59795 21.5098 9.59184 21.5075 9.58431C21.503 9.56925 21.4966 9.54853 21.4882 9.52251C21.4716 9.47048 21.4473 9.39719 21.4146 9.3056C21.3493 9.12256 21.2503 8.8656 21.1126 8.55861C20.8378 7.94634 20.4044 7.12552 19.7678 6.29313C18.4902 4.62261 16.3673 2.87801 13.0844 2.74053L13.0216 4.23922C15.7334 4.35278 17.4816 5.77291 18.5763 7.20436C19.1258 7.92295 19.5038 8.63743 19.744 9.17271C19.8638 9.43949 19.9482 9.65937 20.0018 9.80972C20.0286 9.88483 20.0477 9.94238 20.0596 9.97951C20.0655 9.99808 20.0696 10.0115 20.072 10.0195C20.0732 10.0235 20.074 10.0261 20.0744 10.0273C20.0746 10.0278 20.0746 10.0281 20.0746 10.028C20.0746 10.0279 20.0745 10.0278 20.0745 10.0275C20.0744 10.0274 20.0744 10.0272 20.0743 10.0271C20.0743 10.0268 20.0742 10.0265 20.795 9.81934ZM13.0844 2.74053C9.80146 2.60306 7.54016 4.16407 6.12741 5.72193C5.42345 6.49818 4.92288 7.27989 4.59791 7.86704C4.43497 8.16144 4.31491 8.40923 4.23452 8.58617C4.1943 8.67471 4.16391 8.7457 4.14298 8.79616C4.13251 8.82139 4.1244 8.84151 4.11859 8.85613C4.11568 8.86344 4.11336 8.86938 4.1116 8.8739C4.11072 8.87616 4.10998 8.87807 4.10939 8.87962C4.10909 8.88039 4.10883 8.88108 4.1086 8.88167C4.10849 8.88196 4.10834 8.88234 4.10829 8.88249C4.10815 8.88284 4.10803 8.88317 4.80899 9.14991C5.50996 9.41664 5.50985 9.41692 5.50975 9.41719C5.50973 9.41725 5.50964 9.41749 5.50959 9.4176C5.5095 9.41784 5.50945 9.41798 5.50942 9.41804C5.50938 9.41816 5.50947 9.41792 5.50969 9.41734C5.51014 9.41619 5.51113 9.41365 5.51267 9.40979C5.51574 9.40206 5.52099 9.38901 5.52846 9.37101C5.5434 9.335 5.56719 9.27924 5.60018 9.20664C5.66621 9.0613 5.76871 8.84925 5.91031 8.59341C6.19442 8.08008 6.63084 7.39971 7.23855 6.72958C8.44912 5.39466 10.3098 4.12566 13.0216 4.23922L13.0844 2.74053Z"
                      fill="currentColor"></path>
                    <path d="M8.78337 9.33604C8.72981 9.40713 8.65805 9.46292 8.57443 9.49703L3.1072 11.6951C2.95672 11.7552 2.78966 11.7352 2.66427 11.6407C2.53887 11.5462 2.47359 11.3912 2.48993 11.2299L3.09576 5.36863C3.11367 5.19823 3.22102 5.04666 3.37711 4.97402C3.5331 4.9005 3.71173 4.91728 3.84442 5.01726L8.70581 8.68052C8.8385 8.78051 8.90387 8.94759 8.8762 9.1178C8.86358 9.19825 8.83082 9.27308 8.78337 9.33604" fill="currentColor"></path>
                  </svg>
                </a>
              </li>
              <li class="nav-item ">
                <a class="nav-link active" href="#">
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.54 2H7.92C9.33 2 10.46 3.15 10.46 4.561V7.97C10.46 9.39 9.33 10.53 7.92 10.53H4.54C3.14 10.53 2 9.39 2 7.97V4.561C2 3.15 3.14 2 4.54 2ZM4.54 13.4697H7.92C9.33 13.4697 10.46 14.6107 10.46 16.0307V19.4397C10.46 20.8497 9.33 21.9997 7.92 21.9997H4.54C3.14 21.9997 2 20.8497 2 19.4397V16.0307C2 14.6107 3.14 13.4697 4.54 13.4697ZM19.4601 2H16.0801C14.6701 2 13.5401 3.15 13.5401 4.561V7.97C13.5401 9.39 14.6701 10.53 16.0801 10.53H19.4601C20.8601 10.53 22.0001 9.39 22.0001 7.97V4.561C22.0001 3.15 20.8601 2 19.4601 2ZM16.0801 13.4697H19.4601C20.8601 13.4697 22.0001 14.6107 22.0001 16.0307V19.4397C22.0001 20.8497 20.8601 21.9997 19.4601 21.9997H16.0801C14.6701 21.9997 13.5401 20.8497 13.5401 19.4397V16.0307C13.5401 14.6107 14.6701 13.4697 16.0801 13.4697Z" fill="currentColor" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {inningNo === 2 ?
          <nav class="navbar navbar-expand-lg navbar-dark bg-warning rounded-1 scorer" >
            <div class="container-fluid">
              <a class="navbar-brand" href="#">Target : {target}</a>
              <a class="navbar-brand" href="#">{winningMessage}</a>
              <a class="navbar-brand" href="#">RRR : {isNaN(rrr) ? 0 : rrr}</a>
            </div>
          </nav>
          :
          ''

        }

      </Row>
      <Row>
        <Col md="8" className="mb-3" style={{ padding: '0px' }}>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              <a class="navbar-brand" href="#" style={{ fontWeight: '700', fontSize: '2.5vh' }}>
                {inningNo === 1 ? '1ST' : '2ND'} INNINGS
              </a>
              <a class="navbar-brand" href="#" style={{ fontWeight: '700', fontSize: '2.5vh', float: 'right' }}>
                CRR : {isNaN(crr) ? 0 : crr}
              </a>


            </div>
          </nav>

          <div style={{ paddingTop: '2vh', paddingLeft: '2vh' }}>
            <button class="btn btn-icon btn-success" >
              <span class="btn-inner" style={{ fontSize: '13px' }}>
                {scoring_team.split(" ").map((n) => n[0]).join('')}
              </span>
            </button>
            <span style={{ marginLeft: '2vh', fontWeight: '600', fontSize: '2vh' }}>{scoring_team} </span>
            {inningNo === 1 ? <h5 style={{ float: 'right', marginRight: '2rem' }}>  {totalRuns}/{wicketCount} ({totalOvers})</h5> : <h5 style={{ float: 'right', marginRight: '2rem' }}>  {match.inning1.runs}/{match.inning1.wickets} ({match.inning1.overs})</h5>}

          </div>

          <div style={{ paddingTop: '2vh', paddingLeft: '2vh' }}>
            <button class="btn btn-icon btn-warning" >
              <span class="btn-inner" style={{ fontSize: '13px' }}>
                {chessing_team.split(" ").map((n) => n[0]).join('')}
              </span>
            </button>
            <span style={{ marginLeft: '2vh', fontWeight: '600', fontSize: '2vh' }}>{chessing_team} </span>
            {inningNo === 2 ? <h5 style={{ float: 'right', marginRight: '2rem' }}>{totalRuns}/{wicketCount} ({totalOvers})</h5> : ""}
          </div>



          <hr class="hr-horizontal" style={{ marginTop: '5vh' }}></hr>

          {/* <Row style={{marginTop:'3vh'}}>
                        <Col md="6" className="mb-3">
                           <h6  style={{fontWeight:'bold',marginLeft:'2vh'}}>BATTERS</h6>
                        </Col>
                        <Col md="6" className="mb-3" style={{fontSize:'12px'}}>
                            <Row>
                            <Col md="2" className="mb-3">R</Col>
                            <Col md="2" className="mb-3">B</Col>
                            <Col md="2" className="mb-3">4s</Col>
                            <Col md="2" className="mb-3">6s</Col>
                            <Col md="2" className="mb-3">SR</Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                    <Col md="6" className="mb-3">
                    <button class="btn btn-primary btn-sm rounded-pill" style={{marginLeft:'2vh',width:'90%'}}>Vikrant Rane</button>
                        </Col>
                        <Col md="6" className="mb-3">
                            <Row>
                            <Col md="2" className="mb-3">0</Col>
                            <Col md="2" className="mb-3">0</Col>
                            <Col md="2" className="mb-3">0</Col>
                            <Col md="2" className="mb-3">0</Col>
                            <Col md="2" className="mb-3">0.0</Col>
                            </Row>
                        </Col>
                    </Row> */}


          <div className="table-responsive">
            <table id="user-list-table" className="table table" role="grid" data-toggle="data-table" style={{ border: 'transparent' }}>
              <thead>
                <tr className="ligth">
                  <th style={{ fontWeight: 'bold', marginLeft: '-1.2vh', fontSize: '2.2vh', padding: '1.5vh' }}>BATTERS</th>
                  <th style={{ fontSize: '1.5vh', padding: '1.5vh' }}>R</th>
                  <th style={{ fontSize: '1.5vh', padding: '1.5vh' }}>B</th>
                  <th style={{ fontSize: '1.5vh', padding: '1.5vh' }}>4s</th>
                  <th style={{ fontSize: '1.5vh', padding: '1.5vh' }}>6s</th>
                  <th style={{ fontSize: '1.5vh', padding: '1.5vh' }}>SR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '0.4vh' }}>
                    {/* <button class={batter1.onStrike ? "btn btn-primary btn-sm rounded-pill" : "btn btn-light btn-sm rounded-pill"} style={{ width: '40vh', textAlign: 'left', fontSize: '2.2vh', marginLeft: '1.2vh' }}>{STRIKER}
                    <span class="btn-inner" style={{ float: 'right' }}>
                      <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">

                        <path d="M15.9393 12.0129H15.9483" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.9301 12.0129H11.9391" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.92128 12.0129H7.93028" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    
                  </button> */}
                  
                  <SplitButton
        key="Primary"
        variant={batter1.onStrike ? 'primary':'light'}
        title={STRIKER}
        defaultValue='Select Striker'
        className="d-inline mx-1 btn-margin mydropdown"
    >
        <Dropdown.Item eventKey="1">Change Strike</Dropdown.Item>
        <Dropdown.Item eventKey="2">Select Striker</Dropdown.Item>
    </SplitButton>
                  </td>
                  <td style={{ padding: '1.5vh' }}>{batter1.run === undefined ? `0` : `${batter1.run}`}</td>
                  <td style={{ padding: '1.5vh' }}>{batter1.ball === undefined ? `0` : `${batter1.ball}`}</td>
                  <td style={{ padding: '1.5vh' }}>{batter1.four === undefined ? 0 : batter1.four}</td>
                  <td style={{ padding: '1.5vh' }}>{batter1.six === undefined ? 0 : batter1.six}</td>
                  <td style={{ padding: '1.5vh' }}>{batter1.strikeRate === undefined ? 0 : batter1.strikeRate}</td>


                </tr>
                <tr>
                  <td style={{ padding: '0.4vh' }}>
                    {/* <button class={batter2.onStrike ? "btn btn-primary btn-sm rounded-pill" : "btn btn-light btn-sm rounded-pill"} style={{ width: '40vh', textAlign: 'left', fontSize: '2.2vh', marginLeft: '1.2vh' }}>{NSTRIKER}
                    <span class="btn-inner" style={{ float: 'right' }}>
                      <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">

                        <path d="M15.9393 12.0129H15.9483" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.9301 12.0129H11.9391" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.92128 12.0129H7.93028" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                  </button> */}
                  <SplitButton
        key="Primary"
        variant={batter2.onStrike ? 'primary':'light'}
        title={NSTRIKER}
        className="d-inline mx-1 btn-margin mydropdown"
    >
        <Dropdown.Item eventKey="1">Change Strike</Dropdown.Item>
        <Dropdown.Item eventKey="2">Select Non-Striker</Dropdown.Item>
    </SplitButton>
                  </td>
                  <td style={{ padding: '1.5vh' }}>{batter2.run === undefined ? `0` : `${batter2.run}`}</td>
                  <td style={{ padding: '1.5vh' }}>{batter2.ball === undefined ? `0` : `${batter2.ball}`}</td>
                  <td style={{ padding: '1.5vh' }}>{batter2.four === undefined ? 0 : batter2.four}</td>
                  <td style={{ padding: '1.5vh' }}>{batter2.six === undefined ? 0 : batter2.six}</td>
                  <td style={{ padding: '1.5vh' }}>{batter2.strikeRate === undefined ? 0 : batter2.strikeRate}</td>

                </tr>
               
              </tbody>
            </table>
          </div>

          <hr class="hr-horizontal"></hr>



          <div className="table-responsive">
            <table id="user-list-table" className="table table" role="grid" data-toggle="data-table" style={{ border: 'transparent' }}>
              <thead>
                <tr className="ligth">
                  <th style={{ fontWeight: 'bold', marginLeft: '-1.2vh', fontSize: '2.2vh', padding: '1.5vh' }}>BOWLERS</th>
                  <th style={{ fontSize: '1.5vh', padding: '1.5vh' }}>0</th>
                  <th style={{ fontSize: '1.5vh', padding: '1.5vh' }}>M</th>
                  <th style={{ fontSize: '1.5vh', padding: '1.5vh' }}>R</th>
                  <th style={{ fontSize: '1.5vh', padding: '1.5vh' }}>W</th>
                  {/* <th style={{ fontSize: '1.5vh', padding: '1.5vh' }}>ECON</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '0.4vh' }}>
                    {/* <button class="btn btn-primary btn-sm rounded-pill" style={{ width: '40vh', textAlign: 'left', fontSize: '2.2vh', marginLeft: '1.2vh' }}>{CBOWLER}
                    <span class="btn-inner" style={{ float: 'right' }}>
                      <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">

                        <path d="M15.9393 12.0129H15.9483" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.9301 12.0129H11.9391" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.92128 12.0129H7.93028" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                  </button> */}
                    <SplitButton
                      variant='primary'
                      title={CBOWLER}
                      className="d-inline mx-1 btn-margin mydropdown"
                    >
                      <Dropdown.Item eventKey="1">Select Bowler</Dropdown.Item>

                    </SplitButton>
                  </td>
                  <td style={{ padding: '1.5vh' }}>{currentBowlerData.over}</td>
                  <td style={{ padding: '1.5vh' }}>{currentBowlerData.maiden}</td>
                  <td style={{ padding: '1.5vh' }}>{currentBowlerData.runs}</td>
                  <td style={{ padding: '1.5vh' }}>{currentBowlerData.wicket}</td>
                  {/* <td style={{ padding: '1.5vh' }}>{currentBowlerData.economy}</td> */}

                </tr>
                <tr>
                  <td style={{ padding: '0.4vh', }}>
                    <span style={{ fontSize: '1.4vh', float: 'left', marginTop: '0.7vh', marginLeft: '2vh' }}>Extras</span>
                    <span style={{ float: 'left', marginLeft: '3vh', fontSize: '2vh' }}>nb {hasMatchEnded ? inning2.extra.noBall : extras.noBall}, wd {hasMatchEnded ? inning2.extra.wide : extras.wide}, b {hasMatchEnded ? inning2.extra.total : extras.total},</span>
                    {/* <span style={{ fontSize: '1.4vh', float: 'right', marginTop: '0.7vh', marginRight: '5vh' }}>Patnership</span> */}
                  </td>
                  {/* <td style={{ padding: '1.5vh' }}>0</td>
                  <td style={{ padding: '1.5vh' }}>0</td>
                  <td style={{ padding: '1.5vh' }}>0</td>
                  <td style={{ padding: '1.5vh' }}>0</td>
                  <td style={{ padding: '1.5vh' }}>0.00</td> */}

                </tr>


              </tbody>
            </table>
          </div>

          <hr class="hr-horizontal" style={{ marginBottom: '3vh' }}></hr>

          <button class="btn btn-light btn-sm rounded-pill" style={{ fontSize: '4vh', marginLeft: '1.2vh', height: '8vh', width: '8vh', fontWeight: 'bold', marginRight: '2vh', marginBottom: '2vh' }}><div style={{ marginTop: '-2vh' }} onClick={() => handleRun(0)}>.</div></button>
          <button class="btn btn-light btn-sm rounded-pill" style={{ fontSize: '2.2vh', marginLeft: '1.2vh', height: '8vh', width: '8vh', marginRight: '2vh', marginBottom: '2vh' }} onClick={() => handleRun(1)}>1</button>
          <button class="btn btn-light btn-sm rounded-pill" style={{ fontSize: '2.2vh', marginLeft: '1.2vh', height: '8vh', width: '8vh', marginRight: '2vh', marginBottom: '2vh' }} onClick={() => handleRun(2)}>2</button>
          <button class="btn btn-light btn-sm rounded-pill" style={{ fontSize: '2.2vh', marginLeft: '1.2vh', height: '8vh', width: '8vh', marginRight: '2vh', marginBottom: '2vh' }} onClick={() => handleRun(3)}>3</button>
          <button class="btn btn-light btn-sm rounded-pill" style={{ fontSize: '2.2vh', marginLeft: '1.2vh', height: '8vh', width: '8vh', marginRight: '2vh', marginBottom: '2vh' }} onClick={() => handleRun(4)}>4</button>
          <button class="btn btn-light btn-sm rounded-pill" style={{ fontSize: '2.2vh', marginLeft: '1.2vh', height: '8vh', width: '8vh', marginRight: '2vh', marginBottom: '2vh' }} onClick={() => handleRun(6)}>6</button>
          {/*<button class="btn btn-light btn-sm rounded-pill" style={{ fontSize: '2.2vh', marginLeft: '1.2vh', height: '8vh', width: '8vh', marginRight: '2vh', marginBottom: '2vh' }}>5+</button>*/}
          

          <button class="btn btn-dark btn-sm rounded-pill" style={{ fontSize: '1.3vh', marginLeft: '1.2vh', height: '8vh', width: '8vh', fontWeight: 'bold', marginRight: '2vh', marginBottom: '2vh' }} onClick={()=>showEditWide()}>WIDE</button>
          <button class="btn btn-dark btn-sm rounded-pill" style={{ fontSize: '1.3vh', marginLeft: '1.2vh', height: '8vh', width: '8vh', marginRight: '2vh', marginBottom: '2vh', fontWeight: 'bold' }} onClick={()=>handleNoBall()}>NO BALL</button>
          {/*<button class="btn btn-dark btn-sm rounded-pill" style={{ fontSize: '1.3vh', marginLeft: '1.2vh', height: '8vh', width: '8vh', marginRight: '2vh', marginBottom: '2vh', fontWeight: 'bold' }}>BYE</button>
          <button class="btn btn-dark btn-sm rounded-pill" style={{ fontSize: '1.3vh', marginLeft: '1.2vh', height: '8vh', width: '8vh', marginRight: '2vh', marginBottom: '2vh', fontWeight: 'bold' }}>LEG BYE</button>*/}
          <button class="btn btn-danger btn-sm rounded-pill" style={{ fontSize: '1.3vh', padding: '1.2vh', marginLeft: '1.2vh', height: '8vh', width: '8vh', marginRight: '2vh', marginBottom: '2vh', fontWeight: 'bold' }} onClick={()=>showEditWicket()}>WICKET</button>
          <button class="btn btn-warning btn-sm rounded-pill" style={{ fontSize: '1.3vh', marginLeft: '1.2vh', height: '8vh', width: '8vh', marginRight: '2vh', marginBottom: '2vh', fontWeight: 'bold' }}>END OVER</button>
          <button class="btn btn-danger btn-sm rounded-pill" style={{ fontSize: '1.3vh', marginLeft: '1.2vh', height: '8vh', width: '19vh', marginRight: '2vh', marginBottom: '2vh', fontWeight: 'bold' }}>END INNINGS</button>
          <button class="btn btn-success btn-sm rounded-pill" style={{ fontSize: '1.3vh', marginLeft: '1.2vh', height: '8vh', width: '19vh', marginRight: '2vh', marginBottom: '2vh', fontWeight: 'bold' }}>MATCH ACTION</button>
          <button class="btn btn-primary btn-sm rounded-pill" style={{ fontSize: '2.2vh', marginLeft: '1.2vh', height: '8vh', width: '8vh', marginRight: '2vh', marginBottom: '2vh' }} onClick={()=>undoDelivery()}>
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M5.89155 8.94037C5.89155 8.94037 9.06324 4.5 13.8208 4.5C15.9237 4.5 17.9406 5.3354 19.4276 6.82242C20.9146 8.30943 21.75 10.3263 21.75 12.4292C21.75 14.5322 20.9146 16.549 19.4276 18.036C17.9406 19.5231 15.9237 20.3585 13.8208 20.3585C11.0646 20.3585 8.63701 18.851 7.21609 16.9429" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M4.01239 12.7139C4.09736 12.7198 4.18269 12.7029 4.25979 12.6639L9.27776 10.0921C9.41563 10.0211 9.50597 9.88782 9.51635 9.73793C9.52673 9.58804 9.45563 9.44359 9.32886 9.35425L4.71338 6.11519C4.57901 6.02124 4.40214 6.00373 4.25173 6.07095C4.10075 6.13755 4.00082 6.27715 3.98984 6.43576L3.58736 12.2466C3.57637 12.4053 3.6561 12.5573 3.79645 12.6441C3.8625 12.6854 3.93712 12.7087 4.01239 12.7139" fill="currentColor"></path>
            </svg>
          </button>




        </Col>
        <Col md="4" className="mb-3" style={{ padding: '0px', borderLeft: '2px solid black' }}>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              <a class="navbar-brand" href="#" style={{ fontWeight: '700', fontSize: '2.5vh' }}>
                BALL-BY-BALL
              </a>


            </div>
          </nav>

          <div className="table-responsive" style={{ height: '80vh' }}>

            {recentOvers.map((recentOver, i) => (
              <div class="card" style={{ marginLeft: '2vh', marginRight: '2vh', marginBottom: '0vh', marginTop: '2vh' }}>
                <div class="card-header d-flex align-items-center justify-content-between">
                  <div class="header-title">
                    <h6 class="card-title">Over {recentOver.overNo}</h6>
                  </div>
                  <span>{recentOver.runs} Runs</span>
                </div>
                <div class="card-body" style={{ padding: '0.5rem 1rem', overflow: 'auto', whiteSpace: 'nowrap' }}>


                  {recentOver.stack.map((run, index) => {

                    if (run === 0 || run === 1 || run === 2 || run === 3) {
                      return (<button class='btn btn-light btn-sm rounded-pill' style={{ height: '6vh', width: '6vh', marginLeft: '1vh', marginTop: '1vh' }}><div >{run}</div></button>)
                    }
                    else if (run === 6 || run === 4) {
                      return (<button class='btn btn-primary btn-sm rounded-pill' style={{ height: '6vh', width: '6vh', marginLeft: '1vh', marginTop: '1vh' }}><div >{run}</div></button>)
                    }
                    else if (run === 'W') {
                      return (<button class='btn btn-danger btn-sm rounded-pill' style={{ height: '6vh', width: '6vh', marginLeft: '1vh', marginTop: '1vh' }}><div style={{ marginLeft: '-0.3vh' }}>{run}</div></button>)
                    }
                    else if (run.includes('wd')) {
                      return (<button class='btn btn-dark btn-sm rounded-pill' style={{ height: '6vh', width: '6vh', marginLeft: '1vh', marginTop: '1vh' }}><div style={{ marginLeft: '-0.6vh' }}>{run}</div></button>)
                    }
                    else if (run.includes('nb')) {
                      return (<button class='btn btn-dark btn-sm rounded-pill' style={{ height: '6vh', width: '6vh', marginLeft: '1vh', marginTop: '1vh' }}><div style={{ marginLeft: '-0.9vh' }}>{run}</div></button>)
                    }
                    // <button class='btn btn-light btn-sm rounded-pill' style={{ height: '6vh', width: '6vh',marginLeft:'1vh',marginTop:'1vh' }}><div >{run}</div></button> 

                    // run==='0' || run === '1' || run ==='2' ? <button class='btn btn-light btn-sm rounded-pill' style={{ fontSize: '2.5vh', height: '6vh', width: '6vh',marginLeft:'1vh',marginTop:'1vh' }}><div >{run}</div></button> : '',
                    //run==='wd' ? <button class='btn btn-dark btn-sm rounded-pill' style={{ fontSize: '2.5vh', height: '6vh', width: '6vh',marginLeft:'1vh',marginTop:'1vh' }}><div >{run}</div></button> : '',
                    //run==='6' ||run==='4' ?  <button class='btn btn-primary btn-sm rounded-pill' style={{ fontSize: '2.5vh', height: '6vh', width: '6vh',marginLeft:'1vh',marginTop:'1vh' }}><div >{run}</div></button> : ''


                  })}
                </div>
              </div>
            ))}



          </div>
        </Col>
      </Row>

      <Modal show={showModalTeamSelect} onHide={showEditTeamSelect} className="recModal">
        <Modal.Header className="btnw" closeButton>
          <Modal.Title as="h5">Player Selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <nav style={{ marginBottom: '50px' }}>

            <Nav justify variant="tabs" defaultActiveKey="#">
              <Nav.Item>
                <Nav.Link href="#" onClick={()=>teamtab1()}>Mumbai Indians</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={()=>teamtab2()}>Royal Challengers Bangalore</Nav.Link>
              </Nav.Item>


            </Nav>


          </nav>

          <div class="tab-content iq-tab-fade-up" >
            <div class="tab-pane fade show active" id="team1" role="tabpanel" aria-labelledby="nav-home-tab" >
              <ListGroup defaultActiveKey="#link1">
                <ListGroup.Item action href="#link1" variant='light'>
                  (0 players selected)
                </ListGroup.Item>

                {teamA.map((item, idx) => {
                  return (
                    <ListGroup.Item className="d-flex justify-content-between align-items-center" >
                      {item.player_name}
                      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={()=>addPlayersT1(item)}>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </ListGroup.Item>
                  )
                })}




              </ListGroup>
            </div>
            <div class="tab-pane fade show" id="team2" role="tabpanel" aria-labelledby="nav-home-tab" >
              <ListGroup defaultActiveKey="#link1">
                <ListGroup.Item action href="#link1" variant='light'>
                  (0 players selected)
                </ListGroup.Item>

                {teamB.map((item, idx) => {
                  return (
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      {item.player_name}
                      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={()=>addPlayersT2(item)}>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </ListGroup.Item>
                  )
                })}




              </ListGroup>
            </div>
          </div>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={()=>showEditMatchSetting()}>Match Settings</Button>
        </Modal.Footer>

      </Modal>

      <Modal show={showModalMatchSetting} onHide={showEditMatchSetting} className="recModal">
        <Modal.Header className="btnw" closeButton>
          <Modal.Title as="h5">Match Setting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup defaultActiveKey="#link1">
            <ListGroup.Item variant="dark">APP SETTINGS</ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Show wagon wheels
              <Form>
                <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch"
                  className='viktoggle'
                />

              </Form>
            </ListGroup.Item>
            <ListGroup.Item variant="dark">MATCH SETTINGS</ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Players per team
              <div class="qty" style={{ marginTop: '0px' }}>
                <span class="minus bg-primary">-</span>
                <input type="number" class="count" name="qty" value="1" />
                <span class="plus bg-primary">+</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Batters per team
              <div class="qty" style={{ marginTop: '0px' }}>
                <span class="minus bg-primary">-</span>
                <input type="number" class="count" name="qty" value="1" />
                <span class="plus bg-primary">+</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Balls per over
              <div class="qty" style={{ marginTop: '0px' }}>
                <span class="minus bg-primary">-</span>
                <input type="number" class="count" name="qty" value="1" />
                <span class="plus bg-primary">+</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Wide value
              <div class="qty" style={{ marginTop: '0px' }}>
                <span class="minus bg-primary">-</span>
                <input type="number" class="count" name="qty" value="1" />
                <span class="plus bg-primary">+</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              No ball value
              <div class="qty" style={{ marginTop: '0px' }}>
                <span class="minus bg-primary">-</span>
                <input type="number" class="count" name="qty" value="1" />
                <span class="plus bg-primary">+</span>
              </div>
            </ListGroup.Item>
          </ListGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>showEditMatchSetup()}>Match Setup</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalMatchSetup} onHide={showEditMatchSetup} className="recModal">
        <Modal.Header className="btnw" closeButton>
          <Modal.Title as="h5">Match Setup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup defaultActiveKey="#link1">
            <ListGroup.Item variant="dark">TOSS WON BY</ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Mumbai Indians
              <input class="form-check-input" type="radio" value="Mumbai Indians" checked={tossWon == 'Mumbai Indians'} id="team1" onChange={onTossWon} />
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Royal Challengers Bangalore
              <input class="form-check-input" type="radio" value="Royal Challengers Bangalore" checked={tossWon == 'Royal Challengers Bangalore'} id="team2" onChange={onTossWon} />
            </ListGroup.Item>
            <ListGroup.Item variant="dark">WHO IS BATTING</ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Mumbai Indians
              <input class="form-check-input" type="radio" value="Mumbai Indians" id="bat" checked={electedTo == 'Mumbai Indians'} onChange={onElectedTo} />
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Royal Challengers Bangalore
              <input class="form-check-input" type="radio" value="Royal Challengers Bangalore" id="bowl" checked={electedTo == 'Royal Challengers Bangalore'} onChange={onElectedTo} />
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>showEditSelectBatter()}>Done</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalEditBall} onHide={showEditEditBall} >
        <Modal.Header className="btnw" closeButton>
          <Modal.Title as="h5">Edit Ball</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Strike Batter

              <div onClick={()=>showEditSelectBatter()}>
                Vikrant Rane
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M16.6308 13.131C16.5743 13.189 16.3609 13.437 16.1622 13.641C14.9971 14.924 11.9576 17.024 10.3668 17.665C10.1252 17.768 9.51437 17.986 9.18802 18C8.8753 18 8.5772 17.928 8.29274 17.782C7.93814 17.578 7.65368 17.257 7.49781 16.878C7.39747 16.615 7.2416 15.828 7.2416 15.814C7.08573 14.953 7 13.554 7 12.008C7 10.535 7.08573 9.193 7.21335 8.319C7.22796 8.305 7.38383 7.327 7.55431 6.992C7.86702 6.38 8.47784 6 9.13151 6H9.18802C9.61374 6.015 10.509 6.395 10.509 6.409C12.0141 7.051 14.9834 9.048 16.1768 10.375C16.1768 10.375 16.5129 10.716 16.659 10.929C16.887 11.235 17 11.614 17 11.993C17 12.416 16.8724 12.81 16.6308 13.131Z" fill="currentColor" />
                </svg>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Bowler

              <div onClick={()=>showEditSelectBowler()}>
                Santosh Nanekar
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M16.6308 13.131C16.5743 13.189 16.3609 13.437 16.1622 13.641C14.9971 14.924 11.9576 17.024 10.3668 17.665C10.1252 17.768 9.51437 17.986 9.18802 18C8.8753 18 8.5772 17.928 8.29274 17.782C7.93814 17.578 7.65368 17.257 7.49781 16.878C7.39747 16.615 7.2416 15.828 7.2416 15.814C7.08573 14.953 7 13.554 7 12.008C7 10.535 7.08573 9.193 7.21335 8.319C7.22796 8.305 7.38383 7.327 7.55431 6.992C7.86702 6.38 8.47784 6 9.13151 6H9.18802C9.61374 6.015 10.509 6.395 10.509 6.409C12.0141 7.051 14.9834 9.048 16.1768 10.375C16.1768 10.375 16.5129 10.716 16.659 10.929C16.887 11.235 17 11.614 17 11.993C17 12.416 16.8724 12.81 16.6308 13.131Z" fill="currentColor" />
                </svg>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Runs
              <div class="qty" style={{ marginTop: '0px' }}>
                <span class="minus bg-primary">-</span>
                <input type="number" class="count" name="qty" value="2" />
                <span class="plus bg-primary">+</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item style={{ textAlign: 'center' }} variant="danger">Add Wicket</ListGroup.Item>
            <ListGroup.Item style={{ textAlign: 'center' }} variant="info">Delete Ball</ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" >Update</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalSelectBatter} onHide={showEditSelectBatter} className="recModal">
        <Modal.Header className="btnw" closeButton>
          <Modal.Title as="h5">Select Striker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>

            {inningNo === 1 ? scoring_team === team_1 ?
              teamA.map((item, idx) => {
                return (
                  item.is_Batting === '0' ? <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    {item.player_name}
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id={item.player_id} value={item.player_name} onChange={selectSriker} />
                  </ListGroup.Item> : ''
                )
              }) :
              teamB.map((item, idx) => {
                return (
                  item.is_Batting === '0' ? <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    {item.player_name}
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id={item.player_id} value={item.player_name} onChange={selectSriker} />
                  </ListGroup.Item> : ''
                )
              }) :
              chessing_team === team_1 ?
                teamA.map((item, idx) => {
                  return (
                    item.is_Batting === '0' ? <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      {item.player_name}
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id={item.player_id} value={item.player_name} onChange={selectSriker} />
                    </ListGroup.Item> : ''
                  )
                }) :
                teamB.map((item, idx) => {
                  return (
                    item.is_Batting === '0' ? <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      {item.player_name}
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id={item.player_id} value={item.player_name} onChange={selectSriker} />
                    </ListGroup.Item> : ''
                  )
                })
            }




          </ListGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>showEditSelectNS()}>Done</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalSelectNS} onHide={showEditSelectNS} className="recModal">
        <Modal.Header className="btnw" closeButton>
          <Modal.Title as="h5">Select Non-Striker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>

            {inningNo === 1 ? scoring_team === team_1 ?
              teamA.map((item, idx) => {
                return (
                  item.is_Batting === '0' ? <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    {item.player_name}
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id={item.player_id} value={item.player_name} onChange={selectNSriker} />
                  </ListGroup.Item> : ''
                )
              }) :
              teamB.map((item, idx) => {
                return (
                  item.is_Batting === '0' ? <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    {item.player_name}
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id={item.player_id} value={item.player_name} onChange={selectNSriker} />
                  </ListGroup.Item> : ''
                )
              }) :
              chessing_team === team_1 ?
                teamA.map((item, idx) => {
                  return (
                    item.is_Batting === '0' ? <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      {item.player_name}
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id={item.player_id} value={item.player_name} onChange={selectNSriker} />
                    </ListGroup.Item> : ''
                  )
                }) :
                teamB.map((item, idx) => {
                  return (
                    item.is_Batting === '0' ? <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      {item.player_name}
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id={item.player_id} value={item.player_name} onChange={selectNSriker} />
                    </ListGroup.Item> : ''
                  )
                })
            }

          </ListGroup>

        </Modal.Body>
        <Modal.Footer>
         
         <Button variant="primary" onClick={()=>showEditSelectBowler()}>Done</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalSelectBowler} onHide={showEditSelectBowler} className="recModal">
        <Modal.Header className="btnw" closeButton>
          <Modal.Title as="h5">Select Bowler</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>


            {inningNo === 1 ?
              chessing_team === team_1 ?
                teamA.map((item, idx) => {
                  return (
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      {item.player_name}
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id={item.player_id} value={item.player_name + '$' + item.player_id} onChange={selectBowler} />
                    </ListGroup.Item>
                  )
                }) :
                teamB.map((item, idx) => {
                  return (
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      {item.player_name}
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id={item.player_id} value={item.player_name + '$' + item.player_id} onChange={selectBowler} />
                    </ListGroup.Item>
                  )
                }) :
              scoring_team === team_1 ?
                teamA.map((item, idx) => {
                  return (
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      {item.player_name}
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id={item.player_id} value={item.player_name + '$' + item.player_id} onChange={selectBowler} />
                    </ListGroup.Item>
                  )
                }) :
                teamB.map((item, idx) => {
                  return (
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      {item.player_name}
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id={item.player_id} value={item.player_name + '$' + item.player_id} onChange={selectBowler} />
                    </ListGroup.Item>
                  )
                })



            }


          </ListGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>startMatch()}>Done</Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showModalChangeBatter} onHide={showEditChangeBatter} className="recModal">
        <Modal.Header className="btnw" closeButton>
          <Modal.Title as="h5">Change Batter</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
      </Modal>

      <Modal show={showModalChangeBowler} onHide={showEditChangeBowler} className="recModal">
        <Modal.Header className="btnw" closeButton>
          <Modal.Title as="h5">Change Bowler</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
      </Modal>

      <Modal show={showModalNewBatter} onHide={showEditNewBatter} className="recModal">
        <Modal.Header className="btnw" closeButton>
          <Modal.Title as="h5">Select New Batter</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
      </Modal>

      <Modal show={showModalNewBowler} onHide={showEditNewBowler} className="recModal">
        <Modal.Header className="btnw" closeButton>
          <Modal.Title as="h5">Select New Bowler</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
      </Modal>

      <Modal show={showModalWide} onHide={showEditWide} >
        <Modal.Header className="btnw" closeButton>
          <Modal.Title as="h5">Wide Ball</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{textAlign:'center'}}><span>WD (1) + </span><input type="text" id="wdEx" maxlength="1" max="6" style={{width:'2rem',border: '1px solid',textAlign:'center'}} placeholder='0' /> </div> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>handleWide()}>OK</Button>
        </Modal.Footer>
       
      </Modal>

      <Modal show={showModalWicket} onHide={showEditWicket} className="recModal">
        <Modal.Header className="btnw" closeButton>
          <Modal.Title as="h5">Wicket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item style={{ padding: '0px 0px 0px 10px' }} className="d-flex justify-content-between align-items-center">
              Batter Out

              <Form.Group className="form-group" style={{ margin: '0px' }}>

                <Form.Select required style={{ border: '0px', textAlign: 'right' }} className="form-select" id="exampleFormControlSelect1"
                onChange={batterOut}
                >
                   <option value="">Select</option>
                  {inningNo === 1 ? scoring_team === team_1 ?
                    teamA.map((item, idx) => {
                      return (
                        item.is_Batting === '1' ? <option value={item.player_name}> {item.player_name}</option> : ''
                      )
                    }) :
                    teamB.map((item, idx) => {
                      return (
                        item.is_Batting === '1' ? <option value={item.player_name}> {item.player_name}</option> : ''
                      )
                    }) :
                    chessing_team === team_1 ?
                      teamA.map((item, idx) => {
                        return (
                          item.is_Batting === '1' ? <option value={item.player_name}> {item.player_name}</option> : ''
                        )
                      }) :
                      teamB.map((item, idx) => {
                        return (
                          item.is_Batting === '1' ? <option value={item.player_name}> {item.player_name}</option> : ''
                        )
                      })
                  }

                </Form.Select>
              </Form.Group>
            </ListGroup.Item>
            <ListGroup.Item style={{ padding: '0px 0px 0px 10px' }} className="d-flex justify-content-between align-items-center">
              Dismissal type

              <Form.Group className="form-group" style={{ margin: '0px' }}>

                <Form.Select required style={{ border: '0px', textAlign: 'right' }} className="form-select" id="exampleFormControlSelect1"
                  onChange={dismissalType}
                >
                  <option value="">Select</option>
                  <option value="stumped">Stumped</option>
                  <option value="bold">Bold</option>
                  <option value="runout">Run out</option>
                  <option value="hit">Hit wicket</option>
                  <option value="obstructing">Obstructing the feild</option>
                  <option value="retired">Retired</option>
                </Form.Select>
              </Form.Group>
            </ListGroup.Item>
            <ListGroup.Item style={{ padding: '0px 0px 0px 10px' }} className="d-flex justify-content-between align-items-center">
              Fielder

              <Form.Group className="form-group" style={{ margin: '0px' }}>

                <Form.Select required style={{ border: '0px', textAlign: 'right' }} className="form-select" id="exampleFormControlSelect1"
                 onChange={bowlerWicketTaker}
                >
                   <option value="">Select</option>
                   {inningNo === 1 ?
              chessing_team === team_1 ?
                teamA.map((item, idx) => {
                  return (
                    <option value={item.player_name}> {item.player_name}</option>
                  )
                }) :
                teamB.map((item, idx) => {
                  return (
                    <option value={item.player_name}> {item.player_name}</option>
                  )
                }) :
              scoring_team === team_1 ?
                teamA.map((item, idx) => {
                  return (
                    <option value={item.player_name}> {item.player_name}</option>
                  )
                }) :
                teamB.map((item, idx) => {
                  return (
                    <option value={item.player_name}> {item.player_name}</option>
                  )
                })}

                </Form.Select>
              </Form.Group>
            </ListGroup.Item>
            <ListGroup.Item style={{ padding: '0px 0px 0px 10px' }} className="d-flex justify-content-between align-items-center">
              Fielder(Assist)

              <Form.Group className="form-group" style={{ margin: '0px' }}>

                <Form.Select required style={{ border: '0px', textAlign: 'right' }} className="form-select" id="exampleFormControlSelect1"
                   onChange={fielderAssist}
                >
                   <option value="">Select</option>
                  {inningNo === 1 ?
              chessing_team === team_1 ?
                teamA.map((item, idx) => {
                  return (
                    <option value={item.player_name}> {item.player_name}</option>
                  )
                }) :
                teamB.map((item, idx) => {
                  return (
                    <option value={item.player_name}> {item.player_name}</option>
                  )
                }) :
              scoring_team === team_1 ?
                teamA.map((item, idx) => {
                  return (
                    <option value={item.player_name}> {item.player_name}</option>
                  )
                }) :
                teamB.map((item, idx) => {
                  return (
                    <option value={item.player_name}> {item.player_name}</option>
                  )
                })}
                </Form.Select>
              </Form.Group>
            </ListGroup.Item>
          </ListGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={wicketDissmissal}>Done</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalEndInnings} onHide={showEditEndInnings}>
        <Modal.Header className="btnw" closeButton>
          <Modal.Title as="h5">Innings End</Modal.Title>
        </Modal.Header>
        <Modal.Body>


        </Modal.Body>
        <Modal.Footer>
          {inningNo === 1 ? <Button variant="primary" onClick={()=>{handleEndInning()}}>End 1st Innings</Button> : <Button variant="primary" onClick={()=>{handleEndInning()}}>End 2nd Innings</Button>}
        </Modal.Footer>
      </Modal>

      <Modal show={showModalScorecard} className="recModal">
        <Modal.Header className="btnw" closeButton>
          <Modal.Title as="h5">Score Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div class="bg-success " style={{ width: '100%', padding: '1.5vh', textAlign: 'center', color: 'white' }}>{winningMessage}</div>
            <div className='score-board-innings'>
              <div>{scoring_team} Innings</div>
              <div>RR:{inningNo === 1 ? crr : inning1.runRate}</div>
              <div>
                {inningNo === 1 ? totalRuns : inning1.runs}-{inningNo === 1 ? wicketCount : inning1.wickets} (
                {inningNo === 1 ? totalOvers : inning1.overs} Ov)
              </div>
            </div>
            <div className='sb-batting'>
              <table>
                <thead>
                  <tr>
                    <td className='score-types padding-left'>Batter</td>
                    <td className='score-types'>R(B)</td>
                    <td className='score-types text-center'>4s</td>
                    <td className='score-types text-center'>6s</td>
                    <td className='score-types text-center'>SR</td>
                  </tr>
                </thead>
                <tbody>
                  {inning1.batters.map((batter, i) => {
                    return (
                      <tr key={i}>
                        <td className='score-types padding-left'>{batter.name}</td>
                        <td className='score-types'>
                          {batter.run}({batter.ball})
                        </td>
                        <td className='score-types text-center'>{batter.four}</td>
                        <td className='score-types text-center'>{batter.six}</td>
                        <td className='score-types text-center'>{batter.strikeRate}</td>
                      </tr>
                    )
                  })}
                  <tr>
                    <td className='score-types padding-left'>Extras:</td>
                    <td className='score-types'>{inningNo === 1 ? extras.total : inning1.extra.total}</td>
                    <td className='score-types text-center'>wd:{inningNo === 1 ? extras.wide : inning1.extra.wide}</td>
                    <td className='score-types text-center'>nb:{inningNo === 1 ? extras.noBall : inning1.extra.noBall}</td>
                    <td className='score-types text-center'></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='sb-bowling'>
              <table>
                <thead>
                  <tr>
                    <td className='score-types padding-left'>Bowler</td>
                    <td className='score-types'>O</td>
                    <td className='score-types text-center'>M</td>
                    <td className='score-types text-center'>R</td>
                    <td className='score-types text-center'>W</td>
                    <td className='score-types text-center'>NB</td>
                    <td className='score-types text-center'>WD</td>
                    <td className='score-types text-center'>ECO</td>
                  </tr>
                </thead>
                <tbody>
                  {inning1.bowlers.map((blr, i) => {
                    const { name, over, maiden, run, wicket, noBall, wide, economy } = blr
                    return (
                      <tr key={i}>
                        <td className='score-types padding-left'>{name}</td>
                        <td className='score-types'>{over}</td>
                        <td className='score-types text-center'>{maiden}</td>
                        <td className='score-types text-center'>{run}</td>
                        <td className='score-types text-center'>{wicket}</td>
                        <td className='score-types text-center'>{noBall}</td>
                        <td className='score-types text-center'>{wide}</td>
                        <td className='score-types text-center'>{economy}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {inningNo === 2 && (
              <div>
                <div className='score-board-innings'>
                  <div>{chessing_team} Innings</div>
                  <div>RR:{inningNo === 2 ? crr : inning2.runRate}</div>
                  <div>
                    {hasMatchEnded ? inning2.runs : totalRuns}-{hasMatchEnded ? inning2.wickets : wicketCount} (
                    {hasMatchEnded ? inning2.overs : totalOvers} Ov)
                  </div>
                </div>
                <div className='sb-batting'>
                  <table>
                    <thead>
                      <tr>
                        <td className='score-types padding-left'>Batter</td>
                        <td className='score-types'>R(B)</td>
                        <td className='score-types text-center'>4s</td>
                        <td className='score-types text-center'>6s</td>
                        <td className='score-types text-center'>SR</td>
                      </tr>
                    </thead>
                    <tbody>
                      {inning2.batters.map((batter, i) => {
                        return (
                          <tr key={i}>
                            <td className='score-types padding-left'>{batter.name}</td>
                            <td className='score-types'>
                              {batter.run}({batter.ball})
                            </td>
                            <td className='score-types text-center'>{batter.four}</td>
                            <td className='score-types text-center'>{batter.six}</td>
                            <td className='score-types text-center'>{batter.strikeRate}</td>
                          </tr>
                        )
                      })}
                      <tr>
                        <td className='score-types padding-left'>Extras:</td>
                        <td className='score-types'>{hasMatchEnded ? inning2.extra.total : extras.total}</td>
                        <td className='score-types text-center'>wd:{hasMatchEnded ? inning2.extra.wide : extras.wide}</td>
                        <td className='score-types text-center'>nb:{hasMatchEnded ? inning2.extra.noBall : extras.noBall}</td>
                        <td className='score-types text-center'></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='sb-bowling'>
                  <table>
                    <thead>
                      <tr>
                        <td className='score-types padding-left'>Bowler</td>
                        <td className='score-types'>O</td>
                        <td className='score-types text-center'>M</td>
                        <td className='score-types text-center'>R</td>
                        <td className='score-types text-center'>W</td>
                        <td className='score-types text-center'>NB</td>
                        <td className='score-types text-center'>WD</td>
                        <td className='score-types text-center'>ECO</td>
                      </tr>
                    </thead>
                    <tbody>
                      {inning2.bowlers.map((blr, i) => {
                        const { name, over, maiden, run, wicket, noBall, wide, economy } = blr
                        return (
                          <tr key={i}>
                            <td className='score-types padding-left'>{name}</td>
                            <td className='score-types'>{over}</td>
                            <td className='score-types text-center'>{maiden}</td>
                            <td className='score-types text-center'>{run}</td>
                            <td className='score-types text-center'>{wicket}</td>
                            <td className='score-types text-center'>{noBall}</td>
                            <td className='score-types text-center'>{wide}</td>
                            <td className='score-types text-center'>{economy}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

        </Modal.Body>
        <Modal.Footer>
          {hasMatchEnded === false ? <Button variant="warning" onClick={end2ndInnings}>Start 2nd Innings</Button> : <Button variant="warning" onClick={finalMatchEnd}>End Match</Button>}
        </Modal.Footer>
      </Modal>


    </>
  )
}

export default EditScore


