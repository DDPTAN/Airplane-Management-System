# Copyright (c) 2024, BroCode and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class FlightPassenger(Document):
    def before_save(self):    
        # Passenger Name Validation
        if self.last_name:
            self.full_name = self.first_name + ' ' + self.last_name
        else:
            self.full_name = self.first_name

        self.booking_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
