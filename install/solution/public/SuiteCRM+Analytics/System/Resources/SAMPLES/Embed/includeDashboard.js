require([
  "dash!/public/SuiteCRM Analytics/System/Resources/SAMPLES/Embed/dashboard.wcdf"
], function(includeChart) {
  // Create two instances of the same dashboard that use distinct DOM elements
  (new includeChart("content")).render();
});