$(document).ready(function() {
  var href = window.location.href,
      hrefArray = href.split('/'),
      componentName = hrefArray[hrefArray.length-1],
      marginLeft = 0;
      if(componentName == 'login' || componentName == 'sign-up') {
        $('.buttons_holder').hide();
        if(componentName == 'sign-up') {
          marginLeft = -25;
        } else {
          marginLeft = 25;
        }
        $('#box').css({'margin-left': marginLeft+'%', 'z-index': -1});
      }
      if(componentName == 'dashboard' && $('.dashboard-wrap').attr('data-user')) {
        console.log($('.dashboard-wrap').attr('data-user'));
        $('#box').hide();
        $('.buttons_holder').hide();

      } else {
         window.location.href = href.replace(componentName, '');
      }


});
$(window).on('ready load change', function() {

$('.auth_wrap .input__field').focusin(function(){
    $(this).css({'transform': 'translate3d(100%, 0, 0)'});
    $(this).siblings().css({'transform': 'translate3d(100%, 0, 0)', 'opacity': 0});
  });
  $('.auth_wrap .input__field').focusout(function(){
    if($(this).val() !== '') {
      $(this).css({'transform': 'translate3d(100%, 0, 0)'});
      $(this).siblings().css({'opacity': 0});
    } else {
      $(this).css({'transform': 'translate3d(0, 0, 0)'});
      $(this).siblings().css({'transform': 'translate3d(0, 0, 0)', 'opacity': 1});
    }
  });
  $('h1').insertBefore($('.left-vertical-tabs'));
});
