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
	"submit": "Bekreft",
	"months": [ "Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember" ],
	"days": [ "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag" ],
	"tokens_val": "%{smart_count} token(s) |||| %{smart_count} token(s)",
	"upcoming_events": "Kommende arrangementer",
	"previous_events": "Tidligere arrangementer",
	"register": "Registrer",
	"schedule": "Agenda",
	"partners": "Partnere",
	"map": "Kart",
	"rate": "Rate",
	"scan": "Scan",
	"community": "Community",
	"rate_session": "Rate",
	"partner_filter": "Partner",
	"to_website": "Klikk her for å besøke webside",
	"comments_placeholder": "Skriv her",
	"comment_category": "Vennligst velg en kategori",
	"perselved_interest": "Generell interesse",
	"perselved_revenue": "Oppfattet inntekt",
	"processing_data": "Vennligst vent",
	"no_connection": "Ingen internettilkobling",
	"form_error": "Vennligst fyll inn alle nødvendige felter",
	"form_error1": "Please fill in all the required fields in the form",
	"tokens_add": "Du har mottatt %{smart_count} token(s)! |||| Du har nå fått %{smart_count} token(s)!",
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
	"quest_sent": "Takk!",
	"lead_sent": "Takk",
	"user_exist": "Brukernavnet er feil",
	"survey_placeholder": "Søk",
	"form_saved": "Larget",
	"form_thank": "Takk!",
	"form_fill": "Vennligst fyll inn alle feltene",
	"form_token": "Ved å fylle skjemaet har du mottatt",
	"error_server": "Feilmelding, vennligst prøv igjen",
	"check_scan": "Søke etter barcode",
	"scan_error2": "Brukeren er ikke registrert til arrangementet",
	"scan_warning1": "Du har scannet deg selv",
	"facebookAppId": 179404815469953,
	"twitterShare": "Nyter høstens vakreste IT-eventyr AteaCommunity http://s.atea.no/WYKK96",
	"shareLink": "http://www.atea.no/hovedmeny/atea-community-2014/"
};
	var obj = {
		dynamic: new Polyglot({
			locale: "no",
			phrases: text
		}),
		static: text,
		days: function(number) {
			var now = new Date().toString(),
				date = new Date(date*1000),
				dateString = date.toString();
			if(now.slice(0, 15) === dateString.slice(0, 15)) {
				return "Idag";
			}
			else if(number == 1 || number == 5 || number == 6 || number == 11 || number == 12 || number == 21 || number == 25 || number == 26 || number == 31) {
				return number + "te";
			}
			else if(number == 2 || number == 22 || number == 24) {
				return number + "re";
			}
			else if(number == 3 || number == 23) {
				return number + "je";
			}
			else if(number == 4 || number == 7 || number == 8 || number == 9 || number == 10 || number == 13 || number == 14 || number == 15 || number == 16 || number == 17 || number == 18 || number == 19 || number == 20 || number == 27 || number == 28 || number == 29) {
				return number + "de";
			}
			else if(number == 30) {
				return number + "ti";
			}
		}
	};
	this.$get = function() {
		return obj;
	};
	return this;
});