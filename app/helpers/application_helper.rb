module ApplicationHelper
	include SessionsHelper

	def field_class(resource, field_name)
		# byebug
		if resource.errors[field_name].present?
			return "has-error".html_safe
		else
			return "".html_safe
		end
	end

	# Displays object errors
	def form_errors_for(object=nil)
	  render('layouts/form_errors', object: object) unless object.blank?
	end

	def errors_from_json(json)
		error_message = ""
		json.each do |field, messages|
			error_message += "#{field} "
			messages.each do |message|
				error_message += "#{message}, "
			end
			error_message += "\n"
		end

		return error_message
	end

end
