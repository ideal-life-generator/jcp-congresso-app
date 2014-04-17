App.Models.Event = Backbone.Model.extend({
	urlRoot : App.homeUrl + '/event',
	defaults: {
		id: '0',
		event_name: 'Community',
        event_alias: "",
        event_code: "",
        start_date: "",
        end_date: "",
        limit: "",
        current_visitors: "",
        location: "",
        ical_start: "",
        ical_end: "",
        closed_text: "",
        is_active: "",
        reg_text: "",
        reg_success_text: "",
        barcode_text: "",
        footer_text: "",
        footer_link: "",
        account_id: "",
        owner_id: "",
        user_id: "",
        form_id: "",
        active_time: "",
        create_time: "",
        update_time: ""
    }
});