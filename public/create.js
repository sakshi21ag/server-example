document.querySelector("#submit").addEventListener("click", function() {
  const checkedValues = []; //the list of values that will be printed

  //get a list of all the checkboxes that are checked
  const checkedInputs = document.querySelectorAll("input:checked");
  
  checkedInputs.forEach(function(input) {
    checkedValues.push(input.id);
  })

  //print a pdf with all of these things
  const doc = new jsPDF();
  const imagesPerPage = 3;
  let x = 10;
  let y = -70;
  let imageWidth = 170;
  let imageHeight = 80;
  let count = 1;


  for (let i=0; i < checkedValues.length; i++) {
    y += imageHeight;
    var image = document.createElement("img");
    image.src="/images/" + checkedValues[i] + ".jpg"
    doc.addImage(image, "jpg", x, y, imageWidth, imageHeight )
    count++;

    if(count % imagesPerPage === 0) {
      y = -70;
      doc.addPage(); 
    }
  }


  if (doc) doc.save("checklist.pdf");

  
})



