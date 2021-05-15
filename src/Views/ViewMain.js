
import { ViewLogin } from './ViewLogin.js'
import { ViewCreateCV } from './ViewCreateCV'
import { ViewFindWorker } from "./ViewFindWorker";
import { ViewHome } from "./ViewHome";
import { ViewHomeAdmin } from "./ViewHomeAdmin";
import { ViewHomeAspirante } from "./ViewHomeAspirante";
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

export const ViewMain = () => 
    <Switch>
        <Route path="/Login">
          <ViewLogin />
        </Route>
        <Route path="/Register">
          <ViewCreateUser  />
        </Route>
        <Route path="/CVCreate">
          <ViewCreateCV />
        </Route>
        <Route path="/lookforJob">
          <ViewLookForJob />
        </Route>
        <Route path="/lookforWorker">
          <ViewLookForWorker />
        </Route>
        <Route path="/findWorker">
          <ViewFindWorker />
        </Route>
        <Route path="/homeAdmin">
          <ViewHomeAdmin/>
        </Route>
        <Route path="/homeAspirante">
          <ViewHomeAspirante />
        </Route>
        <Route path="/homeEmpresa">
          <ViewHomeEmpresa />
        </Route>

        <Route path="/jobOffice">
          <ViewJobOffice />
        </Route>        
        <Route path="/offerJob">
          <ViewOfferJob />
        </Route>        
        <Route path="/offerService">
          <ViewOfferService />
        </Route>
        <Route path="/findJob">
          <ViewFindJob />
        </Route>

        <Route path="/findService">
          <ViewFindService />
        </Route>
        
        <Route path="/">
          <ViewHome/>
        </Route>
      </Switch>