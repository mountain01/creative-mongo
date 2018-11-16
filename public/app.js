agGrid.initialiseAgGridWithAngular1(angular);

const app = angular.module('app', ['ui.router', 'agGrid']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouteProvider) {
  $stateProvider
    .state('home', { url: '/home', templateUrl: 'templates/home.html', controller: MainCtrl, controllerAs: '$ctrl' })
    .state('add', { url: '/add', templateUrl: 'templates/add.html', controller: AddCtrl, controllerAs: '$ctrl' });
  $urlRouteProvider.otherwise('home');
}])

class MainCtrl {
  constructor(SpellService) {
    this.title = 'temp';
    this.spellService = SpellService;
  }
  $onInit() {
    // const columnDefs = [
    //   { headerName: "Make", field: "make" },
    //   { headerName: "Model", field: "model" },
    //   { headerName: "Price", field: "price" }
    // ];

    const columnDefs = [
      { headerName: 'Name', field: "name" },
      { headerName: 'Casting Time', field: "castingTime" },
      { headerName: 'Range', field: "range" },
      { headerName: 'Duration', field: "duration" },
      { headerName: 'Level', field: "level" },
      { headerName: 'School', field: "school" },
      { headerName: 'Description', field: "description" },
      { headerName: 'Higher Levels', field: "higherLevels" },
    ]

    // const rowData = [
    //   { make: "Toyota", model: "Celica", price: 35000 },
    //   { make: "Ford", model: "Mondeo", price: 32000 },
    //   { make: "Porsche", model: "Boxter", price: 72000 }
    // ];

    this.gridOptions = {
      columnDefs: columnDefs,
      rowData: null
    };

    this.spellService.getSpells().then(res => this.gridOptions.api.setRowData(res));
  }


}

class AddCtrl {
  constructor(SpellService, scope) {
    this.spellService = SpellService;
    this.scope = scope;
  }

  $onInit() {
    this.resetSpell();
  }

  resetSpell() {
    this.scope.newSpell = { level: 'Cantrip' };
  }

  submitSpell(spell) {
    console.log(spell);
    this.spellService.saveSpell(spell).then(res => {
      console.log(res);
      this.resetSpell();
    });
  }

}

MainCtrl.$inject = ['SpellService'];
AddCtrl.$inject = ['SpellService', '$scope'];

app.controller('AddCtrl', AddCtrl);

app.controller('MainCtrl', MainCtrl);
class SpellService {
  constructor($q, $http) {
    this.promise = $q;
    this.spells = ['spell1', 'spell2'];
    this.http = $http;
  }

  getSpells() {
    return this.http.get('spells').then(res => res.data);
  }

  saveSpell(spell) {
    return this.http.post('/spells', spell).then(res => res.data);
  }
}

SpellService.$inject = ['$q', '$http'];

app.service('SpellService', SpellService);
