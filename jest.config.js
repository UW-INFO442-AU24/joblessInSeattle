// module.exports = {
//   transform: {
//     "^.+\\.jsx?$": "babel-jest"
//   },
//   transformIgnorePatterns: [
//     "node_modules/(?!axios)", // Ensure axios gets transformed as well
//     "node_modules/(?!@mui/x-date-pickers)",
//     "node_modules/(?!(@mui|react-spring)/)" 
//   ],
//   moduleFileExtensions: ["js", "jsx"], 
//   testEnvironment: "jsdom"
// };

module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.js$": "babel-jest"
  },
  transformIgnorePatterns: [
  //"node_modules/(?!(@mui|react-spring|axios|@mui/x-date-pickers/AdapterDayjs/index.js)/)"
   // Allow transforming @mui, react-spring, axios, etc.
   '<rootDir>/node_modules/'
  ],
  moduleFileExtensions: ["js", "jsx"], 
  testEnvironment: "jsdom"
};



