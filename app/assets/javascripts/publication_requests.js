$(document).ready(function() {
  $.fn.editable.defaults.mode = 'inline';
  $.fn.editable.defaults.send = 'always';
  $.fn.editable.defaults.ajaxOptions = {type: "PUT"};

  $(".editable-field#event-field").editable({
    display: function(value) {
      $(this).text(value);
      $(this).append('<span class="glyphicon glyphicon-pencil overlay-icon"></span>')
    },
    success: function(response, newValue) {
        $(".page-header h1").html(newValue);
    }

  });

  $(".editable-field#dimen-field").editable({
    display: function(value) {
      $(this).text(value);
      $(this).append('<span class="glyphicon glyphicon-pencil overlay-icon"></span>')
    },
    success: function(response, newValue) {

    }
  });

  $(".editable-field#descr-field").editable({

  });

  $(".editable-field#designer-field").editable({
    display: function(value, sourceData) {
      $(this).text($.fn.editableutils.itemsByValue(value, sourceData)[0].text);
      $(this).append('<span class="glyphicon glyphicon-pencil overlay-icon"></span>')
    }
  });

  $(".editable-field#reviewer-field").editable({
    display: function(value, sourceData) {
      $(this).text($.fn.editableutils.itemsByValue(value, sourceData)[0].text);
      $(this).append('<span class="glyphicon glyphicon-pencil overlay-icon"></span>')
    }
  })

});
