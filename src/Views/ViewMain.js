
import { ViewLogin } from './ViewLogin.js'
import { } from './ViewCreateCV'
import { } from './ViewCV.js';
import { ViewFindWorker } from "./ViewFindWorker";
import { } from "./ViewHome";
import { ViewHomeAdmin } from "./ViewHomeAdmin";
import { ViewHomeAspirante } from "./ViewHomeAspirante";
import { ViewHomeAutonomo } from "./ViewHomeAutonomo";
import { ViewHomeEmpresa } from "./ViewHomeEmpresa";
import { ViewJobOffice } from "./ViewJobOffice";
import { ViewLookForJob } from "./ViewLookForJob";
import { ViewLookForWorker } from "./ViewLookForWorker";
import { ViewOfferJob } from "./ViewOfferJob";
import { ViewOfferService } from "./ViewOfferService";
import { ViewFindJob } from "./ViewFindJob";
import { ViewFindService } from "./ViewFindService";
import { Route, Switch } from 'react-router';
// import { Container } from 'reactstrap';
import { ViewCreateOfferJob } from './ViewCreateOfferJob.js';
import { ViewCreateOfferService } from './ViewCreateOfferService.js';
import { ViewCompanyProfile } from './ViewCompanyProfile.js';

import { ViewPerfilAspirante } from './ViewPerfilAspirante.js';
import { Mapa, RenderProgress } from '../Components/tutorial.js';
import { ViewJob } from './ViewJob.js';


export const ViewMain = () => <Switch>
  <ViewRoute path="/Login" view={RenderProgress("Login")} />
  <ViewRoute path="/Register/" view={ViewLogin} />
  <ViewRoute path="/MostrarCV" view={RenderProgress("MostrarCV")} />
  <ViewRoute path="/CVCreate" view={RenderProgress("CreateCV")} />
  <ViewRoute path="/lookforJob" view={RenderProgress("LookForJob")} />
  <ViewRoute path="/SendCV" view={RenderProgress("LookForJobSendCV")} />
  <ViewRoute path="/lookforWorker" view={RenderProgress("BuscarPostulantes")} />
  <ViewRoute path="/findWorker" view={ViewFindWorker} />
  <ViewRoute path="/homeAdmin" view={ViewHomeAdmin} />
  <ViewRoute path="/homeAspirante" view={ViewHomeAspirante} />
  <ViewRoute path="/homeEmpresa" view={ViewHomeEmpresa} />
  <ViewRoute path="/homeAutonomo" view={ViewHomeAutonomo} />
  <ViewRoute path="/jobOffice" view={ViewJobOffice} />
  {/* <ViewRoute path="/offerJob" view={ViewOfferJob} /> */}
  {/* <ViewRoute path="/ViewJob" view={ViewJob} /> */}
  {/* <ViewRoute path="/createJob" view={ViewCreateOfferJob} /> */}
  <ViewRoute path="/offerJob" view={RenderProgress("OfferJob")} />
  <ViewRoute path="/ViewJob" view={RenderProgress("ViewJob")} />
  <ViewRoute path="/createJob" view={RenderProgress("CreateJob")} />
  <ViewRoute path="/offerService" view={ViewOfferService} />
  <ViewRoute path="/createService" view={ViewCreateOfferService} />
  {/* <ViewRoute path="/findJob" view={ViewFindJob} /> */}
  <ViewRoute path="/findJob" view={RenderProgress("FindJob")} />
  <ViewRoute path="/postulateJob" view={RenderProgress("PostulateJob")} />
  <ViewRoute path="/findService" view={ViewFindService} />
  <ViewRoute path="/recovery-pass" view={ViewLogin} />
  <ViewRoute path="/perfilAspirante" view={ViewPerfilAspirante} />
  <ViewRoute path="/mapSite" view={Mapa} />
  <ViewRoute path="/" view={RenderProgress("Home")} />
  <ViewRoute path="/profileCompany" view={ViewCompanyProfile} />
</Switch>

const ViewRoute = ({ path, view }) =>
  <Route path={path}>
    {view({})}
  </Route>