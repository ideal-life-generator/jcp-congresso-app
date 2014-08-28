atea = angular.module('atea');

atea.provider("local", function() {
	var self = this;
	var text = {
	"menu": "Meny",
	"home": "Hjem",
	"login": "Logg inn",
	"logout": "Logg ut",
	"share_on": "Del på",
	"my_profile": "Min profil",
	"edit": "Rediger",
	"forgot_password": "Glemt passord?",
	"email_palceholer": "Epost",
	"password_palceholer": "Passord",
	"submit": "Send inn",
	"months": [ "Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember" ],
	"days": [ "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag" ],
	"tokens_val": "%{smart_count} token |||| %{smart_count} tokens",
	"upcoming_events": "Kommende arrangementer",
	"previous_events": "Tidligere arrangementer",
	"register": "Registrer",
	"schedule": "Agenda",
	"partners": "Partnere",
	"map": "Kart",
	"rate": "Rate",
	"scan": "Scan",
	"community": "Community",
	"rate_session": "Rate sesjoner",
	"partner_filter": "Partner",
	"to_website": "Klikk her for å besøke webside",
	"rate_session": "Rate sesjoner",
	"comments_placeholder": "Kommentarer",
	"comment_category": "Vennligst velg en kategori",
	"perselved_interest": "Generell interesse",
	"perselved_revenue": "Oppfattet inntekt",
	"processing_data": "Vennligst vent",
	"no_connection": "Ingen internettilkobling",
	"form_error": "Vennligst fyll inn alle nødvendige felter",
	"form_error1": "Please fill in all the required fields in the form",
	"tokens_add": "Du har mottatt %{smart_count} token! |||| You have received %{smart_count} tokens!",
	"no_surveys": "Ingen survey tilgjengelig",
	"no_content": "Ingen innhold",
	"select_category": "Velg en kategori",
	"data_sending": "Vennligst vent",
	"message_posted": "Ditt innlegg er publisert",
	"quest_error": "Spørsmålet må inneholde minst 4 tegn",
	"fill_input": "Vennligst fyll inn",
	"error_scaning": "Bruker eksisterer ikke",
	"page_nointernet": "Det finnes ingen internettilkobling for øyeblikket. Vennligst trykk på denne beskjeden for å prøve tilkobling igjen",
	"first_login": "Dette er første gang du har logget inn på dette arrangementet. Derfor mottar du tokens!",
	"log_in": "Vennligst vent, logger inn",
	"incorrect_credentials": "Feil brukernavn/passord",
	"login_message": "Velkommen %{name}!",
	"quest_sent": "Thank you for your message",
	"lead_sent": "Thank you for your lead",
	"user_exist": "User credentials are not valid",
	"survey_placeholder": "Søk",
	"form_saved": "Larget",
	"form_thank": "Thank you for completing the form",
	"form_fill": "Please fill in at least one input",
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