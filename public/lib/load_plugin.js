import { functions as functionsRegistry } from 'plugins/canvas/lib/functions';
import { elements as elementsRegistry } from 'plugins/canvas/lib/elements';
import { commonFunctions } from '../../common/functions';
import { elements } from '../elements';

commonFunctions.forEach(fnDef => functionsRegistry.register(fnDef));
elements.forEach(elDef => elementsRegistry.register(elDef));
