/*
angular.module('mongolab', ['ngResource']).
	factory('Project', function($resource) {
		var Project = $resource('https://api.mongolab.com/api/1/databases' +
			'/mixator/collections/projects/:id',
			{ apiKey: 'n5tahFEuH5f7ruhp63qQ5OEl0AEJBml8' },
			{ update: { method: 'PUT' }
		}
	);
 
	Project.prototype.update = function(cb) {
		return Project.update({id: this._id.$oid},
		angular.extend({}, this, {_id:undefined}), cb);
	};
 
	Project.prototype.destroy = function(cb) {
		return Project.remove({id: this._id.$oid}, cb);
	};
 
	return Project;
});
*/