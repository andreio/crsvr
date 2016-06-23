import angular from "angular";
import {APP_MODULE} from "constants";

import ItemsService from "lib/service/items";

import ItemsController from "lib/controller/items";

angular.module(APP_MODULE, [])

    .controller('itemsController', ItemsController)

    .service('itemsService', ItemsService);

angular.bootstrap(document, [APP_MODULE]);


