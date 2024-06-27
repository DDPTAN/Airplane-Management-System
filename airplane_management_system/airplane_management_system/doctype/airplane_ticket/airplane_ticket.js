frappe.ui.form.on("Airplane Ticket", {
    flight_price(frm) {
        calculate_total_amount(frm);
    },
    refresh(frm) {
        calculate_total_amount(frm);
    },
    flight_passenger: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        let full_name = `${row.first_name} ${row.last_name}`.trim();
        frappe.model.set_value(cdt, cdn, 'full_name', full_name);
    }
});

frappe.ui.form.on("Airplane Ticket Add-on Item", {
    amount(frm) {
        calculate_total_amount(frm);
    },
    quantity(frm) {
        calculate_total_amount(frm)
    },
    add_ons_remove(frm) {
       calculate_total_amount(frm)
    }
});

frappe.ui.form.on("Flight Passenger", {
    flight_passenger_add(frm) {
        calculate_total_amount(frm);
    },
    flight_passenger_remove(frm) {
        calculate_total_amount(frm);
    }
})

function calculate_total_amount(frm) {
    let total_amount = frm.doc.flight_price;

    let passenger_count = frm.doc.flight_passenger ? frm.doc.flight_passenger.length : 0;
    passenger_count = passenger_count < 1 ? 1 : passenger_count;

    if (passenger_count > 0) {
        total_amount *= passenger_count
    }
    
    for (let item of frm.doc.add_ons) {
        total_amount += (item.amount * item.quantity);
    }

    frm.set_value("total_amount", total_amount);
}
