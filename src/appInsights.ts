import appInsights from 'applicationinsights';

const setupAppInsights = () => {
  // Initialize the Application Insights client with the instrumentation key
  appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(true)  // Enable live metrics if desired
    .start();
};

export default setupAppInsights;
