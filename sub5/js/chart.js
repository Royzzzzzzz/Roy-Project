
            var options = {
              'legend':{
                names: ['2019', '2030', '2040', '2045'],
                hrefs: []
                  },
              'dataset':{
                title:'Playing time per day', 
                values: [[10,30,60], [5,20,50], [0,0,20], [0,0,0]],
                colorset: ['#DC143C','#FF8C00', '#2EB400', '#666666'],
                fields:['사업장 전력 외', '사업장 전력', '공급망,출장 등']
                },
              'chartDiv' : 'chart17',
              'chartType' : 'stacked_column',
              'chartSize' : {width:1200, height:600},
              'maxValue' : 100,
              'increment' : 10
            };
        
            Nwagon.chart(options);
        
          