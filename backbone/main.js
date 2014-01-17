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

		defaults: {
		correct: 0,
		incorrect: 0
		}
	})
  
 
    //Список вопросов
    App.Collections.Questions = Backbone.Collection.extend({
        model: App.Models.Question
    });
 
 
    //Вид списка вопросов
    App.Views.Questions = Backbone.View.extend({
        tagName: 'ul',
		className:'noListingStyle',
 
        initialize: function() {
        },
 
        render: function() {
            this.collection.each(function(person) {
		   
                var questionView = new App.Views.Question({model: person});
 
                this.$el.append(questionView.render().el);
            }, this);
			
            return this;
        }
 
    });
 
	//Вид счетчика
	App.Views.Counter = Backbone.View.extend({
	tagName: 'li',
	className: 'noListingStyle',
	initialize: function() {
		  
        this.model.on('change', this.render, this); 
		
		this.model.on('change', function(){
		console.log('1');
		});
		
        this.render();
        },
		
		template: _.template('Correct: <strong><%= correct %></strong> Incorrect<strong> <%= incorrect %> </strong>'),
		
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
        },
		
		events:{
		'click .correct': 'setCorrect',
		'click .incorrect': 'setIncorrect'
		},
		
		setCorrect: function(){
		var countTrue = counterModel.get('correct' )+ 1;
			counterModel.set('correct', countTrue);
		},
		
		setIncorrect: function(){
		var countFalse = counterModel.get('incorrect' )+ 1;
			counterModel.set('incorrect', countFalse);		
		},
 
        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
			
            return this;
        }
    });
 
 
 //колекция вопросов
    var questionCollection = new App.Collections.Questions([
        {
           text: 'Lorem ipsum dolor sit amet'
        },
        {
           text: 'Consectetur adipiscing elit.'
        },
		  {
           text: 'Volutpat purus at, accumsan enim.'
        },
		  {
           text: 'Aenean rhoncus eros id dui posuere cursus.'
        },
		  {
           text: 'Sed purus neque, faucibus ac leo non.'
        },
        {
           text: 'Cras id sapien consectetur'
        }
    ]);
 
 
    var questionsView = new App.Views.Questions({collection: questionCollection});
	var counterModel = new App.Models.Counter();
	var counterView = new App.Views.Counter({model: counterModel});
 
    $(document.body).append(questionsView.render().el);
	$(document.body).append(counterView.render().el);
 
}());