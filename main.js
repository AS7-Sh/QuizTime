$(function () {
    $('div#alert').hide();
    var questions, current;
    $.getJSON('questions.json', function (data) {
        questions = data;
        current = data.questions[0];
    });

    function handleChecking(obj) {
        $('div#alert').remove();
        var $input = $('input:checked');
        if ($input.length === 0) {
            $('div#quiz-section').append("<div id='alert'>Please select an answer.</div>");
        }
        else {
            $('li.false').removeClass('false');
            $('li.true').removeClass('true');
            if (obj.answer == $input.val()) {
                var trueElement = 'li.' + $input.val().toString();
                $(trueElement).addClass('true');
            }
            else {
                var falseElement = 'li.' + $input.val().toString();
                $(falseElement).addClass('false');
                var trueElement = 'li.' + obj.answer;
                $(trueElement).addClass('true');
            }
        }
    }

    function handlePrevious(obj) {
        $('li.false').removeClass('false');
        $('li.true').removeClass('true');
        $('div#alert').remove();
        if (obj.number !== 0) {
            current = questions.questions[obj.number - 1];
            console.log(questions)
            $('article#question p').text(current.question);
            $.each(current.choices, function (key, value) {
                $('li p').eq(key).text(value);
            })
        }
        else {
            $('div#quiz-section').append("<div id='alert'>There's no previous questions</div>");
        }
    }

    function handleNext(obj) {
        $('li.false').removeClass('false');
        $('li.true').removeClass('true');
        $('div#alert').remove();
        if (obj.number + 1 === questions.questions.length)
            $('div#quiz-section').append("<div id='alert'>Sorry, no more questions</div>");

        else {
            current = questions.questions[obj.number + 1];
            $('article#question p').text(current.question);
            $.each(current.choices, function (key, value) {
                $('li p').eq(key).text(value);
            })
        }
    }

    $('section.buttons').on('click', function (event) {
        var buttonName = $(event.target).attr('class');
        event.preventDefault();

        if (buttonName === 'check')
            handleChecking(current);

        if (buttonName === 'prev')
            handlePrevious(current);

        if (buttonName === 'next')
            handleNext(current);
    })
});
