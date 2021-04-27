function demo(subject) {
  d3.json("static/data/samples.json").then((data) => {
    var metadata = data.metadata;
    var results = metadata.filter(sbj_demo => sbj_demo.id == subject);
    var default_result = results[0];
    var panel = d3.select('#sample-metadata');
    panel.html('');
    Object.entries(default_result).forEach(([key,value]) => {
      panel.append('h6').text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

function build_charts(subject) {
  d3.json("static/data/samples.json").then((data) => {
    var samples = data.samples;
    var results = samples.filter(sbj_demo => sbj_demo.id == subject);
    var default_result = results[0];
    var otu_ids = default_result.otu_ids;
    var otu_labels = default_result.otu_labels;
    var sample_values = default_result.sample_values;
    


}

function init() {
  var dropdown = d3.select('#selDataset');
  d3.json("static/data/samples.json").then((data) => {
    var names = data.names;
    names.forEach((subject) => {
      dropdown.append('option').text(subject).property('value', subject);
    });
    var def_subject = names[0];
    // call functions to build charts and panel
    demo(def_subject);
  });
}

init();

  // Pull array of sample ids
  // const sample_ids = console.log(data.samples.map(sample => sample.id));
  
  // d3.select('#selDataset').selectAll('option').data(sample_ids);

  // options.enter()
  //   .append('option')
  //   .attr('value', function(d) {
  //     return d.value;
  //   })
  //   .text(function(d) {
  //     return d.text;
  //   });

  // console.log(sample_ids.indexOf('940'))









// 
// const file_path = 'static/data/samples.json'



    // data.array.forEach(element => {
    //   // element.samples
      
    // console.log(element.samples);
    // });

 





// Populate dropdown list: selDataset
// d3.select("#selDataset")

// sample-metadata
// bar
// gauge
// bubble