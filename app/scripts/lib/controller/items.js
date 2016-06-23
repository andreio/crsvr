class ItemsController {
    constructor($scope, itemsService) {
        Object.assign(this, {$scope: $scope, itemsService: itemsService});
        itemsService.items().then(this.updateItems.bind(this));
        $scope.data = {};

    }

    updateItems(items) {
        this.$scope.data.items = items;
    }
}
ItemsController.inject = ['$scope', 'itemsService'];
export default ItemsController;

