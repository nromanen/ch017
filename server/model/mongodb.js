var mongoose = require('mongoose');
var pureautoinc  = require('mongoose-pureautoinc');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

module.exports = {

    initializeDb: function(next) {

        mongoose.connect("mongodb://localhost:27017/todoDb");

        var db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {

            pureautoinc.init(db);

            //describe schemas for future models
            var roleSchema = new Schema({
                name: {type: String, require: true, index: {unique: true, dropDups: true}},
                add: {type: Boolean, default: false},
                edit: {type: Boolean, default: false},
                remove:  {type: Boolean, default: false},
                check:  {type: Boolean, default: false}
            });

            var timeSchema = new Schema({
                datetime: Date,
                done: {type: Boolean, default: false},
                todo: [{
                    type: Number,
                    ref: 'Todo',
                    index: true
                }]
            });

            var todoSchema = new Schema({
                text: {type: String, require: true},
                date_created: {type: Date, default: new Date()},
                date_finished: Date,
                time:  [{
                    type: Number,
                    ref: 'Time',
                    index: true
                }],
                amount: {type: Number, default: 1}
            });

            var userSchema = new Schema({
                first_name: {type: String, require: true},
                last_name: {type: String, require: true},
                foto: {type: String, default: ''},
                login: {type: String, require: true, index: {unique: true, dropDups: true}},
                password: {type: String, require: true},
                is_doctor: {type: Boolean, default: false},
                is_staff: {type: Boolean, default: false},
                is_active: {type: Boolean, default: false},
                role:  {
                    type: Number,
                    ref: 'Role',
                    index: true
                },
                todo:  [{
                    type: Number,
                    ref: 'Todo',
                    index: true
                }]
            });

            //create auto increment fields
            var medicinesSchema = new Schema({
                title: {type: String, require: true, index: {unique: true, dropDups: true}}
            });

            roleSchema.plugin(pureautoinc.plugin, {
                model: 'Role',
                field: '_id'
            });

            userSchema.plugin(pureautoinc.plugin, {
                model: 'User',
                field: '_id'
            });

            todoSchema.plugin(pureautoinc.plugin, {
                model: 'Todo',
                field: '_id'
            });

            timeSchema.plugin(pureautoinc.plugin, {
                model: 'Time',
                field: '_id'
            });

            medicinesSchema.plugin(pureautoinc.plugin, {
                model: 'Medicines',
                field: '_id'
            });


            //set virtual
            userSchema.virtual('id').get(function(){
                return this._id;
            });
            userSchema.set('toJSON', {
                virtuals: true
            });

            todoSchema.virtual('id').get(function(){
                return this._id;
            });
            todoSchema.set('toJSON', {
                virtuals: true
            });

            timeSchema.virtual('date').get(function(){
                return this.datetime.toISOString().slice(0,10);
            });

            timeSchema.virtual('time').get(function(){
                return this.datetime.toISOString().slice(11,19);;
            });

            timeSchema.virtual('id').get(function(){
                return this._id;
            });
            timeSchema.set('toJSON', {
                virtuals: true
            });

            roleSchema.virtual('id').get(function(){
                return this._id;
            });
            roleSchema.set('toJSON', {
                virtuals: true
            });


            //show exists model
            db.db.collectionNames(function (err, names) {
                console.log(names);
            });
          //  db.friends.ensureIndex( { "id" : 1 } );
            //create tables
            module.exports.tables = {
                Time: mongoose.model('Time', timeSchema),
                Todo: mongoose.model('Todo', todoSchema),
                Role: mongoose.model('Role', roleSchema),
                User: mongoose.model('User', userSchema),
                Medicines: mongoose.model('Medicines', medicinesSchema)
            };

            next();
        });
    }
};