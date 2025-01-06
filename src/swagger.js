// // src/swagger.js
// import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';

// const swaggerSpec = swaggerJSDoc({
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'My API',
//       version: '1.0.0',
//       description: 'This is the API documentation for the Express app.',
//     },
//     security: [
//       {
//         bearerAuth: [],
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT',
//         },
//       },
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000',  // Adjust this based on your environment
//       },
//     ],
//   },
//   apis: ['./src/routes/*.js'],  // Path to your route files for automatic documentation generation
// });

// export { swaggerSpec, swaggerUi };
