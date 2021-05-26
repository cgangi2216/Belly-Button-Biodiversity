// Global variable(s)
const dropdown = d3.select('#selDataset');

function build_charts(subjectID) {
  console.log(`- build_charts function called. Subject: ${subjectID}`);
  d3.json("static/data/samples.json").then((data) => {

    // Metadata for Demographic Info
    var metadata = data.metadata;
    var metadata_result = metadata.filter(sbj_demo => sbj_demo.id == subjectID);
    var def_metadata_result = metadata_result[0];
    var panel = d3.select('#sample-metadata');
    panel.html('');
    Object.entries(def_metadata_result).forEach(([key, value]) => {
      panel.append('h6').text(`${key.toUpperCase()}: ${value}`);
    });

    // Sample data for charts
    var samples = data.samples;
    var results = samples.filter(sbj_demo => sbj_demo.id == subjectID);

    var results_bar = samples.filter(sbj_demo => sbj_demo.id == subjectID);

    var default_result = results[0];
    var otu_ids = default_result.otu_ids;
    var otu_labels = default_result.otu_labels;
    var sample_values = default_result.sample_values;

    // default_result
    default_results_bar = results_bar[0]
    console.log(default_results_bar)

    // Bar Chart
    var bar_data = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      orientation: 'h',
      type: 'bar'
    }];
    var bar_layout = {
      yaxis: {
        title: {
          text: 'OTU Ids',
        }
      }
    };
    Plotly.newPlot('bar', bar_data, bar_layout);

    // Bubble Chart
    var bubble_data = [
      {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
          size: sample_values,
          color: otu_ids,
          text: otu_labels
        }
      }
    ];
    var bubble_layout = {
      xaxis: {
        title: {
          text: 'OTU Ids',
        }
      }
    };
    Plotly.newPlot('bubble', bubble_data, bubble_layout);

    // Gauge Plot
    var gauge_data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: def_metadata_result.wfreq,
        title: { text: 'Scrubs per Week' },
        type: 'indicator',
        mode: 'gauge+number',
        gauge: {
          axis: { range: [0, 9] },
          bar: { color: "LightGray" },
          steps: [
            { range: [0, 1], color: 'LightBlue' },
            { range: [1, 2], color: 'LightSkyBlue' },
            { range: [2, 3], color: 'DeepSkyBlue' },
            { range: [3, 4], color: 'DodgerBlue' },
            { range: [4, 5], color: 'Blue' },
            { range: [5, 6], color: 'MediumBlue' },
            { range: [6, 7], color: 'DarkBlue' },
            { range: [7, 8], color: 'Navy' },
            { range: [8, 9], color: 'MidnightBlue' }
          ]
        }
      }
    ];
    var gauge_layout = {
      height: 300,
      margin: { t: 0, r: 25, l: 25, b: 0 }
    };
    Plotly.newPlot('gauge', gauge_data, gauge_layout);

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
    // Populate Demographic Info, Bar Chart, Bubble Chart, & Gauge Chart
    build_charts(def_subject);
    console.log('Init function completed');
    console.log('-------------------------------------------------');
  });
}

function optionChanged(subjectID) {
  console.log(`optionChanged function called. Subject: ${subjectID}`)
  // Update Demographic Info, Bar Chart, Bubble Chart, & Gauge Chart
  build_charts(subjectID);
  console.log('optionChanged function completed');
  console.log('-------------------------------------------------');
}

init();