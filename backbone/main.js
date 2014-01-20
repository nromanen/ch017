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
		incorrect: 0,
		index:0
		}
	})
  
 
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
		index++

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
		var status = this.collection.at(index).get('correct');
			if (status != 'not answered yet'){
				return
			}
			
		var countTrue = counterModel.get('correct' )+ 1;
			counterModel.set('correct', countTrue);
			this.collection.at(index).set('correct', 'correct')
		},
		
		setIncorrect: function(){
			var status = this.collection.at(index).get('correct');
				if (status != 'not answered yet'){
					return
			}
		
		this.collection.at(index).set('correct', 'incorrect');

		var countFalse = counterModel.get('incorrect' )+ 1;
			counterModel.set('incorrect', countFalse);

		},
		
		indexIncrease: function(){
		index++
		this.render();
		},
		
		indexDecrease: function(){
		index--
		this.render();
		},
		
		template: template('person-id'),
		
        render: function() {
			this.$el.html( this.template( this.collection.at(index).toJSON() ) );
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
		});
		
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

	var index = 0;
	var questionModel = new App.Models.Question();
    var questionsView = new App.Views.Questions({collection: questionCollection});
	var counterModel = new App.Models.Counter();
	var counterView = new App.Views.Counter({model: counterModel});
    $(document.body).append(questionsView.render().el);
	$(document.body).append(counterView.el);

}());