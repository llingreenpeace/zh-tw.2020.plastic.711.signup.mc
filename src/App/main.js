import './main.scss'
const ProgressBar = require('progressbar.js')
const {$, dataLayer, currency} = window


$(document).ready(function() {
    //console.log( "ready!" );
    initProgressBar();
    createYearOptions()
    initForm();
    init();
});

async function initProgressBar() {

    let goal = document.querySelector('input[name="numSignupTarget"]') ? parseInt(document.querySelector('input[name="numSignupTarget"]').value, 10) : 0;
    let count = document.querySelector('input[name="numResponses"]') ? parseInt(document.querySelector('input[name="numResponses"]').value, 10) : 0;    
	
	if (isNaN(count) || count < 17900)
		count += 17900;
	if (isNaN(goal) || goal < 20000)
		goal = 20000;
    if (count > goal)
		goal = Math.ceil(count / 10000) * 10000;
        
    $('#petition-goal').html(currency(goal, { precision: 0, separator: ',' }).format());
    $('#petition-count').html(currency(count, { precision: 0, separator: ',' }).format());
  
    let percent = count / goal;

    let bar = new ProgressBar.Line('#progress-bar', {
        strokeWidth: 3,
        easing: 'easeInOut',
        duration: 1400,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {width: '100%', height: '100%'}
    });
    // console.log(percent)
    bar.animate(percent);
}

/**
 * Send the tracking event to the ga
 * @param  {string} eventLabel The ga trakcing name, normally it will be the short campaign name. ex 2019-plastic_retailer
 * @param  {[type]} eventValue Could be empty
 * @return {[type]}            [description]
 */
const sendPetitionTracking = (eventLabel, eventValue) => {
	window.dataLayer = window.dataLayer || [];

	window.dataLayer.push({
	    'event': 'gaEvent',
	    'eventCategory': 'petitions',
	    'eventAction': 'signup',
	    'eventLabel': eventLabel,
	    'eventValue' : eventValue
	});

	window.dataLayer.push({
	    'event': 'fbqEvent',
	    'contentName': eventLabel,
	    'contentCategory': 'Petition Signup'
	});

	window.uetq = window.uetq || [];  
	window.uetq.push ('event', 'signup', {'event_category': 'petitions', 'event_label': eventLabel, 'event_value': 0});
}

function createYearOptions() {
    let currYear = new Date().getFullYear()
    $("#fake_supporter_birthYear").append(`<option value="">出生年份</option>`);
    for (var i = 0; i < 80; i++) {
        let option = `<option value="${currYear-i}-01-01">${currYear-i}</option>`

        $("#fake_supporter_birthYear").append(option);
        $('#en__field_supporter_NOT_TAGGED_6').append(option);
    }
}

const resolveEnPagePetitionStatus = () => {
	let status = "FRESH";
	// console.log(window);
	if (window.pageJson.pageNumber === 2) {
		status = "SUCC"; // succ page
	} else {
		status = "FRESH"; // start page
	}

	return status;
};

/**
 * Switch to the page
 * @param  {int} pageNo 1 or 2
 */
const changeToPage = (pageNo) => {
	if (pageNo===1) {
		$(".page-2").hide();
	} else if (pageNo===2) {
		$('.page-1').hide();
		$('.page-2').show();
		
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});

		$('#email-content').hide();
		$('#counter-section').hide();
		$('#services').hide();
		$('#contact').hide();

		// console.log("go to thank you page", redirectDonateLink)
		// window.location.href = redirectDonateLink;
	} else {
		throw new Error("Unkonw PageNo:"+pageNo)
	}
}

/**
 * Show the full page loading
 */
const showFullPageLoading = () => {
	if ($("#page-loading").length===0) {
		$("body").append(
			`<div id="page-loading" class="hide">
			  <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
			</div>`)
	}

	setTimeout(() => { // to enable the transition
		$("#page-loading").removeClass("hide")
	}, 0)
}

/**
 * Hide the full page loading
 */
const hideFullPageLoading = () => {
	$("#page-loading").addClass("hide")

	setTimeout(() => {
		$("#page-loading").remove()
	}, 1100)
}

const initForm = () => {
    //console.log('init form')

    $('#center_sign-submit').click(function(e){
        e.preventDefault();
        $("#fake-form").submit();
        //console.log("fake-form submitting")
    }).end()

    $.validator.addMethod( //override email with django email validator regex - fringe cases: "user@admin.state.in..us" or "name@website.a"
        'email',
        function(value, element){
            return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/i.test(value);
        },
        'Email 格式錯誤'
    );

    $.validator.addMethod(
        "taiwan-phone",
        function (value, element) {            
            const phoneReg6 = new RegExp(/^(0|886|\+886)?(9\d{8})$/).test(value);
			const phoneReg7 = new RegExp(/^(0|886|\+886){1}[2-8]-?\d{6,8}$/).test(value);

            if ($('#fake_supporter_phone').val()) {
                return (phoneReg6 || phoneReg7);
            }
            //console.log('phone testing');
            return true;
        },
        "電話格式不正確，請只輸入數字 0912345678 和 02-23456789")

    $.validator.addClassRules({ // connect it to a css class
        "email": {email: true},
        "taiwan-phone" : { "taiwan-phone" : true }
    });

    $("#fake-form").validate({
        errorPlacement: function(error, element) {
            //console.log(error)
            element.parents("div.form-field:first").after( error );
        },
        submitHandler: function(form) {
            showFullPageLoading();	
     
            // mc forms
			$('#mc-form [name="FirstName"]').val($('#fake_supporter_firstName').val());
			$('#mc-form [name="LastName"]').val($('#fake_supporter_lastName').val());
			$('#mc-form [name="Email"]').val($('#fake_supporter_emailAddress').val());

			if (!$('#fake_supporter_phone').prop('required') && !$('#fake_supporter_phone').val()) {
			 	$('#mc-form [name="MobilePhone"]').val('0900000000');
			} else {
			 	$('#mc-form [name="MobilePhone"]').val($('#fake_supporter_phone').val());
			}
			$('#mc-form [name="Birthdate"]').val($('#fake_supporter_birthYear').val());
			
			$('#mc-form [name="OptIn"]').eq(0).prop("checked", $('#fake_optin').prop('checked')); 
			
			// collect values in the mc form
			let formData = new FormData();
			$("#mc-form input").each(function (idx, el) {
				let v = null
				if (el.type==="checkbox") {
					v = el.checked
				} else {
					v = el.value
				}

				formData.append(el.name, v)
				//console.log("Use", el.name, v)
			});
            
            // send the request			
			let postUrl = $("#mc-form").prop("action");
			fetch(postUrl, {
				method: 'POST',
				body: formData
			})
			.then(response => response.json())
			.then(response => {
				//console.log('fetch response', response);
				if (response) {
					//console.log('response Supporter', response.Supporter);
					if (response.Supporter) { // ok, go to next page
						sendPetitionTracking("2020-plastic_retailer_seveneleven");
					}
                    changeToPage(2);					
			  	} else {
					showSubmittedError();
				}
				hideFullPageLoading();
			})
			.catch(error => {
				hideFullPageLoading();
				showSubmittedError();
				console.error(error);
			});                        
        },
        invalidHandler: function(event, validator) {
            // 'this' refers to the form
            var errors = validator.numberOfInvalids();
            if (errors) {
                console.log(errors);
            }
        }
    });

    //email suggestion
	// for email correctness
	let domains = [
		"me.com",
		"outlook.com",
		"netvigator.com",
		"cloud.com",
		"live.hk",
		"msn.com",
		"gmail.com",
		"hotmail.com",
		"ymail.com",
		"yahoo.com",
		"yahoo.com.tw",
		"yahoo.com.hk"
	];
	let topLevelDomains = ["com", "net", "org"];

	var Mailcheck = require('mailcheck');
	//console.log(Mailcheck);
	$("#fake_supporter_emailAddress").on('blur', function() {
		//console.log('center_email on blur - ',  $("#center_email").val());		
		Mailcheck.run({
			email: $("#fake_supporter_emailAddress").val(),
			domains: domains, // optional
			topLevelDomains: topLevelDomains, // optional
			suggested: (suggestion) => {
                $(`<div class="email-suggestion">您想輸入的是 <strong id="emailSuggestion">${suggestion.full}</strong> 嗎？</div>`).insertAfter("#fake_supporter_emailAddress");
				//$('#emailSuggestion').html(suggestion.full);
				//$('.email-suggestion').show();
                
                $(".email-suggestion").click(function() {
                    $("#fake_supporter_emailAddress").val($('#emailSuggestion').html());
                    $('.email-suggestion').remove();
                });
			},
			empty: () => {
				this.emailSuggestion = null
			}
		});
	});
    
    //隱藏dd頁面的捐款按鈕
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get('utm_source') === "dd") {
		$('.is-hidden-at-dd-page-only').hide();
				
		$('#fake_supporter_phone').removeAttr("required"); //移除電話欄位 required Attr
    }
}

/**
 * Show the submitted error message 
 */
const showSubmittedError = () => {
	if ($("#submitted-error").length === 0) {
		$("body").append(`<div id="submitted-error">抱歉，連署時發生問題，請稍後再嘗試</div>`);		
	}
	
	$("#submitted-error").click(function() {
		$('#submitted-error').remove();
	});
}

function init () {
    
    const EN_PAGE_STATUS = resolveEnPagePetitionStatus()
	// console.log("EN_PAGE_STATUS", EN_PAGE_STATUS)
	if (EN_PAGE_STATUS==="FRESH") {
    
        $(".page-2").hide();

	} else if (EN_PAGE_STATUS==="SUCC") {
        
        $('.page-1').hide();
        $('.page-2').show();
        $("section").hide();
        $("#home").show();
	}
}
