//export const API_URL = "http://localhost:8080/api"   //local url
export const API_URL = "https://206.189.142.39:8080/api" //remote url

export const API_NAME = {
    LOGIN : '/tutorials/published',

    USER : '/userMaster/getAllUser',
    ADD_USER : '/user/addUser',
    GET_ROLE : '/userMaster/getUser',

    SUB_ADMIN : '/subAdmin/fetchSubAdmin',
    ADD_SUB_ADMIN : '/subAdmin/addSubAdmin',
    EDIT_PERMISSION : '/subAdmin/editPermission',

    RESET_PASSWORD : '/user/resetPassword',

    ADD_PLAYER : '/player/addPlayer',
    PLAYER : '/player/fetchPlayerList',
    EDIT_PLAYER : '/player/editPlayer',

    TOURNAMENT_LIST : '/tournament/fetchMyTournament',//'/userMaster/getAllTournaments',
    ADD_TOURNAMENT : '/tournament/addNewTournament',//'/userMaster/addTournament',
    DELETE_TOURNAMENT : '/tournament/deleteTournament',
    MY_TOURNAMENT : '/userMaster/fetchMyTournament',
    ASSIGN_USER : '/userMaster/linkUserWithTournament',
    TOURNAMENT_TEAM : '/editTeam/getTournamentTeam',
    TEAM_PLAYER : '/editTeam/getTournamentTeamSquad',
    ADD_TOURNAMENT_TEAM : '/editTeam/addTeam',
    ADD_SQUAD_IN_TEAM :'/editTeam/addPlayersToSquad',
    TOURNAMENT_MATCHES : '/editMatch/fetchAllMatchDetails',
    UPDATE_TOURNAMENT_TEAM : '/editTeam/updateTeam',
    ADD_IN_PLAYING_SQUAD : '/editTeam/updateSquadPlayer',
    REMOVE_PLAYER_SQUAD : '/editTeam/removePlayerFromSquad',

    //new
    GROUND_LIST : '/ground/fetchGround',
    ADD_GROUND :  '/ground/addGround',

    ADD_COMMENTATOR : '/commentator/addCommentator',
    GET_COMMENTATOR : '/commentator/fetchCommentator',

    ADD_UMPIRE : '/umpire/addUmpires',
    GET_UMPIRE : '/umpire/fetchUmpires',

    UPLOAD_IMAGE:'/images/uploadImage',

    GET_TOUR_TEAMS:'/editTeam/getTournamentTeam',
    GET_MY_TEAMS:'/editTeam/getUserTeams',
    SEARCH_TEAMS:'/editTeam/searchTeams',
    ADD_TEAM:'/editTeam/addTeam',
    ADD_PLAYER:'/player/addPlayer',
    SCHEDULE_MATCH:'/editMatch/scheduleMatch',
    FETCH_MATCH_DETAILS:'/editMatch/fetchAllMatchDetails'
}