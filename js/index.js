var numbers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var totalConcreteExperience = 0;
var totalReflectiveObservation = 0;
var totalAbstractConceptualization = 0;
var totalActiveExperimentation = 0;
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

  this._calcResult = function(){ //count up rankings for each category
    $('ul[data-quiz-question]').each(function(i){
      var $this = $(this),
          chosenAnswer1 = $this.find('.quiz-answer.active1').data('quiz-answer'),
          chosenAnswer2 = $this.find('.quiz-answer.active2').data('quiz-answer'),
          chosenAnswer3 = $this.find('.quiz-answer.active3').data('quiz-answer'),
          chosenAnswer4 = $this.find('.quiz-answer.active4').data('quiz-answer');

      if (chosenAnswer1.localeCompare("CE") == 0) {
        totalConcreteExperience += 4;
      } else if (chosenAnswer1.localeCompare("RO")==0) {
        totalReflectiveObservation += 4;
      } else if (chosenAnswer1.localeCompare("AC")==0) {
        totalAbstractConceptualization += 4;
      } else if (chosenAnswer1.localeCompare("AE")==0) {
        totalActiveExperimentation += 4;
      }

      if (chosenAnswer2.localeCompare("CE") == 0) {
        totalConcreteExperience += 3;
      } else if (chosenAnswer2.localeCompare("RO")==0) {
        totalReflectiveObservation += 3;
      } else if (chosenAnswer2.localeCompare("AC")==0) {
        totalAbstractConceptualization += 3;
      } else if (chosenAnswer2.localeCompare("AE")==0) {
        totalActiveExperimentation += 3;
      }

      if (chosenAnswer3.localeCompare("CE") == 0) {
        totalConcreteExperience += 2;
      } else if (chosenAnswer3.localeCompare("RO")==0) {
        totalReflectiveObservation += 2;
      } else if (chosenAnswer3.localeCompare("AC")==0) {
        totalAbstractConceptualization += 2;
      } else if (chosenAnswer3.localeCompare("AE")==0) {
        totalActiveExperimentation += 2;
      }

      if (chosenAnswer4.localeCompare("CE") == 0) {
        totalConcreteExperience += 1;
      } else if (chosenAnswer4.localeCompare("RO")==0) {
        totalReflectiveObservation += 1;
      } else if (chosenAnswer4.localeCompare("AC")==0) {
        totalAbstractConceptualization += 1;
      } else if (chosenAnswer4.localeCompare("AE")==0) {
        totalActiveExperimentation += 1;
      }
      return "hi";
    });
  } //end calc result function

  this._isComplete = function(){
    var i;
    var answersComplete = 0;

    for  (i=0; i<numbers.length; i++){
      if(numbers[i]==4){
        answersComplete++;
      }
    }

    if ( answersComplete >= 10 ) {
      return true;
    }
    else {
      return false;
    }
  }

  this._showResult = function(result){
    $('.quiz-result').html("Concrete Experience:" + totalConcreteExperience + ", Reflective Observation:" + totalReflectiveObservation +
  ", Abstract Conceptualization:" + totalAbstractConceptualization + ", Active Experimentation:" + totalActiveExperimentation);
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

        self._showResult( self._calcResult() ); //
        $('.quiz-answer').off('click');
      }
    });
  }
}
var quiz = new Quiz();
quiz.init();
