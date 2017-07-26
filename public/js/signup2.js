$(document).ready(function () {
    var navListItems = $('div.setup-panel div a'),
        // allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');
});

function addMore(addType){
    if(addType == "teaching-mode"){
        var len = $('.teaching-mode').length + 1;
        $('<div class="form-group row teaching-mode"><div class="col-xs-12 col-md-3"><label for="teaching-mode'+len+'">Mode Of Teaching</label></div><div class="col-xs-12 col-md-9"><input type="text" class="form-control" id="teaching-mode'+len+'" name="teaching-mode'+len+'" placeholder="Teaching Mode"></div></div>').insertAfter($('.teaching-mode').last());
        $('#mode-count').val(len);
    } else if(addType == 'achievement'){
        var len = $('.achievement').length + 1;
        $('<div class="form-group row achievement"><div class="col-xs-12 col-md-3"><label for="achievement'+len+'">Achievement</label></div><div class="col-xs-12 col-md-9"><input type="text" class="form-control" id="achievement'+len+'" name="acheivement'+len+'" placeholder="Achievement"><br><input type="text" class="form-control" name="acheivement-year'+len+'" placeholder="Year"></div></div>').insertAfter($('.achievement').last());
        $('#achievement-count').val(len);
    } else if(addType == 'experience'){
        var len = $('.experience').length + 1;
        $('<div class="form-group row experience">\
    <div class="col-xs-12 col-md-3">\
        <label for="experience'+len+'">Experience</label>\
      </div>\
      <div class="col-xs-12 col-md-9">\
        <input type="text" class="form-control" name="experience'+len+'" placeholder="Experience Details">\
        <br>\
        <input type="text" class="form-control" name="experience-year'+len+'" placeholder="Year">\
        <br>\
        <input type="text" class="form-control" name="experience-location'+len+'" placeholder="Location">\
      </div>\
    </div>').insertAfter($('.experience').last());
        $('#experience-count').val(len);
    } else if(addType == 'project'){
        var len = $('.project').length + 1;
        $('<div class="form-group row project">\
    <div class="col-xs-12 col-md-3">\
        <label for="project'+len+'">Project</label>\
      </div>\
      <div class="col-xs-12 col-md-9">\
        <input type="text" class="form-control" name="project'+len+'" placeholder="Project Details">\
        <br>\
        <input type="text" class="form-control" name="project-year'+len+'" placeholder="Year">\
        <br>\
        <input type="text" class="form-control" name="project-location'+len+'" placeholder="Location">\
      </div>\
    </div>').insertAfter($('.project').last());
        $('#project-count').val(len);
    }
}
