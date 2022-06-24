<script>
    import Chart from 'svelte-frappe-charts';
  
    let data = {
      labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
      datasets: [
        {
            name: "some Data", type: "line",
            values: [10, 12, 3, 9, 8, 15, 9]
        }
      ]
    };
  </script>
  
  <Chart data={data} />