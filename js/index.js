var numbers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var totalConcreteExperience = 0;
var totalReflectiveObservation = 0;
var totalAbstractConceptualization = 0;
var totalActiveExperimentation = 0;
var q = 0;
var w;

var Quiz = function(){
  var self = this;
  $(".radarChart").hide(); //initialize radarchart to hidden
  $(".quiz-result").hide(); //initialize radarchart to hidden
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
    $('.radarChart').show();


    $('.ROScore').html(totalReflectiveObservation);
    $('.CEScore').html(totalConcreteExperience);
    $('.ACScore').html(totalAbstractConceptualization);
    $('.AEScore').html(totalActiveExperimentation);
    $('.quiz-result').show();

    //////////////////////////////////////////////////////////////
    //////////////////////// Set-Up //////////////////////////////
    //////////////////////////////////////////////////////////////
    var margin = {top: 100, right: 100, bottom: 100, left: 100},
      width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
      height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

    //////////////////////////////////////////////////////////////
    ////////////////////////// Data //////////////////////////////
    //////////////////////////////////////////////////////////////
    var data = [
          [//iPhone
          {axis:"Concrete Experience",value:totalConcreteExperience/100.00},
          {axis:"Reflective Observation",value:totalReflectiveObservation/100.00},
          {axis:"Abstract Conceptualization",value:totalAbstractConceptualization/100.00},
          {axis:"Active Experimentation",value:totalActiveExperimentation/100.00}
        ]];
    //////////////////////////////////////////////////////////////
    //////////////////// Draw the Chart //////////////////////////
    //////////////////////////////////////////////////////////////
    var color = d3.scale.ordinal()
      .range(["#00A0B0"]);

    var radarChartOptions = {
      w: width,
      h: height,
      margin: margin,
      maxValue: 0.5,
      levels: 5,
      roundStrokes: true,
      color: color
    };
    //Call function to draw the Radar chart
    RadarChart(".radarChart", data, radarChartOptions);

    //Present the quiz taker with what their data means about their learning stylesheet

  /*  Concrete Experience (CE) -- A CE orientation focuses on being involved in experiences and dealing
with immediate human situations in a personal way. It emphasizes feeling more than thinking; a
concern with the uniqueness and complexity of present reality over theories and generalizations; and
intuitive, "artistic" approach over a systematic, scientific approach to problems.

Reflective Observation (RO) -- An RO orientation focuses on understanding the meaning of ideas
and situations by carefully observing and describing them. It emphasizes reflection and
understanding over action and practical application; a concern with what is true or how things happen
over what will work.

Abstract Conceptualization (AC) -- An AC orientation focuses on using logic, ideas, and concepts.
It emphasizes thinking rather than feeling; a concern with building general theories rather than
intuitively understanding unique, specific areas; a scientific more than an artistic approach to
problems.

Active Experimentation (AE) -- An AE orientation focuses on actively influencing people and
changing situations. It emphasizes practical applications as distinct from reflective understanding; a
pragmatic concern with what works rather than with what is absolute truth; an emphasis on doing,
more than observing. */


  }

  this._bindEvents = function(){
    $('.quiz-answer').on('click', function(){
      var $this = $(this),
          $answers = $this.closest('ul[data-quiz-question]');
          q = $answers.data('quizQuestion');
      self._pickAnswer($this, $answers);

      if ( self._isComplete() ) {
        self._showResult( self._calcResult() ); // reveal results for quiz
        $('.quiz-answer').off('click');

        $('html, body').animate({
          scrollTop: $('.radarChart').offset().top
        });
      } else {
          $(".radarChart").hide(); //hide radarchart if quiz isn't complete
          $(".quiz-result").hide(); //hide radarchart if quiz isn't complete
      }
    });
  }
}
var quiz = new Quiz();
quiz.init();
