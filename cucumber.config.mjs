export default {
  default: {
    paths: ['./e2e/home/features/*.feature'],
    require: ['./e2e/home/step_definitions/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar', 'html:cucumber-report.html'],
  },
};
