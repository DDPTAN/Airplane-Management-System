# Copyright (c) 2024, BroCode and contributors
# For license information, please see license.txt

import random
import string
import frappe
from frappe.model.document import Document

class AirplaneTicket(Document):
    # def generate_seat(self):
    #     seat_number = random.randint(1,100)
    #     seat_letter = random.choice(string.ascii_uppercase[:5])
    #     self.seat = f"{seat_number}{seat_letter}"
    
    def before_submit(self):
        if self.status != "Boarded":
            frappe.throw("You can not submit ticket, ticket status must be boarded.")
    
    def before_save(self):
        self.cal_total_amount()
        
        # Set status to Boarded
        self.status = "Boarded"
        
        # Flight Class 
        if self.flight_class == "Business Class":
            self.flight_price *= 2
        elif self.flight_class == "First Class":
            self.flight_price *= 5

    def validate(self):
        unique_data = set()
        filtered_res = []
        for item in self.add_ons:
            if item.get('item') not in unique_data:
                filtered_res.append(item)
                unique_data.add(item.get('item'))
        self.set('add_ons', filtered_res)

    def cal_total_amount(self):
        # Calculate flight price based on class
        base_price = float(self.flight_price)
        if self.flight_class == "Business Class":
            base_price *= 2
        elif self.flight_class == "First Class":
            base_price *= 5

        # Calculate total amount of add-ons
        total_amount_add_ons = sum(add_on.amount for add_on in self.add_ons)
        
        # Set the total amount
        self.total_amount = total_amount_add_ons + base_price

    # def after_submit(self):
    #     self.booking_ticket_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    #     self.save()
