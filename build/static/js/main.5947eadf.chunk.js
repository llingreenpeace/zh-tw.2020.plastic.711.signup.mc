(this["webpackJsonpgpea-en-62911-zh-tw.2020-plastic-retailer-seveneleven.signup"]=this["webpackJsonpgpea-en-62911-zh-tw.2020-plastic-retailer-seveneleven.signup"]||[]).push([[0],{12:function(e,o,a){"use strict";a.r(o);a(5),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(6);var n=a(7),r=window,t=r.$;r.dataLayer;t(document).ready((function(){console.log("ready!"),new n.Line("#progress-bar",{strokeWidth:3,easing:"easeInOut",duration:1400,color:"#FFEA82",trailColor:"#eee",trailWidth:1,svgStyle:{width:"100%",height:"100%"}}).animate(.15),function(){for(var e=(new Date).getFullYear(),o=0;o<80;o++){var a='<option value="01/01/'.concat(e-o,'">').concat(e-o,"</option>");t("#fake_supporter_birthYear").append(a),t("#en__field_supporter_NOT_TAGGED_6").append(a)}}(),i(),function(){var e=function(){var e="FRESH";e=2===window.pageJson.pageNumber?"SUCC":"FRESH";return e}();"FRESH"===e?t(".page-2").hide():"SUCC"===e&&(t(".page-1").hide(),t(".page-2").show(),t("section").hide(),t("#home").show())}()}));var i=function(){console.log("init form"),t("#center_sign-submit").click((function(e){e.preventDefault(),t("#fake-form").submit(),console.log("fake-form submitting")})).end(),t.validator.addMethod("email",(function(e,o){return this.optional(o)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/i.test(e)}),"Email \u683c\u5f0f\u932f\u8aa4"),t.validator.addMethod("taiwan-phone",(function(e,o){var a=new RegExp(/^(0|886|\+886)?(9\d{8})$/).test(e),n=new RegExp(/^(0|886|\+886){1}[2-8]-?\d{6,8}$/).test(e);return t("#fake_supporter_phone").val()?a||n:(console.log("phone testing"),!0)}),"\u96fb\u8a71\u683c\u5f0f\u4e0d\u6b63\u78ba\uff0c\u8acb\u53ea\u8f38\u5165\u6578\u5b57 0912345678 \u548c 02-23612351"),t.validator.addClassRules({email:{email:!0},"taiwan-phone":{"taiwan-phone":!0}}),t("#fake-form").validate({errorPlacement:function(e,o){console.log(e),o.parents("div.form-field:first").after(e)},submitHandler:function(e){t("#en__field_supporter_firstName").val(t("#fake_supporter_firstName").val()),t("#en__field_supporter_lastName").val(t("#fake_supporter_lastName").val()),t("#en__field_supporter_emailAddress").val(t("#fake_supporter_emailAddress").val()),t("#fake_supporter_phone").prop("required")||t("#fake_supporter_phone").val()?t("#en__field_supporter_phoneNumber").val(t("#fake_supporter_phone").val()):t("#en__field_supporter_phoneNumber").val("0900000000"),t("#en__field_supporter_NOT_TAGGED_6").val(t("#fake_supporter_birthYear").val()),t("#en__field_supporter_questions_7276").val(t("#fake_optin").prop("checked")?"Y":"N"),console.log("en form submit"),t("form.en__component--page").submit()},invalidHandler:function(e,o){var a=o.numberOfInvalids();if(a){console.log(a);t("div.error").show()}else t("div.error").hide()}})};"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},4:function(e,o,a){e.exports=a(12)},5:function(e,o,a){},6:function(e,o,a){}},[[4,1,2]]]);
//# sourceMappingURL=main.5947eadf.chunk.js.map