frappe.ui.form.on("Airplane Ticket", {
    flight_price(frm)
    {
        let total_amount =frm.doc.flight_price
        for(let item of frm.doc.add_ons)
        {
            total_amount+= item.amount
        }
        frm.set_value("total_amount" ,total_amount) 
    }
});


frappe.ui.form.on("Airplane Ticket Add-on Item", {
	 

    amount(frm,cdt,cdn)
    {
        let total_amount =frm.doc.flight_price
        for(let item of frm.doc.add_ons)
        {
            total_amount+= item.amount
        }
        frm.set_value("total_amount" ,total_amount) 
    },
});