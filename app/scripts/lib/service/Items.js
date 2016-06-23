class ItemsService{
    constructor($http){
        this.$http = $http;
    }
    items(){
        return this.$http.get('data').then(response=>response.data);
    }
}
ItemsService.inject = ['$http'];

export default ItemsService;

