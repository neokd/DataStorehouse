export const DataSetsData = () => {
    const datasets = [
      {
        domain: 'Computer Science',
        datasets: [
          {
            id: '1',
            title: 'Computer Science Abbreviations',
            description: 'This dataset contains all the abbreviations used in Computer Science and Engineering.',
            githubPath: 'https://github.com/neokd/DataBucket/blob/main/DataBucket/CSE_ABBV.json',
            contributor: 'neokd',
            added: '27-05-2023',
            updated: '27-05-2023',
            size: '3.37KB',
            tag: ['Computer Science', 'Engineering', 'Abbreviations', 'CSE']
          },
          {
            id: '2',
            title: 'Random Data',
            description: 'This dataset contains random data for Computer Science and Engineering.',
            githubPath: 'https://github.com/neokd/DataBucket/blob/main/DataBucket/CSE_AV.json',
            contributor: 'neokd',
            added: '27-05-2023',
            updated: '27-05-2023',
            size: '3.37KB',
            tag: ['Computer Science', 'Engineering']
          }
        ]
      },
      {
        domain: 'Finance',
        datasets: [
          {
            id: '3',
            title: 'Stock Market Data',
            description: 'This dataset provides historical stock market data for various companies.',
            githubPath: 'https://github.com/neokd/DataBucket/blob/main/DataBucket/stock_market_data.json',
            contributor: 'neokd',
            added: '27-05-2023',
            updated: '27-05-2023',
            size: '5.82MB',
            tag: ['Finance', 'Stock Market', 'Data']
          },
          {
            id: '4',
            title: 'Cryptocurrency Prices',
            description: 'This dataset contains daily prices for popular cryptocurrencies.',
            githubPath: 'https://github.com/neokd/DataBucket/blob/main/DataBucket/cryptocurrency_prices.json',
            contributor: 'neokd',
            added: '27-05-2023',
            updated: '27-05-2023',
            size: '1.24MB',
            tag: ['Finance', 'Cryptocurrency', 'Prices']
          }
        ]
      }
      // Add more domain sections and their corresponding datasets
    ];
  
    return datasets;
  };
  