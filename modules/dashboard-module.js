var app = require('express')();



app.listen(6061, function () {
    console.log('reciver is running on port 6061');
});

module.exports = app;

DashBoard = class {
    constructor() {
        this.joins = 0
        this.complains = 0
        this.cutoffs = 0
        this.avarageOnHold = 0
        this.onHold = 0
    };

    updateData = function (joins_, complains_, cutoffs_, avargeOnHold_, onHold_) {
        this.joins = joins_
        this.complains = complains_
        this.cutoffs = cutoffs_
        this.avarageOnHold = avargeOnHold_
        this.onHold = onHold_
    };

    updateDisplay = function () {
        app.get('/', (req, res) => res.send("GotData"+this.toString())) // <--Data goes here
    }

    toString = function () {
        return this.joins.toString() + "," + this.complains.toString() + "," + this.cutoffs.toString() + "," + this.avarageOnHold.toString() + ","
    }



}
module.exports = DashBoard, DashBoard.updateData, DashBoard.updateDisplay;
