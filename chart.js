
setTimeout(asd, 1000);

function asd() {
  let keves = document.getElementById("stat6").textContent;
  let tobb = document.getElementById("stat8").textContent;
  let ossz = document.getElementById("stat4").textContent;

console.log(keves+" ezzzzzzzzzz "+tobb);
const data = {
    labels: ["5 betűnél keveseb szavak száma","4 betűnél több szavak száma","szavak száma"],
    
    datasets: [{
      label: 'szavak száma',
      data: [keves, tobb, ossz],
      backgroundColor: [
        '#9FD8F7',
      ],
      borderColor: [
        '#2072ED',
      ],
      borderWidth: 2
      
    }]
  };
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          ticks: {
            stepSize: 1,
          }
        }
      }
    }
    
  };
  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}