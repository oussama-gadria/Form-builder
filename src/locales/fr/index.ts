import acContract from './acContract.json';
import account from './account.json';
import admin from './admin.json';
import aiContext from './aiContext.json';
import auth from './auth.json';
import billing from './billing.json';
import car from './car.json';
import common from './common.json';
import companies from './companies.json';
import components from './components.json';
import configuration from './configuration.json';
import dashboard from './dashboard.json';
import filter from './filter.json';
import language from './language.json';
import languages from './languages.json';
import layout from './layout.json';
import mainMenu from './mainMenu.json';
import pack from './pack.json';
import payment from './payment.json';
import sdContract from './sdContract.json';
import template from './template.json';
import tmContract from './tmContract.json';
import users from './users.json';
import DashboardTranslate from './DashboardTranslate.json';
import folder from './folder.json';
import formBuilder from './formBuilder.json';

export default {
  filter,
  account,
  admin,
  auth,
  folder,
  common,
  components,
  dashboard,
  layout,
  users,
  acContract,
  tmContract,
  languages,
  mainMenu,
  sdContract,
  payment,
  pack,
  language,
  configuration,
  companies,
  aiContext,
  template,
  billing,
  DashboardTranslate,
  car,
  formBuilder,
} as const;
