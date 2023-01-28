$(function(){

  $('.format-number').change(function(){

    var format_before = $(this).val();

    var format_before = format_before.replace('-','');

    var format_after = format_before.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){ return String.fromCharCode(s.charCodeAt(0)-0xFEE0) });

    if(format_after.length === 11){
      $(this).val(format_after.substr(0,3) + '-' +format_after.substr(3,4) + '-' + format_after.substr(7,4));
    }else{
      $(this).val(format_after);
    }
  });
});
