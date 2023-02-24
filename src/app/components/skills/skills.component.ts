import { Component } from '@angular/core';
import Chart from 'chart.js/auto'

@Component({
  selector: 'skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  public chartSoft: any;
  public chartHard: any;

  createChart(){

    const dataSoft = {
      labels: [
        'Adaptabilidad',
        'Constancia',
        'Curiosidad',
        'Dinamismo',
        'Planificacion',
        'Comunicacion'
      ],
      datasets: [{
        label: 'Soft Skills',
        data: [85, 82, 90, 84, 72, 78],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: '#D91E0D',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }]
    };

    const dataHard = {
      labels: [
        'HTML5',
        'Css',
        'Js',
        'React',
        'Angular',
        'DevOps',
      ],
      datasets: [{
        label: 'Hard Skills',
        data: [90, 87, 70, 68, 60, 40],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: '#D91E0D',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }]
    };
  
    this.chartSoft = new Chart("soft", {
        type: 'radar',
        data: dataSoft,
        options: {
          elements: {
            line: {
              borderWidth: 2
            }
          }
        },
      
    });

    this.chartHard = new Chart("hard", {
      type: 'radar',
      data: dataHard,
      options: {
        elements: {
          line: {
            borderWidth: 2
          }
        }
      },
    
  });
  }

  ngOnInit(): void{
    this.createChart();
  }

}
