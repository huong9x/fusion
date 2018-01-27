import * as config from './config';

import fusion from '@sphinx-software/fusion/Fusion/Fusion';
import {ConsoleKernel} from '@sphinx-software/fusion/Fusion/ServiceContracts';
import Container from '@sphinx-software/container';
import EventEmitter from 'events';

(async () => {

    const modules = await Promise.all(config.modules.map(module => import(module)));

    modules.forEach(module => fusion.use(module));

    let container = await fusion.activate(config, new Container(new EventEmitter()));
    let kernel    = await container.make(ConsoleKernel);

    kernel.parse(process.argv);

    if (kernel.args.length === 0) {
        kernel.help();
    }

})().catch(console.error);