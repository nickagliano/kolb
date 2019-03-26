var numbers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var q = 0;
var w;

var Quiz = function(){
  var self = this;

  this.init = function(){
    self._bindEvents();
  }

  this._pickAnswer = function($answer, $answers){
        if(numbers[q-1]==0){
          $answer.addClass('active1');
          numbers[q-1]++;
        } else if (numbers[q-1]==1){
            if($answer.hasClass('active1')){
              $answer.removeClass('active1');
              numbers[q-1]--;
            } else {
              $answer.addClass('active2');
              numbers[q-1]++;
            }
        } else if (numbers[q-1]==2){
          if ($answer.hasClass('active1')){
            $answer.removeClass('active1');
            numbers[q-1]--;
            $answers.find('.quiz-answer.active2').addClass('active1'); //************************
            $answers.find('.quiz-answer.active1').removeClass('active2'); //shifting answers!!!!!
          } else if ($answer.hasClass('active2')){
            $answer.removeClass('active2');//dont need to shift answers
            numbers[q-1]--;
          } else {
            $answer.addClass('active3');
            numbers[q-1]++;
          }
        } else if (numbers[q-1]==3){
          if ($answer.hasClass('active1')){
            $answer.removeClass('active1');
            $answers.find('.quiz-answer.active2').addClass('active1'); //************************
            $answers.find('.quiz-answer.active1').removeClass('active2'); //shifting answers!!!!!
            $answers.find('.quiz-answer.active3').addClass('active2');
            $answers.find('.quiz-answer.active3').removeClass('active3');
            numbers[q-1]--;
          } else if ($answer.hasClass('active2')){
            $answer.removeClass('active2');
            $answers.find('.quiz-answer.active3').addClass('active2'); //************************
            $answers.find('.quiz-answer.active3').removeClass('active3'); //shifting answers!!!!!
            numbers[q-1]--;
          } else if ($answer.hasClass('active3')) {
            $answer.removeClass('active3');
            numbers[q-1]--;
          } else {
            $answer.addClass('active4');
            numbers[q-1]++;
            //show next question -- a possible function to add?
          }
        }
          else if(numbers[q-1]==4){
            if ($answer.hasClass('active1')){
              $answer.removeClass('active1');
              $answers.find('.quiz-answer.active2').addClass('active1'); //************************
              $answers.find('.quiz-answer.active1').removeClass('active2'); //shifting answers!!!!!
              $answers.find('.quiz-answer.active3').addClass('active2');
              $answers.find('.quiz-answer.active3').removeClass('active3');
              $answers.find('.quiz-answer.active4').addClass('active3');
              $answers.find('.quiz-answer.active3').removeClass('active4');
              numbers[q-1]--;
            } else if ($answer.hasClass('active2')){
              $answer.removeClass('active2');
              $answers.find('.quiz-answer.active3').addClass('active2'); //************************
              $answers.find('.quiz-answer.active3').removeClass('active3'); //shifting answers!!!!!
              $answers.find('.quiz-answer.active4').addClass('active3');
              $answers.find('.quiz-answer.active3').removeClass('active4');
              numbers[q-1]--;
            } else if ($answer.hasClass('active3')) {
              $answer.removeClass('active3');
              $answers.find('.quiz-answer.active4').addClass('active3');
              $answers.find('.quiz-answer.active3').removeClass('active4');
              numbers[q-1]--;
            } else {
              $answer.removeClass('active4');
              numbers[q-1]--;
            }
          }
  }

  this._calcResult = function(){
    var numberOfCorrectAnswers = 0;
    $('ul[data-quiz-question]').each(function(i){
      var $this = $(this),
          chosenAnswer = $this.find('.quiz-answer.active').data('quiz-answer'),
          correctAnswer;

      for ( var j = 0; j < self.correctAnswers.length; j++ ) {
        var a = self.correctAnswers[j];
        if ( a.question == $this.data('quiz-question') ) {
          correctAnswer = a.answer;
        }
      }

      if ( chosenAnswer == correctAnswer ) {
        numberOfCorrectAnswers++;

        // highlight this as correct answer
        $this.find('.quiz-answer.active').addClass('correct');
      }
      else {
        $this.find('.quiz-answer[data-quiz-answer="'+correctAnswer+'"]').addClass('correct');
        $this.find('.quiz-answer.active').addClass('incorrect');
      }
    });
  }

  this._isComplete = function(){
    var answersComplete = 0;
    $('ul[data-quiz-question]').each(function(){
      if ( $(this).find('.quiz-answer.active').length ) {
        answersComplete++;
      }
    });
    if ( answersComplete >= 6 ) {
      return true;
    }
    else {
      return false;
    }
  }

  this._showResult = function(result){
    $('.quiz-result').addClass(result.code).html(result.text);
  }

  this._bindEvents = function(){
    $('.quiz-answer').on('click', function(){
      var $this = $(this),
          $answers = $this.closest('ul[data-quiz-question]');
          q = $answers.data('quizQuestion');
      self._pickAnswer($this, $answers);
      if ( self._isComplete() ) {

        // scroll to answer section
        $('html, body').animate({
          scrollTop: $('.quiz-result').offset().top
        });

        self._showResult( self._calcResult() );
        $('.quiz-answer').off('click');

      }
    });
  }
}
var quiz = new Quiz();
quiz.init();
