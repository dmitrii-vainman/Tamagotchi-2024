// jest.config.js
export default {
    testEnvironment: 'node', // Testumgebung auf Node.js setzen
    transform: {
        '^.+\\.js$': 'babel-jest', // Verwende babel-jest, um ES6-Module zu transformieren
    }};
