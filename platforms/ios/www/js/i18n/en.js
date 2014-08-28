atea = angular.module('atea');

atea.provider("local", function() {
	var self = this;
	var text = {
	"menu": "Menu",
	"home": "Home",
	"login": "Login",
	"logout": "Logout",
	"share_on": "Share on",
	"my_profile": "My Profile",
	"edit": "Edit",
	"forgot_password": "Forgot password?",
	"email_palceholer": "Email",
	"password_palceholer": "Password",
	"submit": "Submit",
	"months": [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
	"days": [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
	"tokens_val": "%{smart_count} token |||| %{smart_count} tokens",
	"upcoming_events": "Upcoming events",
	"previous_events": "Previous events",
	"register": "Register",
	"schedule": "Schedule",
	"partners": "Partners",
	"map": "Map",
	"rate": "Rate",
	"scan": "Scan",
	"community": "Community",
	"rate_session": "Rate session",
	"partner_filter": "Partner",
	"to_website": "Click to visit website",
	"rate_session": "Rate session",
	"comments_placeholder": "Send message here...",
	"survey_placeholder": "Find something to rate with name or code",
	"comment_category": "Please, select a category",
	"perselved_interest": "Perselved interest",
	"perselved_revenue": "Perselved revenue",
	"processing_data": "Please wait, processing data",
	"form_saved": "Your form has been saved",
	"form_thank": "Thank you for completing the form",
	"form_fill": "Please fill in at least one input",
	"no_connection": "No Internet connection",
	"form_error": "Form contains errors. Please fix them",
	"form_error1": "Please fill in all the required fields in the form",
	"tokens_add": "You have received %{smart_count} token! |||| You have received %{smart_count} tokens!",
	"no_surveys": "This event has no surveys",
	"no_content": "No content",
	"select_category": "Select a category",
	"data_sending": "Sending data",
	"message_posted": "Your message has been posted",
	"quest_sent": "Thank you for your message",
	"lead_sent": "Thank you for your lead",
	"quest_error": "Text should be at least 16 chars long",
	"fill_input": "Please fill in the input",
	"error_scaning": "User doesn't exist",
	"page_nointernet": "No internet connection is available at the moment. Please, click this message to try to connect again",
	"first_login": "This is the first time you've logged in to this event. You are about to receive tokens!",
	"log_in": "Please wait, logging in",
	"user_exist": "User credentials are not valid",
	"incorrect_credentials": "Incorrect credentials",
	"login_message": "Welcome %{name}!",
	"form_token": "By filling this form you'll receive",
	"error_server": "Error on server",
	"check_scan": "Looking up barcode",
	"scan_error2": "User is not registered for current event",
	"scan_warning1": "You have scanned yourself :)"
			};
	var obj = {
		dynamic: new Polyglot({
			locale: "en",
			phrases: text
		}),
		static: text
	};
	this.$get = function() {
		return obj;
	};
	return this;
});