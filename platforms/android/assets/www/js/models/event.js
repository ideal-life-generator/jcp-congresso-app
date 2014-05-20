/**
 * Location event.
 * DB Properties:
 * @property {string} event_name
 * @property {string} start_date
 * @property {string} end_date
 * @property {string} location
 *
 * @property {string} isPublic FIXME!
 *
 * Custom properties:
 * @property {string} formatted_date
 * @property {string} start_hour
 * @property {string} end_hour
 */
App.Models.Event = Backbone.Model.extend({
	urlRoot : App.homeUrl + '/events',
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
    },

	/**
	 * Overwrite the native toJSON to enable date formatting
	 */
	toJSON: function () {
		var json = Backbone.Model.prototype.toJSON.call(this);

		var start = moment(this.get('startDate'));
		var end = moment(this.get('endDate'));

		json.formatted_date = start.calendar();
		json.start_hour = start.format('HH:mm');
		json.end_hour = end.format('HH:mm');
		return json;
	}
});