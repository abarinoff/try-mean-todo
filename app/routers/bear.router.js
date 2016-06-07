var express = require("express");
var Bear = require('../models/bear');

var BearRouter = express.Router();

BearRouter.use(function (req, res, next) {
    console.log('Something is happening.');
    next();
});

BearRouter.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api updated!' });
});

BearRouter.route("/bears")
    .post(function(req, res) {
        var bear = new Bear();
        bear.name = req.body.name;

        bear.save(function(err) {
            if(err) res.send(err);
            else res.json({message: 'Bear created!'});
        })
    })
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if(err) res.send(err);
            else res.json(bears);
        });
    });

BearRouter.route('/bears/:bear_id')
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if(err) res.send(err);
            else res.json(bear);
        });
    })
    .put(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if(err) res.send(err);
            else {
                bear.name = req.body.name;
                bear.save(function(err) {
                    if (err) res.send(err);
                    else res.json({ message: 'Bear updated!' });
                });
            }
        });
    })
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err) res.send(err);
            else res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = BearRouter;