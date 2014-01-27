(function() {
    window.App = {
        Models: {},
        Views: {},
        Collections: {}
    };
 
    //хэлпер шаблона
    window.template = function(id) {
        return _.template( $('#' + id).html() );
    };
 
    //Модель вопроса
    App.Models.Question = Backbone.Model.extend({
	validate: function(attrs, options) {
		  if (attrs.correct != 'not answered yet'){
	  return 'error';
	  }
	  },
	
        defaults: {
            text: '',
			status: 'not answered yet'
        }
    });
	
	//Модель индекса
	App.Models.Index = Backbone.Model.extend({
	
	validate: function(attrs, options) {
		if (attrs.index < 0 || attrs.index > questionCollection.length - 1) {
			return 'error';
		}    
	},
	
		defaults: {
            index: 0
        }
	});
	
	var indexModel = new App.Models.Index();
	
	//Модель статистики
	App.Models.Statistic = Backbone.Model.extend({
		defaults: {
		correct: 0,
		incorrect: 0,
		notAnswered:0,
		//index:0		
		}
	});
	
	var statisticModel = new App.Models.Statistic();
 
    //Список вопросов
    App.Collections.Questions = Backbone.Collection.extend({
        model: App.Models.Question
    });
 
    //Вид списка вопросов
    App.Views.Questions = Backbone.View.extend({
        tagName: 'ul',
		className:'noListingStyle noPadding width',
 
        initialize: function() {
		
		this.collection.on('change', function(){
			var index = indexModel.get('index')
			indexModel.set({index: index + 1},{validate:true})
		}, this);
			
		this.collection.on('change', this.render, this);
		
		this.render();
        },
		
				events:{ //proxy
		'click .correct': 'setCorrect',
		'click .incorrect': 'setIncorrect',
		'click .forward': 'indexIncrease',
		'click .back': 'indexDecrease'
		},
		
		setCorrect: function(){
			var status = this.collection.at(indexModel.get('index')).get('status');
				if (status != 'not answered yet'){
					return
				}
			
		this.collection.at(indexModel.get('index')).set('status', 'correct')
			statisticModel.set('correct', statisticModel.get('correct' )+ 1);
			statisticModel.set({notAnswered: statisticModel.get('notAnswered') - 1 });
		},
		
		setIncorrect: function(){
			var status = this.collection.at(indexModel.get('index')).get('correct');
				if (status != 'not answered yet'){
					return
		}
		
		this.collection.at(indexModel.get('index')).set('status', 'incorrect');
			statisticModel.set({incorrect: statisticModel.get('incorrect' )+ 1});
			statisticModel.set({notAnswered: statisticModel.get('notAnswered') - 1 });

		},
		
		indexIncrease: function(){
			var index = indexModel.get('index')
			indexModel.set({index: index + 1},{validate:true})
			this.render();
		},
		
		indexDecrease: function(){
			var index = indexModel.get('index')
			indexModel.set({index: index - 1},{validate:true})
			this.render();
		},
		
		template: template('main-id'),
		
        render: function() {
			this.$el.html( this.template( this.collection.at(indexModel.get('index')).toJSON() ) );
			return this;
        }
 
    });
 
	//Вид счетчика
	App.Views.Statistic = Backbone.View.extend({
	tagName: 'li',
	className: 'noListingStyle',
	initialize: function() {  
		  		  
        this.model.on('change', this.render, this); 
		
		statisticModel.set({notAnswered:questionCollection.length})
		
        this.render();
        },
		
		template: template('counter-id'),
		  render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
 
            return this;
        }
	});
 
 //колекция вопросов
    var questionCollection = new App.Collections.Questions([
        {
           text: 'Lorem ipsum dolor sit amet',
		   correct: 'not answered yet',
        },
		{
           text: 'Sed purus neque, faucibus ac leo non.',
		   correct: 'not answered yet',
        },
        {
           text: 'Consectetur adipiscing elit.',
		   correct: 'not answered yet',
        },
		{
           text: 'Volutpat purus at, accumsan enim.',
		   correct: 'not answered yet',
        },
		{
           text: 'Sed purus neque, faucibus ac leo non.',
		   correct: 'not answered yet',
        },
		{
           text: 'Aenean rhoncus eros id dui posuere cursus.',
		   correct: 'not answered yet',
        },
		{
           text: 'Sed purus neque, faucibus ac leo non.',
		   correct: 'not answered yet',
        },
		{
           text: 'Sed purus neque, faucibus ac leo non.',
		   correct: 'not answered yet',
        },
		{
           text: 'Sed purus neque, faucibus ac leo non.',
		   correct: 'not answered yet',
        },
        {
           text: 'Cras id sapien consectetur',
		   correct: 'not answered yet',
        }
    ]);

	var questionModel = new App.Models.Question();
    var questionsView = new App.Views.Questions({collection: questionCollection});
	var statisticModel = new App.Models.Statistic();
	var statisticView = new App.Views.Statistic({model: statisticModel}); 

    $(document.body).append(questionsView.el);
	$(document.body).append(statisticView.el);
}());