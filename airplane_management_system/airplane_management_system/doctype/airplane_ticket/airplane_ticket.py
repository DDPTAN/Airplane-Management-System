# Copyright (c) 2024, BroCode and contributors
# For license information, please see license.txt

import frappe
import random
import string
from frappe.model.document import Document


class AirplaneTicket(Document):
	def generate_seat(self):
		seat_number = random.randint(1,100)
		seat_letter = random.choice(string.ascii_uppercase[:5])
		self.seat = f"{seat_number}{seat_letter}"
