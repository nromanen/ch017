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
        defaults: {
            text: 'Type your question there'
        }
    });
	
	//Модель счетчика
	App.Models.Counter = Backbone.Model.extend({
	
	  validate: function(attrs, options) {
		if (attrs.index < 0 || attrs.index > questionCollection.length - 1) {
      return 'error';
    }
	
  },
 
		defaults: {
		correct: 0,
		incorrect: 0,
		notAnswered:0,
		index:0		
		}
	});
	var counterModel = new App.Models.Counter();
 
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
		var index = counterModel.get('index')
		counterModel.set({index: index + 1},{validate:true})
		}, this);
			
		this.collection.on('change', this.render, this);

		this.render();
        },
		
				events:{
		'click .correct': 'setCorrect',
		'click .incorrect': 'setIncorrect',
		'click .forward': 'indexIncrease',
		'click .back': 'indexDecrease'
		},
		
		setCorrect: function(){
			var status = this.collection.at(counterModel.get('index')).get('correct');
				if (status != 'not answered yet'){
					return
				}
			
		this.collection.at(counterModel.get('index')).set('correct', 'correct')
			counterModel.set('correct', counterModel.get('correct' )+ 1);
			counterModel.set({notAnswered: counterModel.get('notAnswered') - 1 });
		},
		
		setIncorrect: function(){
			var status = this.collection.at(counterModel.get('index')).get('correct');
				if (status != 'not answered yet'){
					return
			}
		
		this.collection.at(counterModel.get('index')).set('correct', 'incorrect');
			counterModel.set({incorrect: counterModel.get('incorrect' )+ 1});
			counterModel.set({notAnswered: counterModel.get('notAnswered') - 1 });

		},
		
		indexIncrease: function(){
			var index = counterModel.get('index')
			counterModel.set({index: index + 1},{validate:true})
			this.render();
		},
		
		indexDecrease: function(){
			var index = counterModel.get('index')
			counterModel.set({index: index - 1},{validate:true})
			this.render();
		},
		
		template: template('person-id'),
		
        render: function() {
			this.$el.html( this.template( this.collection.at(counterModel.get('index')).toJSON() ) );
			return this;
        }
 
    });
 
	//Вид счетчика
	App.Views.Counter = Backbone.View.extend({
	tagName: 'li',
	className: 'noListingStyle',
	initialize: function() {  
		  		  
        this.model.on('change', this.render, this); 
		
		counterModel.set({notAnswered:questionCollection.length})
		
        this.render();
        },
		
		template: template('counter-id'),
		  render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
 
            return this;
        }
	});
 
    //Вид одного вопроса
    App.Views.Question = Backbone.View.extend({
        tagName: 'li',
 
        template:  template('person-id'),
 
        initialize: function() {
            this.render();
			this.model.on('change', this.render, this);
        },
 
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
           text: 'Cras id sapien consectetur',
		   correct: 'not answered yet',
        }
    ]);

	var questionModel = new App.Models.Question();
    var questionsView = new App.Views.Questions({collection: questionCollection});
	var counterModel = new App.Models.Counter();
	var counterView = new App.Views.Counter({model: counterModel});
	
    $(document.body).append(questionsView.el);
	$(document.body).append(counterView.el);
}());