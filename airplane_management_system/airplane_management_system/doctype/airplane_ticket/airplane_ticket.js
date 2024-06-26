frappe.ui.form.on("Airplane Ticket", {
    flight_class(frm) {
        update_flight_price_based_on_class(frm);
    },
    flight_price(frm) {
        calculate_total_amount(frm);
    },
    refresh(frm) {
        update_flight_price_based_on_class(frm);
        calculate_total_amount(frm);
    }
});

frappe.ui.form.on("Airplane Ticket Add-on Item", {
    amount(frm) {
        calculate_total_amount(frm);
    }
});

// function update_flight_price_based_on_class(frm) {
//     let base_price =  frm.doc.flight_price;

//     if (frm.doc.flight_class === "Business Class") {
//         base_price *= 2;
//     } else if (frm.doc.flight_class === "First Class") {
//         base_price *= 5;
//     }

//     frm.set_value("flight_price", base_price);
//     calculate_total_amount(frm);
// }

function calculate_total_amount(frm) {
    let total_amount = frm.doc.flight_price;
    for (let item of frm.doc.add_ons) {
        total_amount += item.amount;
    }
    frm.set_value("total_amount", total_amount);
}
