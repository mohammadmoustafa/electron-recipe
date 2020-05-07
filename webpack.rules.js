

module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  // Put your webpack loader rules in this array.  This is where you would put
  // your ts-loader configuration for instance:
  // {
  //   test: /\.tsx?$/,
  //   exclude: /(node_modules|.webpack)/,
  //   loaders: [{
  //     loader: 'awesome-typescript-loader',
  //     options: {
  //       transpileOnly: true
  //     }
  //   }]
  // },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|.webpack)/,
    loaders: [{
      loader: 'babel-loader',
    }]
  },
  {
    test: /\.(ts|tsx)$/,
    use: 'react-hot-loader/webpack',
    include: /node_modules/
  },
  {
    test: /\.css$/,
    use: ['style-loader'],
  },
  {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  },
  
];
