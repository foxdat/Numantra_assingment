const express = require('express');
const {getUsers, loginUser,GetRolesList } = require('../controller/user_controller');
const {remove_duplicate,git_Api } = require('../controller/controller_ass21');
const {httpRequest,httpPostRequest} = require('../controller/http_controller');

const router = express.Router();

router.get('/users',getUsers);
router.post('/userLogin',loginUser);
router.get('/httpRequest',httpRequest);
router.post('/httpPostRequest',httpPostRequest);

router.get('/rolelist',GetRolesList);

router.get('/duplicate',remove_duplicate);

router.get('/gitapi',git_Api);






module.exports = {
    routes: router
}