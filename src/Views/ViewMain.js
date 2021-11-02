
import { ViewLogin } from './ViewLogin.js'
import { } from './ViewCreateCV'
import { } from './ViewCV.js';
//import { ViewFindWorker } from "./ViewFindWorker";
import { } from "./ViewHome";
import {  } from "./ViewHomeAdmin";
import { ViewHomeAspirante } from "./ViewHomeAspirante";
import { ViewHomeAutonomo } from "./ViewHomeAutonomo";
import { ViewHomeEmpresa } from "./ViewHomeEmpresa";
import {  } from "./ViewJobOffice";
import {  } from "./ViewLookForJob";
import {  } from "./ViewLookForWorker";
import {  } from "./ViewOfferJob";
import {  } from "./ViewOfferService";
import {  } from "./ViewFindJob";
import {  } from "./ViewFindService";
import {  } from "./ViewService"
import { Route, Switch } from 'react-router';
// import { Container } from 'reactstrap';
import {  } from './ViewCreateOfferJob.js';
import {  } from './ViewCreateOfferService.js';
import { ViewCompanyProfile } from './ViewCompanyProfile.js';

import { ViewPerfilAspirante } from './ViewPerfilAspirante.js';
import { RenderProgress } from '../Components/tutorial.js';
import {  } from './ViewJob.js';
import { ViewPostulatedJobs } from './ViewPostulatedJobs.js';


export const ViewMain = () => <Switch>
  <ViewRoute path="/Login" view={RenderProgress("Login")} />
  <ViewRoute path="/Register/" view={ViewLogin} />
  <ViewRoute path="/MostrarCV" view={RenderProgress("MostrarCV")} />
  <ViewRoute path="/CVCreate" view={RenderProgress("CreateCV")} />
  <ViewRoute path="/CVCreate2" view={RenderProgress("CreateCVautonomo")} />

  <ViewRoute path="/lookforJob" view={RenderProgress("LookForJob")} />
  <ViewRoute path="/SendCV" view={RenderProgress("LookForJobSendCV")} />
  <ViewRoute path="/lookforWorker" view={RenderProgress("BuscarPostulantes")} />
  {/* <ViewRoute path="/findWorker" view={ViewFindWorker} /> */}
  {/* <ViewRoute path="/homeAdmin" view={ViewHomeAdmin} /> */}

  <ViewRoute path="/homeAspirante" view={ViewHomeAspirante} />
  <ViewRoute path="/homeEmpresa" view={ViewHomeEmpresa} />
  <ViewRoute path="/homeAutonomo" view={ViewHomeAutonomo} />


  {/* <ViewRoute path="/jobOffice" view={ViewJobOffice} /> */}
  {/* <ViewRoute path="/offerJob" view={ViewOfferJob} /> */}
  {/* <ViewRoute path="/ViewJob" view={ViewJob} /> */}
  {/* <ViewRoute path="/createJob" view={ViewCreateOfferJob} /> */}


  <ViewRoute path="/offerJob" view={RenderProgress("OfferJob")} />
  <ViewRoute path="/ViewJob" view={RenderProgress("ViewJob")} />
  <ViewRoute path="/createJob" view={RenderProgress("CreateJob")} />

  <ViewRoute path="/findJob" view={RenderProgress("FindJob")} />

  <ViewRoute path="/offerService" view={RenderProgress("OfferService")} />
  {/* <ViewRoute path="/ViewService" view={RenderProgress("ViewService")} /> */}
  <ViewRoute path="/createService"view={RenderProgress("CreateService")} />
  <ViewRoute path="/findService" view={RenderProgress("FindService")} />

  <ViewRoute path="/postulates" view={ViewPostulatedJobs} />
  {/* <ViewRoute path="/findJob" view={ViewFindJob} /> */}
  <ViewRoute path="/postulateJob" view={RenderProgress("PostulateJob")} />
  <ViewRoute path="/recovery-pass" view={ViewLogin} />
  <ViewRoute path="/perfilAspirante" view={ViewPerfilAspirante} />
  <ViewRoute path="/mapSite" view={RenderProgress('Mapa')} />
  <ViewRoute path="/" view={RenderProgress("Home")} />
  <ViewRoute path="/profileCompany" view={ViewCompanyProfile} />
</Switch>

const ViewRoute = ({ path, view }) =>
  <Route path={path}>
    {view({})}
  </Route>