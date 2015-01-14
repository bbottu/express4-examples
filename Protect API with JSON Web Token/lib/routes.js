var express = require('express');
var router = express.Router();

var auth = require(__base + 'lib/auth');
var textFormUpload = require(__base + 'lib/text-form-upload');

/*** Public operations ***/
router.post('/public/token', textFormUpload, function(req, res) {
    auth.createToken(req.body.loginName, req.body.loginPassword, handleQueryResponse(res));
});

/*** Protected operations ***/
router.put('/protected/token', function(req, res) {
    auth.updateToken(req.user, handleQueryResponse(res));
});

function handleQueryResponse(res) {
    return function(err, obj) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(obj);
        }
    };
}

module.exports = router;