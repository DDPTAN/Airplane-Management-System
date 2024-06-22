# Copyright (c) 2024, BroCode and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class AirplaneFlight(Document):
	def before_submit(self):
		self.status = "Completed"
	
	@frappe.whitelist()
	def set_flight_status(self):
		flight = frappe.get_doc("Airplane Flight",)
		flight.status = "Completed"
		flight.save()

