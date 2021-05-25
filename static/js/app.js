// Global variable(s)
const dropdown = d3.select('#selDataset');

function demo(subjectID) {
  console.log(`- demo function called. Subject: ${subjectID}`);
  d3.json("static/data/samples.json").then((data) => {
    var metadata = data.metadata;
    var results = metadata.filter(sbj_demo => sbj_demo.id == subjectID);
    var default_result = results[0];
    var panel = d3.select('#sample-metadata');
    panel.html('');
    Object.entries(default_result).forEach(([key,value]) => {
      panel.append('h6').text(`${key.toUpperCase()}: ${value}`);
    });
  });
  console.log('- demo function completed');
}

function build_charts(subjectID) {
  console.log(`- build_charts function called. Subject: ${subjectID}`);
  d3.json("static/data/samples.json").then((data) => {
    var samples = data.samples;
    var results = samples.filter(sbj_demo => sbj_demo.id == subjectID);
    var default_result = results[0];
    var otu_ids = default_result.otu_ids;
    var otu_labels = default_result.otu_labels;
    var sample_values = default_result.sample_values;
  });
  console.log('- build_charts function completed');
}

function init() {
  console.log('Init function called');
  d3.json("static/data/samples.json").then((data) => {
    var names = data.names;
    names.forEach((subject) => {
      dropdown.append('option').text(subject).property('value', subject);
    });
    // Default to 1st sample ID
    var def_subject = names[0];
    // Populate Demographic Info
    demo(def_subject);
    // Populate Bar Chart, Bubble Chart, & Gauge Chart
    build_charts(def_subject);
    console.log('Init function completed');

  });
}

function optionChanged(subjectID) {
  console.log(`optionChanged function called. Subject: ${subjectID}`)
  // Update Demographic Info
  demo(subjectID);
  // Update Bar Chart, Bubble Chart, & Gauge Chart
  build_charts(subjectID);
  console.log('optionChanged function completed');
}

init();