
import { ViewLogin } from './ViewLogin.js'
import { ViewCreateCV } from './ViewCreateCV'
import { ViewFindWorker } from "./ViewFindWorker";
import { ViewHome } from "./ViewHome";
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
import { ViewCreateUser } from './ViewCreateUser.js';
import { Container } from 'reactstrap';
import { ViewCreateOfferJob } from './ViewCreateOfferJob.js';

export const ViewMain = () =>
  <Switch>
    <ViewRoute path="/Login" view={ViewLogin} />
    <ViewRoute path="/Register" view={ViewCreateUser} />
    <ViewRoute path="/CVCreate" view={ViewCreateCV} />
    <ViewRoute path="/lookforJob" view={ViewLookForJob} />
    <ViewRoute path="/lookforWorker" view={ViewLookForWorker} />
    <ViewRoute path="/findWorker" view={ViewFindWorker} />
    <ViewRoute path="/homeAdmin" view={ViewHomeAdmin} />
    <ViewRoute path="/homeAspirante" view={ViewHomeAspirante} />
    <ViewRoute path="/homeEmpresa" view={ViewHomeEmpresa} />
    <ViewRoute path="/homeAutonomo" view={ViewHomeAutonomo} />
    <ViewRoute path="/jobOffice" view={ViewJobOffice} />
    <ViewRoute path="/offerJob" view={ViewOfferJob} />
    <ViewRoute path="/CreateJob" view={ViewCreateOfferJob} />
    <ViewRoute path="/offerService" view={ViewOfferService} />
    <ViewRoute path="/findJob" view={ViewFindJob} />
    <ViewRoute path="/findService" view={ViewFindService} />
    <ViewRoute path="/" view={ViewHome} />
  </Switch>

const ViewRoute = ({ path, view }) =>
  <Route path={path}>
    <Container className="abs-center" fluid={true}>
      {view()}
    </Container>
  </Route>