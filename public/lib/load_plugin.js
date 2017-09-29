import { functions as functionsRegistry } from 'plugins/canvas/lib/functions';
import { elements as elementsRegistry } from 'plugins/canvas/lib/elements';
import { viewRegistry } from 'plugins/canvas/expression_types';

import { commonFunctions } from '../../common/functions';
import { elements } from '../elements';
import { expressionTypes } from '../expression_types';

commonFunctions.forEach(fnDef => functionsRegistry.register(fnDef));
elements.forEach(elDef => elementsRegistry.register(elDef));
expressionTypes.forEach(expDef => viewRegistry.register(expDef));
