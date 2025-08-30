import jsPDF from "jspdf";

export const Printbill=(obj)=>{
    let totalRows=0
    const Mode=obj.mode
    obj.orders.forEach((v,i)=>{
        console.log(v) 
        console.log(i)
    totalRows=totalRows+1})
    const shopName = "RELAX INN";
    const shopAddress1 = "01 Pratapgarh CHITTORGARH";
    const shopAddress2 = "MAIN ROAD Pratapgarh Rajasthan";
    const shopAddress3 = "312605";
    const GST="08FGFPP0032R122"
  const billDate = new Date().toLocaleString();
const rowHeight = 6;

const headerFooterHeight = 80;
const billHeight = headerFooterHeight + (rowHeight * totalRows);
  
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [80,billHeight], // 80mm width
    });

    // ===== HEADER =====
    doc.setFontSize(12);
    doc.text(shopName, 35, 10, { align: "center" });
    doc.setFontSize(9);
    doc.text(shopAddress1, 35, 15, { align: "center" })
     doc.text(shopAddress2, 35, 20, { align: "center" })
      doc.text(shopAddress3, 35, 25, { align: "center" })
       doc.text(`GSTIN:${GST}`, 35, 30, { align: "center" })
    doc.text(`Date: ${billDate} Mode:${Mode}`,37, 35, {align:"center"})
    doc.text(`cashier Bhavesh Billno :- 6643`, 35, 40, { align: "center" });

    // ===== TABLE HEADER =====
    let startY = 50;
    doc.setFontSize(8);
    doc.setLineWidth(0.2);
    doc.line(5, startY - 5, 75, startY - 5); // top line

    // Columns: Sr No, Price, Bathrooms, Total Amount
    
    doc.text("Name", 5, startY);
    doc.text("Qty", 35, startY);
    doc.text("Price", 44, startY);
    doc.text("Sub-Total", 54, startY);
    doc.line(5, startY + 1, 75, startY + 1); // line under header

    // ===== TABLE ROWS =====
    let y = startY + 6;
    let grandTotal = 0;

 obj.orders.forEach((item) => {
      const total = Number(item.total);
      grandTotal += total;

      doc.text(String(item.name), 5, y)// Sr No
      doc.text(String(item.qty), 35, y) // Price
      doc.text(String(item.price), 44, y) // Bathrooms
      doc.text(String(item.total), 54, y) // Bathrooms
      y += 6;

      // New Page if height exceeds
      // if (y > 190) {
      //   doc.addPage([80, 200]);
      //   y = 10;
      // }
    });

    // ===== FOOTER =====
    doc.line(5, y + 2, 75, y + 2); // line before grand total
    doc.setFontSize(10);
    doc.text(`Grand Total:Rs ${grandTotal}`, 25, y + 8)
    doc.line(5, y + 10, 75, y + 10); // line after grand total
doc.text("!!! Thank you for visiting Relax INN !!!",5,y+14)
    // ===== PRINT =====
    window.open(doc.output("bloburl"), "_blank").print();
  };

